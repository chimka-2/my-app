'use client'

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
  _id: string;
  imageUrl: string;
  name: string;
  description: string;
  price: number;
}

export default function SearchPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const searchTerms = searchParams.get('searchTerms') || '';
    axios.get(`/api/search?searchTerms=${searchTerms}`)
      .then(response => {
        console.log('Search results:', response.data);
        setProducts(response.data); // Store the fetched products in state
      })
      .catch(error => {
        console.error('Error fetching search results:', error);
      });
  }, [searchParams]); // Dependency array to ensure the effect runs when searchParams change

  return (
    <div className="text-black min-h-[90vh] bg-gray-400 px-4 md:px-8 lg:px-10 space-y-10 flex flex-col justify-center items-center">
      <h1 className="text-3xl">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-[80%] mx-auto">
        {products.map((product: Product) => (
          <Link
            href={`/product/${product._id}`}
            key={product._id}
            className="rounded-lg shadow flex flex-col items-center hover:bg-[#b8abca]"
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
