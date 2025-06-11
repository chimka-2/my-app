'use client';
import React from 'react'
import UpdateProduct from '../../../components/updateProduct';
import { useParams } from 'next/navigation';


export default function Product(  ) {
  const { productid } = useParams(); // ✅ Extract from URL

  return (
    <div className="px-4 md:px-12">
      <h1 className="text-2xl font-bold w-full max-w-xl text-center mx-auto mt-6">
        Update Product
      </h1>

      {/* ✅ Pass it to your component */}
      <UpdateProduct productId={productid as string} />
    </div>
  );
}