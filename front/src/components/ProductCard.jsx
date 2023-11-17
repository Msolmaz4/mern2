import React from 'react'
import { useNavigate } from 'react-router';

import Slider from "react-slick";

const ProductCard = ({product}) => {
  const navi = useNavigate()

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <div onClick={()=>navi(`/product/${product?._id}`)} className='w-[250px] bg-gray-100'>
    <Slider {...settings}>
      {
        product?.images?.map((item)=>(
          <img src={item.url}alt="" />
        ))
  }
    </Slider>
    <div className='text-2xl'>{product?.name}</div>
    <div className='text-2xl'>{product?.price}</div>
     
     
    </div>
  )
}

export default ProductCard