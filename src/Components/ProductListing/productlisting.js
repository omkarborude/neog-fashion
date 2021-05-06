import { Link } from "react-router-dom";
import {useStateProvider,Toast} from "../index"
import {getPriceSortProducts,getRangedPrice,getFilterProducts,getFilteredData} from "../Filters/ProductFilter";
import {FilterMobile} from "../Filters/FilterMobile"
import "./productlisting.css";
import {AddToCartBTN} from "./AddToCartBTN";
export function ProductListing() {
    
const {state,dispatch} = useStateProvider();
const sortedProduct = getPriceSortProducts(state,state.products)
const DeliveryFilter = getFilteredData(sortedProduct,state.showFastDelivery)
const PriceRageData = getRangedPrice(DeliveryFilter,state.ProductPriceRange);
const FilterProducts = getFilterProducts(state, PriceRageData);
return (
        <>
        <div className="main-div">
            {/* filter section */}
            <div className="filter-div">
            <FilterMobile/>
            </div>

            {/* productlisting section */}
            <div  className="lisiting-div">
            {FilterProducts.map((item) => {
                return <div className="product-card">

                     <div className="img-div">
                         <img src={item.image}>
                         </img>
                    </div>
                    
                       <div className="info-section">
                            
                            <div className="info-name">
                            <h6 className="product-name">
                                {/* <Link to={`/products/${item._id}`} 
                                className="product-name"
                                > */}
                                {item.name}
                                {/* </Link> */}
                                </h6>
                            </div>

                            <div className="info-middle">
                               <p className="product-brand">{item.brand}</p>
                               
                               <p className="product-rating">
                                   {item.rating} <i class="fas fa-star"></i>
                                   </p>

                                   <p className="producr-price">Rs.{item.price}

                                    <span className="product-offer">
                                    ({item.offer}% OFF)
                                </span>
                               </p>
                            </div>
                                     
                             {/* create after user auth  */}
                            <div className="addToCart-btn-div">
                                     <AddToCartBTN 
                                     key={item._id}
                                     product={item}
                                     />
                                   

                            </div>
 
  


                       </div>
                </div>
            })}
        </div>
        {state.toast.message && <Toast message = {state.toast.message}/>}
</div>
        </>
    )
}