import Image from "next/image";
import Hero from "./components/hero";
import Product from "./components/product";


export default function Home() {
  return (
    <div className="">
      <Hero/>
      
      <Product/>
    </div>
   
  );
}
