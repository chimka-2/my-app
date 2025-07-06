'use client';
import React, { useEffect, useState,useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { motion, useInView } from 'framer-motion'
import {ProductCard} from './productCard';



const textVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x:0 },}


interface Product {
  _id: string;
  imageUrl: string;
  name: string;
  description: string;
  price: number; 
}

export default function Product() {
  const [products, setProduct] = useState<Product[]>([]);
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    axios
      .get('/api/fetch-product')
      .then((response) => setProduct(response.data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="text-black min-h-[80vh] bg-[#6a00ff] px-4 md:px-8 lg:px-10 space-y-10 flex flex-col justify-center items-center">
      <motion.h1
        variants={textVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8, ease: 'easeOut' }}
       className="text-3xl">All Products</motion.h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-[80%] mx-auto">
        {products.map((product) => (
  <ProductCard key={product._id} product={product} />
))}

      </div>
    </div>
  );
}
