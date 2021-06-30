
import { useState } from "react";
import {useStateProvider} from "../index";
import "./filter.css";
import {branFashionBrandsds, FashionBrands} from "../../data"
export const Filter = () => {

const [temp,settemp] = useState(true);
const {state,dispatch} = useStateProvider();

function SortPrice (e) {
  dispatch({type:"SORT",payload:e.target.value})
}
    return (
          <div className="main-div-filter">

            <div className="filter-top-div">
            <h3 className="filter-tag">Filters</h3>
            <button
                    className='btn-clear-filter'
                    onClick={()=>{
                      dispatch({type:"CLEAR_ALL_FILTERS"})
                    }}
                    >
                     Clear Filters
                    </button>

                    </div>

            <div className="filter sort-by">
               <p className="flter-sort-tag">Sort By :</p>
               <div className="sort-by">
                   <label >
                       <input
                   type="radio"
                   name="sort"
                   value="LOW_TO_HIGH_PRICE"
                   onChange={()=>{
                    dispatch({ type: "SORT", payload:"LOW_TO_HIGH_PRICE" });

                   }}
                   checked={state.SortBy === "LOW_TO_HIGH_PRICE"}

                   />
                      Price Low to High
                    </label>
               
               </div>
               <div >
               <label>
                       <input
                   type="radio"
                   name="sort"
                   value="HIGH_TO_LOW_PRICE"
                   onChange={()=>{
                    dispatch({ type: "SORT", payload:"HIGH_TO_LOW_PRICE" });
                   }}
                   checked={state.SortBy === "HIGH_TO_LOW_PRICE"}
               
                   />
                      Price High To Low
                    </label>
               </div>
            </div>

            <div className='sort-by'>
            <div >
            <label>
            <input
             checked
             type="checkbox"
             checked={state.dataFilter.includeOutOfStock}
             onChange={() => {
               dispatch({
                 type: "INCLUDE_OUT_OF_STOCK",
                 payload: !state.dataFilter.includeOutOfStock
               });
             }}
            />
            Include out of stock
          </label>
        </div>
        <div>
          <label>
            <input
              type='checkbox'
              checked={state.showFastDeliveryOnly}
              onChange={() => dispatch({ type: "TOGGLE_DELIVERY" })}
            />
            Fast Delivery Only
          </label>
        </div>
      </div>

               <div className='filter sort-by'>
                  <label>Price Range : to <span className="price-range">{state.ProductPriceRange}</span></label>
                   <input
                     type='range'
                     min='300'
                     step='100'
                     max='2000'
                     
                     value={state.ProductPriceRange}
                     onChange={(e) =>
                      dispatch({ type: "PRICE_RANGE", payload: Number(e.target.value) })
                    }
                    />
                </div>

                <div className="filter-brands-div">
                  <p className="filter-brands-tag">Brands :</p>
                  {FashionBrands.map((item)=> {
                    return (
                      <label className="filter-brands-label">
                        <input 
                        type="checkbox"
                        checked={state.dataFilter.filterByBrands.includes(item)}
                        onChange={()=> {
                          dispatch({type:"FILTER_BY_BRANDS",payload:item})
                        }}
                        />
                        
                        {item}
                      </label>
                    )
                  })}
                </div>

                

          </div>
    )
}