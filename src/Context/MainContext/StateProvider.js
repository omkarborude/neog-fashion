import { createContext, useContext, useReducer, useState } from "react";
import {stateReducer} from "./ProductContext"


const StateContext = createContext();

export function StateProvider({children}) {

    
 
    
     
    const [state,dispatch] = useReducer(stateReducer,{
        products: [],
        itemsInCart: [],
        SortBy:"",
        showFastDelivery:false,
        ProductPriceRange:2000,
        
        dataFilter: {
            includeOutOfStock: true,
            filterByBrands: [],
          },
        toast: {
            value:false,
            message:""
        }
    
    });
     
    return (
      <StateContext.Provider value={{state,dispatch}}>
            {children}
        </StateContext.Provider>
    );
}

export const useStateProvider = () => 
     useContext(StateContext);
