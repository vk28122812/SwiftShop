import React from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/cart";
import toast from "react-hot-toast";
export default function Product({
  _id:id,
  image,
  title,
  price,
  description
}){
  const source = `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api'}${image}`;

  const dispatch = useDispatch();
  function handleClick(){
    toast(`${title} added to cart!`);
    dispatch(cartActions.addItemQuantity({id,title,price}));
  }
  return (
    <article className="product">
      <img src={source} alt={title} />
      <div className="product-content">
        <div>
          <h3>{title}</h3>
          <p className='product-price'>₹ {price}</p>
          <p>{description}</p>
        </div>
        <p className='product-actions'>
          <button onClick={handleClick}>Add to Cart</button>
        </p>
      </div>
    </article>
  );
}
