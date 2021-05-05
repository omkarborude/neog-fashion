import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import {useAuth} from "../index";
import {useStateProvider} from "../index";
import {AddProductToCart} from "../../ApiCalls/api-calls";
import {isAlreadyExist} from "../../ApiCalls/api-calls";
import "./productlisting.css";

export function AddToCartBTN({product}) {

    const { state, dispatch } = useStateProvider();
    const { isUserloggedIn, userId } = useAuth();
    const navigate = useNavigate();


    return (
        <>
           <button className="btn-addtocart"
           onClick={()=> {
               isUserloggedIn ? isAlreadyExist(state.itemsInCart,product._id)
               ?  navigate("/cart") : AddProductToCart({
                  
                   state,
                   dispatch,
                   product,
                   userId
               }) : navigate("/login")
           }}
           >
               add to cart
           </button>
        </>
    )
}