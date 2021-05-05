import { useEffect, useState } from "react";
import { useStateProvider } from "../index";

const rupee = `\u20B9`;

export const CartValueDetails = () => {
  const { state } = useStateProvider();
  
 const getTotalCartValue = (cart) => {
    return cart.reduce((acc,curr) => {
        return acc+(Number(curr.productId.price) * curr.quantity)
    },0)
}
  

  return (
    <>
      <div className="cart-value-div">
        <div className="cart-value-inner-div">

          <div className="cart-value-details-div">
          <h3>Price Details</h3>
          </div>

          <div className="cart-value-length-div">
            <p>Total Products:</p>
            <div>
            <span> {state.itemsInCart.length}</span>  
            </div>
          </div>

          <div className="cart-value-delivery-div">
              <p>Delivery Charges :</p>
              <div>
              <span className="delivery-div-span"><p>{rupee}.99</p> FREE</span>
              </div>
          </div>

          <div className="cart-value-totalamount-div">
            <p>Total Amount:</p>
            <div>
            <span>Rs.{getTotalCartValue(state.itemsInCart)}</span>
            </div>
        </div>
        </div>
      </div>
    </>
  );
};
