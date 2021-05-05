import { useEffect, useRef } from "react";
import "./cart.css"
import { useAuth, useStateProvider } from "../index";
import {
  IncProductQuantityCart,
  DecProductQuantityCart,
  RemoveProductCart
} from "../../ApiCalls/api-calls";

export const CartCardBTN = ({
  product,
  setMessage,
  
}) => {
  const { userId } = useAuth();
  const { state,dispatch} = useStateProvider();

 


  return (
    <>
      <button
        className=
             "btn-trash-or-minus"
        onClick={() =>
          
          product.quantity !== 1
            ? DecProductQuantityCart({
                state,
                dispatch,
                product,
                userId
              })
            : RemoveProductCart({
              state,
              dispatch,
              product,
              userId
              })
        }  
      >
        <span>
          <i
            className={
              product.quantity !== 1 ? "bx bx-minus" : "bx bx-trash"
            }
          ></i>
        </span>
      </button>


      <span className="cart-card-quantity">
        {product.quantity}
      </span>

      <button
        className= "btn-cart-card-inrcease"
        onClick={() =>
          IncProductQuantityCart({
            dispatch,
            product,
            userId
          })
        }
      >
        <span>
          <i className="bx bx-plus"></i>
        </span>
      </button>
    </>
  );
};
