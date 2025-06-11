'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast/headless';
import addAction from '../utils/addAction';

const AddProduct = () => {
  const router = useRouter();
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  //
  
  //

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileSize = file.size / 1024; // in KB
      if (fileSize > 1024 * 1) {
        toast.error('File size exceeds 1 MB. Please select a smaller file.');
        alert('File size exceeds 1 MB. Please select a smaller file.');
        return;
      }

      setImageURL(URL.createObjectURL(file));
      setSelectedFile(file);
    }
  };

  async function clientAddProduct(formData: FormData) {
    if (!selectedFile) {
      toast.error('Please upload a product image.');
      return;
    }

    formData.set('image', selectedFile);

    const { error, success } = await addAction(formData);
    if (error) {
      toast.error('Error adding product:');
      alert('Failed to add product. Please try again.');
    }
    if (success) {
      toast.success('Product added successfully');
      
      alert('Product added successfully!');
      router.push('/');
      setImageURL("")
    }
  }
  //


  //

  return (
    <form
      action={clientAddProduct}
      className="flex flex-col my-12 space-y-4 items-center w-full max-w-xl mx-auto rounded-lg shadow-md"
    >
      <div className="w-full">
        <label>Product Image</label>
        <br />
        <input
          onChange={handleImageChange}
          type="file"
          accept="image/*"
          name="image"
          className="border w-full px-3 py-1 rounded-sm"
        />
        {imageURL && (
          <img
            src={imageURL}
            alt="Preview"
            className="mt-2 w-full max-h-60 object-contain rounded"
          />
        )}
      </div>

      <div className="w-full">
        <label className="block">Product Name</label>
        <input
          type="text"
          placeholder="Enter product name"
          name="name"
          className="border w-full px-3 py-1 rounded-sm"
        />
      </div>

      <div className="w-full">
        <label className="block">Product Price</label>
        <input
          type="number"
          placeholder="Enter product price"
          name="price"
          className="border w-full px-3 py-1 rounded-sm"
        />
      </div>

      <div className="w-full">
        <label className="block">Sellers Link</label>
        <input
          type="text"
          placeholder="Enter product link"
          name="link"
          className="border w-full px-3 py-1 rounded-sm"
        />
      </div>

      <div className="w-full">
        <label className="block">Product Description</label>
        <textarea
          placeholder="Enter product description"
          name="description"
          rows={4}
          className="border w-full px-3 py-1 rounded-sm"
        ></textarea>
      </div>

      <button className="bg-blue-900 text-white px-4 py-1 rounded-lg w-full">
        Add Product
      </button>
    </form>
  );
};

export default AddProduct;
