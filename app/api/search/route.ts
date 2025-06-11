import { NextRequest } from 'next/server';
import  connectdb  from '../db/connectdb';
import Product from '../models/product.models';

export async function GET(request:NextRequest){
    try{
        await connectdb()
        const searchParams = request.nextUrl.searchParams;
        const searchTerms = searchParams.get('searchTerms') || '';
        const products = await Product.find({
            $or: [
                { name: { $regex: searchTerms, $options: 'i' } },
                { description: { $regex: searchTerms, $options: 'i' } }
            ]
        }).sort({ createdAt: -1 });
        return Response.json(products, { status: 200 });

    }
    catch (error) {
        console.error('Error in search:', error);
        return Response.json({ error: 'Failed to search products' }, { status: 500 });
    }

}