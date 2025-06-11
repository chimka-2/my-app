import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaWhatsapp } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

export default function Hero() {
  return (
    <div className=" ">
      <div className="h-0.5 bg-gray-800 mb-1"></div>
      <div className="h-0.5 bg-gray-800 mb-0.5"></div>
      <div className="h-0.5 bg-gray-800 mb-1"></div>
      <div className="h-0.5 bg-gray-800 mb-1"></div>
      <footer className="bg-gray-800 text-white py-4 flex justify-between items-center px-6">
        <div className="flex items-center space-x-2">
          <h2 className="text-sm mr-3 text-right">conatact us <br/> on our socials</h2>
          <FaWhatsapp className='size-6' />
          <FaLinkedin className='size-6'/>
          <FaFacebook className='size-6'/>

        </div>
        <div className="flex flex-col items-center justify-between">
          <Link href="/" className="text-white hover:text-gray-400 mr-4">
            <Image src="/logo.png" alt="Zwatches" width={40} height={40} />
          </Link>
          <span className="text-sm">© 2023 my company</span>
          </div>
    </footer>
    </div>
     

  )
}
