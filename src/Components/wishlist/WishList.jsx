import { useNavigate } from "react-router-dom";
import {useStateProvider} from "../index"
import "./wishlist.css";
import {AddProductToCart,isAlreadyExist,RemoveProductWishlist} from "../../ApiCalls/api-calls"
import {useAuth,Toast} from "../index";



export const WishList = () => {
const {state,dispatch} = useStateProvider();
const { isUserloggedIn, userId } = useAuth();
const navigate = useNavigate();

    return (

        <div className="wishlist-main-div">
             
            {state.itemsInWishlist.length === 0 ? <h1 className="cart-title">Empty</h1> : <h1 className="cart-title">My Wishlist</h1> }
          <>
                {state.itemsInWishlist.map(({ productId: product })=> {

                    return (
                        <div className="wishlist-card-div">
                           <div className="wishlist-card-img-div">
                               <img src={product.image} 
                               className="wishlist-img"
                               />
                            </div>

                        <div className="wishlist-card-info-div">
                            <p className="cart-info-name">{product.name}</p>
                            <p className="cart-info-brand">Brand: <span>{product.brand}</span></p>
                            <p className="cart-info-rating">Rating: <span>{product.rating}<i class='bx bxs-star'></i></span></p>
                            <p className="cart-info-price">Rs. {product.price} <span>({product.offer}%off)</span></p>
                         
                            <button 
                            onClick={()=> {
                                isUserloggedIn ? isAlreadyExist(state.itemsInCart,product._id)
                                ?  navigate("/cart") : AddProductToCart({
                                   
                                    state,
                                    dispatch,
                                    product,
                                    userId
                                }) : navigate("/login")
                            }}
                            className="btn-movetocart">
                                Move TO Cart
                            </button>

                            <button 
                            onClick={()=>{
                                RemoveProductWishlist({state,
                                    dispatch,
                                    product,
                                    userId})
                            }}
                            className="btn-movetocart">
                                    Remove
                                </button>
                            </div>
                            {state.toast.value && <Toast message = {state.toast.message}/>}


                                

                        </div> 


                    )
                })} 
                </>
            
        </div>
    )
}