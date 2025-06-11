'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';

interface Product {
  _id: string;
  imageUrl: string;
  name: string;
  description: string;
  price: number; 
}

export default function Product() {
  const [products, setProduct] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get('/api/fetch-product')
      .then((response) => setProduct(response.data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="text-black min-h-[80vh] bg-[#6a00ff] px-4 md:px-8 lg:px-10 space-y-10 flex flex-col justify-center items-center">
      <h1 className="text-3xl">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-[80%] mx-auto">
        {products.map((product: Product) => (
          <Link
            href={`/product/${product._id}`}
            key={product._id}
            className="rounded-lg shadow flex flex-col items-center hover:bg-indigo-500"
          >
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={1000}
              height={1000}
              priority
              className="max-w-[18rem] h-72 object-cover object-center rounded"
            />
            <div className="mt-3 text-center font-semibold">{product.name}</div>
            <div className="mt-1 text-gray-800 text-sm">{product.description}</div>
            <div className="mt-2 text-lg font-bold text-green-600">${product.price}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
