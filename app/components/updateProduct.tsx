'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import updateAction from '../utils/updateAction'; // make sure this is the correct path

interface UpdateProductProps {
  productId: string;
}

export default function UpdateProduct({ productId }: UpdateProductProps) {
  const router = useRouter();
  const { productid } = useParams();

  const [product, setProduct] = useState<any>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Form fields
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [link, setLink] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/product/${productId}`);
        const data = await res.json();
        setProduct(data);
        setImageURL(data.imageUrl);
        setName(data.name);
        setPrice(data.price.toString());
        setLink(data.link);
        setDescription(data.description);
      } catch (err) {
        console.error('Failed to load product');
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileSize = file.size / 1024; // in KB
      if (fileSize > 1024) {
        alert('File size exceeds 1 MB. Please select a smaller file.');
        return;
      }

      setImageURL(URL.createObjectURL(file));
      setSelectedFile(file);
    }
  };

  if (!product) return <p className="text-center my-10">Loading product...</p>;

  return (
    <form
      action={async (formData) => {
        if (selectedFile) {
          formData.set('image', selectedFile);
        }
        await updateAction(formData, productId);
        router.push('/');
      }}
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
          name="name"
          defaultValue={name}
          className="border w-full px-3 py-1 rounded-sm"
        />
      </div>

      <div className="w-full">
        <label className="block">Product Price</label>
        <input
          type="number"
          name="price"
          defaultValue={price}
          className="border w-full px-3 py-1 rounded-sm"
        />
      </div>

      <div className="w-full">
        <label className="block">Sellers Link</label>
        <input
          type="text"
          name="link"
          defaultValue={link}
          className="border w-full px-3 py-1 rounded-sm"
        />
      </div>

      <div className="w-full">
        <label className="block">Product Description</label>
        <textarea
          name="description"
          defaultValue={description}
          rows={4}
          className="border w-full px-3 py-1 rounded-sm"
        ></textarea>
      </div>

      <button type="submit" className="bg-blue-900 text-white px-4 py-1 rounded-lg w-full cursor-pointer hover:bg-blue-900/50">
        Update Product
      </button>
    </form>
  );
}
