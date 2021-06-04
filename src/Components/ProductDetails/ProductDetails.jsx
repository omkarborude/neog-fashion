import "./productdetails.css";
import { useStateProvider, useAuth } from "../index";
import { useLocation, useNavigate } from "react-router-dom";
import { AddToCartBTN } from "../ProductListing/AddToCartBTN";
import { isAlreadyExist } from "../../ApiCalls/api-calls";
import {
  AddProductToCart,
  AddProductToWishlist,
} from "../../ApiCalls/api-calls";

export const ProudctDetails = () => {
  const navigate = useNavigate();

  const { state, dispatch } = useStateProvider();
  const { isUserloggedIn, userId } = useAuth();
  const {
    state: { product },
  } = useLocation();

  var totalStarsArray = [];
  for (var j = 1; j <= product.rating; j++) {
    totalStarsArray.push(<i class="fas fa-star"></i>);
  }

  return (
    <div>
      <h1 className="product-detail-tag">Product Details</h1>

      {/* card div */}
      <div className="product-detail-card-div">
        {/* img div */}
        <div className="product-detail-card-img-div">
          <img className="product-detail-card-img" src={product.image} />
        </div>
        {/* info div */}
        <div className="product-detail-card-info-div">
          {/* product info */}
          <div className="product-detail-card-product-info">
            <h1>{product.name}</h1>
            <p className="product-detail-brand">
              Brand:{" "}
              <span className="product-detail-info-color-black">
                {product.brand}
              </span>
            </p>
            <p className="product-detail-category">
              Category:{" "}
              <span className="product-detail-info-color-black">
                {product.category}
              </span>
            </p>
            <p className="product-detail-fastD">
              {" "}
              Fast Delivery :
              {product.fastDelivery ? (
                <i class="fas fa-check-circle"></i>
              ) : (
                <i class="fas fa-times-circle"></i>
              )}
            </p>
            <p className="product-detail-inStock">
              {" "}
              In Stock :
              {product.inStock ? (
                <i class="fas fa-check-circle"></i>
              ) : (
                <i class="fas fa-times-circle"></i>
              )}
            </p>
            <p className="product-detail-fastD">{product.fastDelivery}</p>
            <p className="product-detail-price">
              Price: <span>Rs.{product.price}</span>
              <span className="product-offer">({product.offer}% OFF)</span>
            </p>
            <p className="product-detail-rating">
              {/* Rating: <span>{product.rating}</span> <i class="fas fa-star"></i> */}
              Rating:{" "}
              {totalStarsArray.map((star) => {
                return star;
              })}
            </p>

            <div className="btn-radio-product-detail-option">
              <p>Select Size:</p>
              <input type="radio" id="radio01-01" name="demo01" />
              <label for="radio01-01" className="product-size-radio-btn">
                Small
              </label>
              <input type="radio" id="radio01-02" name="demo01" />
              <label for="radio01-02" className="product-size-radio-btn">
                Medium
              </label>
              <input type="radio" id="radio01-03" name="demo01" />
              <label for="radio01-03" className="product-size-radio-btn">
                Large
              </label>
            </div>
          </div>

          {/* btns  */}
          <div className="product-detail-card-btn-div">
            <button
              className="btn-product-detail-addtocart"
              onClick={() => {
                isUserloggedIn
                  ? isAlreadyExist(state?.itemsInCart, product._id)
                    ? navigate("/cart")
                    : AddProductToCart({
                        state,
                        product,
                        userId,
                        dispatch,
                      })
                  : navigate("/login");
              }}
            >
              {isAlreadyExist(state?.itemsInCart, product._id)
                ? "Go To Cart"
                : "Add TO Cart"}{" "}
              <i class="fab fa-opencart"></i>
            </button>
            <button
              className="btn-product-detail-addtowishlist"
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
              {isAlreadyExist(state?.itemsInWishlist, product._id)
                ? "Go To Wish List"
                : "Add TO Wish List"}{" "}
              {isAlreadyExist(state.itemsInWishlist, product._id) ? (
                <i class="fab fa-gratipay"></i>
              ) : (
                <i class="far fa-heart"></i>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
