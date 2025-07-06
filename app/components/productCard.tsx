'use client';
import React, { useEffect, useState,useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { motion, useInView } from 'framer-motion'


interface Product {
  _id: string;
  imageUrl: string;
  name: string;
  description: string;
  price: number; 
}


export function ProductCard({ product }: { product: Product }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      key={product._id}
      variants={{
        hidden: { opacity: 0, y: 100 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ duration: 1, ease: "easeOut" }}
      className="rounded-lg shadow flex flex-col items-center hover:bg-indigo-500"
    >
      <Link href={`/product/${product._id}`}>
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
    </motion.div>
  );
}
