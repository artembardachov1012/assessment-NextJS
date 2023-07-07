'use client'

import React from 'react';
import Image from 'next/image';
import {useRouter} from 'next/navigation'

const Product = ({ data }: any) => {
  const router = useRouter()



  return (
    <div className="p-4 max-md:p-10 product-container">
      {data.length > 0 ? (
        <div className="grid grid-cols-1 z-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 max-md:mt-12 gap-6">
          {data?.map((data: any, index: any) => (
            <button value={data.id} onClick={() => router.push(`product/${data.id}`)} className="p-4 card hover:bg-sky-50 transition" key={index}>
              <div className="h-48 overflow-hidden flex">
                <Image src={data.image} alt={data.title} width={150} height={100} />
                <div className="pl-4 flex justify-center flex-col">
                  <h1 className="text-xl mt-2">Price: $ {data.price}/-</h1>
                  <h4 className="mt-2">{data.title}</h4>
                </div>
              </div>
              <p className="h-24 overflow-auto mt-5">
                <span className="text-lg">Description</span>
                <br />
                <span className="text-xs">{data.description}</span>
              </p>
              <div className="mt-5" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h5>
                  <span className="text-xs">Rating</span> {data.rating.rate}
                </h5>
                <h5>
                  <span className="text-xs">Count</span> {data.rating.count}
                </h5>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="w-full flex justify-center items-center h-96">
          <div className="text-red-600 text-5xl">Product Not Found !</div>
        </div>
      )}
    </div>
  );
};

export default Product;
