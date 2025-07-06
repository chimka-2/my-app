'use client'

import { delay, motion } from 'framer-motion'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'


//i will define my varient here
const BigTextVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: 'easeOut' }
}
const smallTextVariants = {
    hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 },
  transition: {delay:1,  }
}
const ButtonVariants = {
    hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 },
 
}
const imageVariant = {
    hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 },
 }

 const heroImageVariants = {
    hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
 }



// i will use the varient in the motion component then  will use the motion component to animate the hero section
export default function Hero() {
  return (
    <div className='flex flex-col md:flex-row min-h-70vh md:min-h-60vh lg:min-h-[90vh]  items-center justify-between px-10 md:px-20 lg:px-40 space-y-6 md:space-y-0 mt-10 lg:mt-0 mb-16 md:mb-0'>
      <motion.div
       className=" flex flex-col flex-1 space-y-6">
        <motion.h1
        variants={BigTextVariants}
        initial= {"hidden"}
        animate= {"visible"}
        transition={{ duration: 0.8, ease: 'easeOut'}}
         className=" text-4xl sm:text-5xl md:text-7xl max-w-2xl">Timeless Elegance on Your Wrist</motion.h1>
        <motion.p
          variants={smallTextVariants}
        initial= {"hidden"}
        animate= {"visible"}
        transition={{delay:1, duration: 0.8, ease: 'easeOut'}}
         className=''>Descover our curated collection of premium watches, crafted for those who appreciate sophistication and preciion</motion.p>
        <motion.div
          variants={ButtonVariants}
          initial= {"hidden"}
          animate= {"visible"}
          transition={{delay:1.5, duration: 0.8, ease: 'easeOut'}}> <Link href={'/products'} className='bg-[#6a00ff] px-3 py-2 mt-4 font-bold rounded-lg w-fit border border-[#6a00ff]'>Shop the Collection</Link></motion.div></motion.div>
        <motion.div
        variants={heroImageVariants}
        initial= {"hidden"}
        animate= {"visible"}
        transition={{ duration: 0.8, ease: 'easeOut'}}
         className="flex-1 ">
            <Image src='/heroWatch.png' alt='Hero Watch' width={500} height={500} />
        </motion.div>
    </div>
  )
}
