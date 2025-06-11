'use client';

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { MdArrowBack } from "react-icons/md";




interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export default function ProductPage() {
 const [product, setProduct] = useState<Product | null>(null);
  const [nav, setNav] = useState(false);
  const params = useParams(); // Must not be inside any condition or function
  const router = useRouter();

  
const productId = params.productid as string;

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`/api/product/${productId}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to fetch product');
    }
  };

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (!product) {
    return <div>Loading product...</div>;
  }

  const handleGoBack = () => {
    router.back();
  };

  
  const handleNav = () => {
    setNav(!nav);
    
  };
  const handleDelete = async () => {
    if (!productId) {
      toast.error('Product ID is missing');
      return;
    }
    try {
       const response = await axios.delete(`/api/product/${productId}`);
      toast.success(response.data.message || 'Product deleted successfully');
      router.push('/'); // Redirect to home or products page after deletion
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };
  
  return (
    <div className="product-container  px-2 md:px-10 lg:px-14 mt-10 md:mt-5">
      <button onClick={e => (handleGoBack())} className=" cursor-pointer flex items-center"> <MdArrowBack /> Go back</button>
      <div className="flex items-center justify-around p-4 ">
        <div className="product-image flex-1">
        <Image src={product.imageUrl} width={600} height={600}  unoptimized className='w-64 sm:w-80 md:w-[450px] lg:w-[600px] max-w-[600px] object-cover ' alt={product.name} />
      </div>
      <div className="relative flex-1 text-sm sm:text-base">
        
        <div className="absolute top-0 right-0 md:right-10 flex flex-col  text-right  cursor-pointer ">
          <button onClick={handleNav} className="font-bold text-2xl ">...</button>
          <div  className={`transition-all duration-200 ${nav ? 'opacity-100 scale-100' : 'opacity-0 scale-95 hidden'} flex-col w-20 bg-white shadow-lg p-2 rounded-md`}>
            <Link href={`/product/${product._id}/update`} className="text-black">Update</Link>
            <hr className="" />
            <button onClick ={e => (  handleDelete())} className="text-red-800">Delete</button>
          </div>
        </div>
        <div className="mt-20 md:mt-5 product-details w-full flex flex-col  items-center justify-center  p-4">
        
        <h2>{product.name}</h2>
        <p className="price">${product.price}</p>
        <button>Contact Seller</button>
        <div className="description">
          <h3>Description</h3>
          <p>{product.description}</p>
        </div>
      </div>
      </div>
      </div>
    </div>
  );
}
