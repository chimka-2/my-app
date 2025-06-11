'use server'
import connectdb from '../api/db/connectdb';
import cloudinary from './cloudinary';
import Product from '../api//models/product.models'; // Adjust the import path as necessary

export default async function addAction(formData: FormData) {


  // Extract values from FormData
  const name = formData.get('name') as string | null;
  const priceRaw = formData.get('price') as string | null;
  const description = formData.get('description') as string | null;
  const imageFile = formData.get('image') as File | null;
  const link = formData.get('link') as string | null;

  if (!name || !priceRaw || !description || !imageFile || !link) {
    throw new Error('All fields are required');
  }

  // Convert price string to number safely
  const price = Number(priceRaw);
  if (isNaN(price)) {
    throw new Error('Price must be a valid number');
  }

  try {
    // Convert image File to buffer
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    // Upload image to Cloudinary
    const ImageResponse: any = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'image',
          folder: 'zwatches',
          public_id: `product-${Date.now()}`,
        },
        async (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      uploadStream.end(buffer);
    });

    console.log('Image uploaded successfully:', ImageResponse.secure_url);

    // Now you can proceed to save your product data to DB
    await connectdb(); // example: connect to DB
    // Save { name, price, description, imageUrl: ImageResponse.secure_url }
   await Product.create({
      name,
      price,
      description,
      link,
      imageUrl: ImageResponse.secure_url,
    });

    return {
      success: 'Product added successfully',
      imageUrl: ImageResponse.secure_url,

    };
  } catch (error: any) {
    console.error('Error uploading image:', error.message);
    return {
      error: 'Failed to add product. Please try again.',
      //details: error.message,
    };
  }
}
