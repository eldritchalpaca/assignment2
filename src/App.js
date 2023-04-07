import logo from './logo.png';
import './App.css';
import React, { useState } from "react";
import { Products } from "./Products"
import { Categories } from "./Categories"

export const App = () => {
  console.log("Step 1 : After reading file :");
  const [ProductsCategory, setProductsCategory] = useState(Products);
  const [inCart, cartState] = useState(false);

  function handleClick(tag) {
    let filtered = Products.filter(cat => cat.category === tag);
    setProductsCategory(filtered);
    console.log("Step 2: STATISTICS", Products.length, ProductsCategory.length);
  }

  function goToCart() {
    cartState(!inCart);
  }

  return (
    <div className="flex fixed flex-row">
      <div className="h-screen bg-slate-800 p-3 xl:basis-1/5" style={{ minWidth: '65%' }}>
        <img className="w-full" src={logo} alt="Sunset in the mountains" />
        <div className="px-6 py-4">
          <h1 className="text-3xl mb-2 font-bold text-white"> Product Catalog App </h1>
          <p className="text-gray-700 text-white">
            by - <b style={{ color: 'orange' }}>Design Shubham, Development Abraham</b>
          </p>
          <div className="py-10">
             {!inCart && (Categories) ? <p className='text-white'>Tags : </p> : ''}
            {
              !inCart && Categories.map(tag => <button key={tag} className="inline-block bg-amber-600 rounded-full px-3 py-1
              text-sm font-semibold text-gray-700 mr-2 mt-2"
                onClick={() => { handleClick(tag) }}>{tag}</button>)
            }
            
          </div>
          <button className='text-black bg-white px-3 py-1' onClick={() => {goToCart()}}>{inCart ? "Return to Shopping" : "Go to Cart"}</button>
        </div>
      </div>
      <div className="ml-5 p-10 xl:basis-4/5">
        {console.log("Before render :", Products.length, ProductsCategory.length)}
        {!inCart && render_products(ProductsCategory)}
      </div>
    </div>
  );

}

const render_products = (ProductsCategory) => {
  return <div className='category-section fixed'>
    <h2 className="text-3xl font-extrabold tracking-tight text-gray-600 category-title">Products ({ProductsCategory.length})</h2>
    <div className="m-6 p-3 mt-10 ml-0 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-10" style={{
      maxHeight: '800px', overflowY:
        'scroll'
    }}>
      {/* Loop Products */}
      {ProductsCategory.map((product, index) => (
        <div key={index} className="group relative shadow-lg" >
          <div className=" min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-60 lg:aspect-none">
            <img
              alt="Product Image"
              src={product.image}
              className="w-full h-full object-center object-cover lg:w-full lg:h-full"
            />
          </div>
          <div className="flex justify-between p-3">
            <div>
              <h3 className="text-sm text-gray-700">
                <a href={product.href}>
                  <span aria-hidden="true" className="absolute inset-0" />
                  <span style={{ fontSize: '16px', fontWeight: '600' }}>{product.title}</span>
                </a>
                <p>Tag - {product.category}</p>
              </h3>
              <p className="mt-1 text-sm text-gray-500">Rating: {product.rating.rate}</p>
            </div>
            <p className="text-sm font-medium text-green-600">${product.price}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
}

