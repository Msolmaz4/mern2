import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getProductDetail } from "../redux/productSlice";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa6";
import Button from "../components/Button";
import { addtoCart } from "../redux/cardSlice";

const Deatail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, product } = useSelector((state) => state.products);
  
  const [quanty ,setQuanty] = useState(1)

  useEffect(() => {
    if (id) {
      dispatch(getProductDetail(id));
    }
  }, [dispatch, id]);
  console.log(loading, product, "detail");



  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

const decrem =()=>{
    if(quanty > 1){
        setQuanty(quanty-1)
    }

}
const increm=()=>{
    if(quanty < product?.product?.stock){
            setQuanty(quanty+1)
    }

}


const addBasket = ()=>{
  const data ={
    id:product?.product._id,
    name:product?.product?.name,
    image:product?.product?.images?.[0],
    price:product?.product?.price,
    quanty :quanty
    
  }
  console.log(data,'eklemek')
 dispatch(addtoCart(data))

}
  return (
    <div className="">
    {
        loading ? 'loading....' : <div className="flex">
        {product?.product && (
          <div className="w-[600px]">
            <Slider {...settings}>
              {product?.images?.map((item) => (
                <img src={item.url} alt="" />
              ))}
            </Slider>
          </div>
        )}
        <div>
            <div className="text-3l">{product?.product?.name}</div>
            <div className="text-3l">{product?.product?.description}</div>
            {
                product?.product?.stock > 0 ? <div>
                {product?.product?.stock}</div> : <div> leider</div>
                
            }
            <div className="text-3l"> Category :{product?.product?.category}</div>
            <div className="text-3l"> Rating : {product?.product?.rating}
            <FaStar /></div>
            <div className="flex items-center gap-4">
                <div onClick={decrem} className="text-3l cursor-pointer">-</div>
                <div className="text-3l cursor-pointer">{quanty}</div>
                <div onClick={increm} className="text-3l cursor-pointer">+</div>
            </div>
            <Button name={'hinzufugen'} onClick={addBasket}/>
        </div>
      </div>
    }
      
    </div>
  );
};

export default Deatail;
