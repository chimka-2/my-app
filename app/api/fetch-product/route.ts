import connectdb from "../db/connectdb";
import Product from "../models/product.models";
 
 
 async function fetchProduct(request:Request){
    await connectdb()
    console.log("Connected to database successfully");
    try {
        const products = await Product.find({}).sort({createdAt:-1})

    return Response.json(products,{status:200})
    }
    catch(error){
        console.error("Error in fetching products:", error);
        return Response.json({error:"Failed to fetch products"}, {status:500})
    }
 }

export async function GET(request:Request){
    return fetchProduct(request)}



