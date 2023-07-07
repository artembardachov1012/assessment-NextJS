'use client'
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { data as productData } from "../../../target.data";
import Image from 'next/image';
import {AiOutlinePlus, AiOutlineMinus} from 'react-icons/ai'
import Link from 'next/link';


const Product = () => {
  const params = useParams()
  const [data, setData] = useState<any>()
  const id = params.id;

  const displayStars:any = (rating: any) => {
    const fullStar = "★";
    const halfStar = "☆";
    const emptyStar = "☆";
    const maxRating = 5;
    const fullStarsCount = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = fullStar.repeat(fullStarsCount);
    if (hasHalfStar) {
      stars += halfStar;
    }
    const remainingStarsCount = maxRating - fullStarsCount - (hasHalfStar ? 1 : 0);
    stars += emptyStar.repeat(remainingStarsCount);
    return stars;
  }

  useEffect(() => {
    const filteredData = productData.filter((items) => Number(items.id) == Number(id))
    setData(filteredData[0])
  }, [id])

  return <div className='h-screen p-12.5 flex justify-center items-center'>
    <div className="p-4 card hover:bg-sky-50 transition">
      <div className="overflow-hidden flex">
        <Image className='hover:scale-110' src={data?.image} alt={data?.title} width={150} height={100} />
        <div className="pl-4 flex justify-center flex-col">
          <h1 className="text-xl mt-2">Price: $ {data?.price}/-</h1>
          <h4 className="mt-2">{data?.title}</h4>
        </div>
      </div>
      <p className="h-24 overflow-hidden mt-5">
        <span className="text-lg">Description</span>
        <br />
        <span className="text-xs">{data?.description}</span>
      </p>
      <div className="mt-5" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className='flex justify-center items-center'>
          <div className='flex'>
            {displayStars(data?.rating.rate)}
          </div>
          &nbsp;
          <h5>
            {data?.rating.rate}
          </h5>
        </div>
        <h5>
          <span className="text-xs">Number of item:</span> {data?.rating.count}
          <div className="mt-5 flex justify-center items-center">
          <button className="mr-2 bg-red-600 text-white px-3 py-2 rounded-lg">
            <AiOutlineMinus />
          </button>
          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg">
            Add to Cart
          </button>
          <button className="ml-2 bg-green-600 text-white px-3 py-2 rounded-lg">
            <AiOutlinePlus />
          </button>
        </div>
        </h5>
      </div>
      <Link href='/'>
        <button className='bg-blue-600 text-white  px-5 py-2 rounded-lg'>back</button>
      </Link>
    </div>
  </div>;
};

export default Product;
