'use server';
import connectdb from '../api/db/connectdb';
import cloudinary from './cloudinary';
import Product from '../api/models/product.models'; // Adjust if path is different

export default async function updateAction(formData: FormData, Id: string) {
  // Extract values from FormData
  const name = formData.get('name') as string | null;
  const priceRaw = formData.get('price') as string | null;
  const description = formData.get('description') as string | null;
  const imageFile = formData.get('image') as File | null;
  const link = formData.get('link') as string | null;

  if (!name || !priceRaw || !description || !link) {
    throw new Error('All fields except image are required'); // Changed to allow optional image update
  }

  // Convert price string to number safely
  const price = Number(priceRaw);
  if (isNaN(price)) {
    throw new Error('Price must be a valid number');
  }

  try {
    await connectdb(); // Connect to MongoDB

    const existingProduct = await Product.findById(Id);
    if (!existingProduct) {
      throw new Error('Product not found');
    }

    let imageUrl = existingProduct.imageUrl; // Preserve old imageUrl by default

    // Handle image upload if imageFile is provided
    if (imageFile && imageFile.size > 0) {
      // Destroy old image from Cloudinary
      const part = imageUrl.split('/');
      const filename = part[part.length - 1].split('.')[0];
      await cloudinary.uploader.destroy(`zwatches/${filename}`).then((result) => console.log('Old image destroyed:', result));

      // Convert image file to buffer
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);

      // Upload new image
      const ImageResponse: any = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'image',
            folder: 'zwatches',
            public_id: `product-${Date.now()}`,
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(buffer);
      });

      console.log('Image uploaded successfully:', ImageResponse.secure_url);
      imageUrl = ImageResponse.secure_url;
    }

    // Update the product
    await Product.findByIdAndUpdate(Id, {
      name,
      price,
      description,
      link,
      imageUrl, // either new or old
    });

    return {
      success: 'Product updated successfully',
      imageUrl,
    };

  } catch (error: any) {
    console.error('Error updating product:', error.message);
    return {
      error: 'Failed to update product. Please try again.',
    };
  }
}
