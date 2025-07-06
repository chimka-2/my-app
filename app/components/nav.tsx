'use client';
import React from 'react';
import { IoIosSearch } from "react-icons/io";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';


export default function Nav() {
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerms', e.target.value);
    const searchQuery = urlParams.toString();
    router.push(`./search?${searchQuery}`);
  }

  return (
    <nav className='flex w-full items-center justify-between bg-[#6a00ff] p-4 text-white '>
      <h1 className='text-3xl hidden md:inline-block'>Zwatches</h1>
      <div className="flex w-[270] sm:w-[320px] gap-x-2 border border-gray-300 focus-within:border-gray-500 focus-within:w-[300px] sm:focus-within:w-[330px] group transition-all items-center justify-between rounded-md p-2 shadow-md">
        <div className='group-hover:font-bold'><IoIosSearch className='size-6 group-hover:font-bold group-hover:size-5' /></div>
        <input onChange={handleChange} type="text" placeholder="search" className="flex-1 outline-0 bg-transparent text-white" />
      </div>
      <Link href="/products" className="border-x border-x-emerald-300 rounded-lg  px-1 sm:px-3 py-1 font-bold hover:border-y active:border-x-0 transition-all">Add Product</Link>


    </nav>
  );
}
