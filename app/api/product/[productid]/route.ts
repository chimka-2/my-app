import { NextRequest } from 'next/server';
import connectdb from '../../db/connectdb';
import Product from '../../models/product.models';
import cloudinary from '../../../utils/cloudinary';



export async function GET(request: NextRequest, { params }: { params: Promise<{ productid: string }> } ) {
    // Connect to the database
    await connectdb();
  //   const resolvedParams = await params;

   
      const productid = (await params).productid
    
   

    // Log the product ID for debugging
    console.log("Product ID:", productid);

    try {
        // Query the product from the database using the provided ID
        const product = await Product.findById(productid);

        // If the product is not found, return a 404 response
        if (!product) {
            return new Response(JSON.stringify({ error: "Product not found" }), { status: 404 });
        }

        // Return the found product as JSON
        return new Response(JSON.stringify(product), { 
            status: 200, 
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        // Log the error and return a 500 response
        console.error('Error fetching product:', error);
        return new Response(JSON.stringify({ error: "Failed to fetch product" }), { status: 500 });
    }
}



// export async function PUT(request: Request, context: { params: { productid: string } } ) {
//   await connectdb();
//     const productid = context.params.productid;
//   const body = await request.json();

//   try {
//     const updatedProduct = await Product.findByIdAndUpdate(productid, body, { new: true });
//     if (!updatedProduct) {
//       return new Response(JSON.stringify({ error: 'Product not found' }), { status: 404 });
//     }

//     return new Response(JSON.stringify(updatedProduct), { status: 200 });
//   } catch (error) {
//     console.error('Error updating product:', error);
//     return new Response(JSON.stringify({ error: 'Failed to update product' }), { status: 500 });
//   }
// }


export async function DELETE(request: Request, params: Promise < { productid: string }> , Id:string) {
  await connectdb();
  const productid = (await params).productid;

  try {
    const product = await Product.findById(productid);
    if (!product) {
      return new Response(JSON.stringify({ error: 'Product not found' }), { status: 404 });
    }
    // Delete the product image from Cloudinary if it exists
    const existingProduct = await Product.findById(Id);
    let imageUrl = existingProduct.imageUrl; 
    const part = imageUrl.split('/');
        const filename = part[part.length - 1].split('.')[0];
        await cloudinary.uploader.destroy(`zwatches/${filename}`).then((result) => console.log('Old image destroyed:', result));

        // Delete the product from the database
    await Product.findByIdAndDelete(productid);
    return new Response(JSON.stringify({ message: 'Product deleted successfully' }), { status: 200 });

  } catch (error) {
    console.error('Error deleting product:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete product' }), { status: 500 });
  }

  
}