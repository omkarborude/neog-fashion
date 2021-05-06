import { useEffect } from "react";
import {getApiProduct} from "../../ApiCalls/api-calls"
import {API} from "../index"
import { useStateProvider } from "../index";
import { CartProductCard } from "./CartProductCard";
import { CartValueDetails } from "./CartValue";
import {useAuth,Toast} from "../index";
import "./cart.css"
export const Cart = () => {
  const { state,dispatch} = useStateProvider();
  const {isUserloggedIn,userId} = useAuth();
  
  const hideToast = () => {
    setTimeout(() => {
        dispatch({type:"TOGGLE_TOAST",payload:"", value: false});
      }, 1000)
  }

  useEffect(()=> {
    if (isUserloggedIn) {
     
      dispatch({type:"TOGGLE_TOAST",payload:"Loading Cart..", value: true});
       (async  ()  => {
        try {
          const {data:{response}} = await getApiProduct(`${API}/carts/${userId}/cart`);
          dispatch({type:"LOAD_CART",payload:response});
          hideToast()
        }catch(error) {
          console.log(error.message)
        }
       
        
      }) ()
    }
  },[isUserloggedIn])


  return (
    <>
      <h1 className="cart-title">My Cart</h1>

      {state.itemsInCart.length === 0 ? (
        <h2 className="cart-empty">Cart is empty</h2>
      ) : (
        <>
          <div className="cart-main-div">
            <div className="cart-product-cart-div">
            <div className="cart-product-card">
              {state.itemsInCart.map(({ productId: product, quantity }) => {
                return (
                
                    <CartProductCard
                      key={product._id}
                      product={{ ...product, quantity }}
                    />
                   
                );
              })}
            </div>
            </div>
            <div className="cart-value-main-div">
           <CartValueDetails />
           </div>
           {state.toast.value && <Toast message = {state.toast.message}/>}
          </div>
        </>
      )}
    </>
  );
};
