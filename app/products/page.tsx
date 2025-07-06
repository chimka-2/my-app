'use client'
import React from 'react'
import AddProduct from '../components/addProduct';
import { motion } from 'framer-motion';

const textVariants = {
  hidden: { opacity: 0, y: -100 },
  visible: { opacity: 1, y: 0 }}


export default function Product() {
  return (
    <div className='px-4 md:px-12'>
        <motion.h1
        variants={textVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6, ease: 'easeOut' }}
         className='text-2xl font-bold w-full max-w-xl text-center mx-auto mt-6'>Add a new product</motion.h1>
        <AddProduct/>
       
    </div>
  )
}
