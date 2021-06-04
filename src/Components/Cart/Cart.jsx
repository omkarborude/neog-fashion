import { useEffect } from "react";
import { getApiProduct, updateUserOrder } from "../../ApiCalls/api-calls";
import { API } from "../index";
import { useStateProvider } from "../index";
import { toast } from "react-toastify";
import { CartProductCard } from "./CartProductCard";
import { CartValueDetails } from "./CartValue";
import { useAuth } from "../index";
import "./cart.css";

export const Cart = () => {
  useEffect(() => {
    toast("Loading Cart!", {
      position: "top-right",
      autoClose: 2000,
    });
  }, []);

  const { state, dispatch } = useStateProvider();
  const { isUserloggedIn, userId } = useAuth();

  return (
    <>
      <h1 className="cart-title">My Cart</h1>

      {state?.itemsInCart?.length === 0 ? (
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
          </div>
        </>
      )}
    </>
  );
};
