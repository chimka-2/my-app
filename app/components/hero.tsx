import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <div className='flex flex-col md:flex-row min-h-70vh md:min-h-60vh lg:min-h-[90vh]  items-center justify-between px-10 md:px-20 lg:px-40 space-y-6 md:space-y-0 mt-10 lg:mt-0 mb-16 md:mb-0'>
      <div className=" flex flex-col flex-1 space-y-6">
        <h1 className=" text-4xl sm:text-5xl md:text-7xl max-w-2xl">Timeless Elegance on Your Wrist</h1>
        <p className=''>Descover our curated collection of premium watches, crafted for those who appreciate sophistication and preciion</p>
        <Link href={'/products'} className='bg-[#6a00ff] px-3 py-2 mt-4 font-bold rounded-lg w-fit border border-[#6a00ff]'>Shop the Collection</Link>
      </div>
        <div className="flex-1 ">
            <Image src='/heroWatch.png' alt='Hero Watch' width={500} height={500} />
        </div>
    </div>
  )
}
