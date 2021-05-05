import { useState } from "react";
import "./cart.css"
import { CartCardBTN } from "./CartCardBTN";
import { Link } from "react-router-dom";
import {RemoveProductCart} from "../../ApiCalls/api-calls";
import { useAuth, useStateProvider } from "../index";
export const CartProductCard = ({ product }) => {

  const { userId } = useAuth();
  const { state,dispatch} = useStateProvider();

  

  return (
    <>
   
      <div className="cart-card-div">

          <div className="cart-card-img-div">
              <img style={{width:'100%'}}
              src={product.image}
              />
          </div>

          <div className="cart-card-info">
              <p className="cart-info-name">{product.name}</p>
              <p className="cart-info-brand">Brand: <span>{product.brand}</span></p>
              <p className="cart-info-rating">Rating: <span>{product.rating}<i class='bx bxs-star'></i></span></p>
              <p className="cart-info-price">Rs. {product.price} <span>({product.offer}%off)</span></p>
            
          <div className="cart-card-btn-div">
          <CartCardBTN
          product={product}
          />
          </div>

          </div>

         <div className="cart-card-remove-btn-div">
           <button className="btn-remove-cart-card"
           onClick={() =>{
            RemoveProductCart({
              dispatch,
              product,
              userId
            })
           }}
           >
           <i class="fas fa-times"></i></button>
         </div>

      </div>
    </>
  );
};
