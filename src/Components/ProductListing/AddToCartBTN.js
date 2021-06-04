import { useNavigate } from "react-router-dom";
import { useAuth } from "../index";
import { useStateProvider } from "../index";
import {
  AddProductToCart,
  AddProductToWishlist,
} from "../../ApiCalls/api-calls";
import { isAlreadyExist } from "../../ApiCalls/api-calls";
import "./productlisting.css";

export function AddToCartBTN({ product }) {
  const { state, dispatch } = useStateProvider();
  const { isUserloggedIn, userId } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <button
        className="btn-addtocart"
        onClick={() => {
          isUserloggedIn
            ? isAlreadyExist(state?.itemsInCart, product._id)
              ? navigate("/cart")
              : AddProductToCart({
                  state,
                  dispatch,
                  product,
                  userId,
                })
            : navigate("/login");
        }}
      >
        {isAlreadyExist(state?.itemsInCart, product._id)
          ? "Go To Cart"
          : "Add TO Cart"}
      </button>

      <div className="addtowishlist-btn-div">
        <button
          className="btn-addtowishlist"
          onClick={() => {
            isUserloggedIn
              ? isAlreadyExist(state.itemsInWishlist, product._id)
                ? navigate("/wishlist")
                : AddProductToWishlist({
                    state,
                    dispatch,
                    product,
                    userId,
                  })
              : navigate("/login");
          }}
        >
          {isAlreadyExist(state.itemsInWishlist, product._id) ? (
            <i class="fab fa-gratipay"></i>
          ) : (
            <i class="far fa-heart"></i>
          )}
        </button>
      </div>
    </>
  );
}
