import { useStateProvider, Toast } from "../index";
import { Link, useNavigate } from "react-router-dom";
import {
  getPriceSortProducts,
  getRangedPrice,
  getFilterProducts,
  getFilteredData,
} from "../Filters/ProductFilter";
import { toast } from "react-toastify";
import { FilterMobile } from "../Filters/FilterMobile";
import "./productlisting.css";
import { AddToCartBTN } from "./AddToCartBTN";
import { useEffect } from "react";
export function ProductListing() {
  useEffect(() => {
    toast("Loading Products!", {
      position: "top-right",
      autoClose: 2000,
    });
  }, []);
  const { state, dispatch } = useStateProvider();
  const sortedProduct = getPriceSortProducts(state, state.products);
  const DeliveryFilter = getFilteredData(sortedProduct, state.showFastDelivery);
  const PriceRageData = getRangedPrice(DeliveryFilter, state.ProductPriceRange);
  const FilterProducts = getFilterProducts(state, PriceRageData);
  return (
    <>
      <div className="main-div">
        {/* filter section */}
        <div className="filter-div">
          <FilterMobile />
        </div>

        {/* productlisting section */}
        <div className="lisiting-div">
          {FilterProducts.map((item) => {
            var totalStarsArray = [];
            for (var j = 1; j <= item.rating; j++) {
              totalStarsArray.push(<i class="fas fa-star"></i>);
            }
            return (
              <div className="product-card">
                <div>
                  <div className="img-div">
                    <img src={item.image}></img>
                  </div>
                  <Link
                    to={`/${item._id}`}
                    state={{ product: item }}
                    className="Link"
                  >
                    <div className="info-section">
                      <div className="info-name">
                        <h6 className="product-name">{item.name}</h6>
                      </div>

                      <div className="info-middle">
                        <p className="product-brand">{item.brand}</p>

                        <p className="product-rating">
                          {totalStarsArray.map((star) => {
                            return star;
                          })}
                        </p>

                        <p className="producr-price">
                          Rs.{item.price}
                          <span className="product-offer">
                            ({item.offer}% OFF)
                          </span>
                        </p>
                      </div>
                    </div>
                  </Link>

                  {/* create after user auth  */}
                  <div className="addToCart-btn-div">
                    <AddToCartBTN key={item._id} product={item} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
