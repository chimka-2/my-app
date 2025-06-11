import React from 'react'
import AddProduct from '../components/addProduct';


export default function Product() {
  return (
    <div className='px-4 md:px-12'>
        <h1 className='text-2xl font-bold w-full max-w-xl text-center mx-auto mt-6'>Add a new product</h1>
        <AddProduct/>
       
    </div>
  )
}
