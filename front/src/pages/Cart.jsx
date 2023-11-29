import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../redux/cardSlice";

const Cart = () => {
  const { carts } = useSelector((state) => state.cart);
  const dispatch = useDispatch()

  console.log(carts);
  const deleteItem = (id)=>{
    dispatch(removeFromCart(id))

  }
  return (
    <div className="h-min-screen">
      Cart
      {carts?.length > 0 ? (
        <div>
          {carts.map((item, i) => (
            <div className="flex items-center justify-between border-b mb-2 py-2 px-4" key={i}>
              <div> {item.name} </div>
              <div> {item.price}</div>
              <div> {item.quantity}</div>
              <button onClick={()=>deleteItem(item?.id)} className="w-[150px] h-12 flex items-center justify-center rounded-md bg-red-500 text-white">REMOVE</button>
            </div>
          ))}
        </div>
      ) : (
        <div>Leider hat Ihnen Box  nixht etwas</div>
      )}
    </div>
  );
};

export default Cart;
