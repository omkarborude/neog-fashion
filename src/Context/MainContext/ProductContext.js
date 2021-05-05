export function stateReducer (state, {type,payload,value}) {

switch (type) {

    // setting products from api
    case "LOAD_PRODUCTS":
        return {...state,products:payload}

        // user Cart
        case "LOAD_CART":
            return {...state, itemsInCart: payload};

            // filter data

            case "SORT":
            return { ...state, SortBy: payload };
            // case "SORT": {
            //     if(payload==="HIGH_TO_LOW_PRICE") {
            //         return {...state, SortBy: "HIGH_TO_LOW_PRICE"}
            //     }
            //       if (payload==="LOW_TO_HIGH_PRICE") {
            //         return {...state, SortBy:"LOW_TO_HIGH_PRICE"}
            //     }
            // }

            case "INCLUDE_OUT_OF_STOCK": {
                return {
                  ...state,
                  dataFilter: { ...state.dataFilter, includeOutOfStock: payload }
                };
              }
              case "TOGGLE_DELIVERY":
             return { ...state, showFastDelivery: !state.showFastDelivery };

             case "PRICE_RANGE":
             return { ...state, ProductPriceRange:payload };

            case "CLEAR_ALL_FILTERS": {
                return {
                  ...state,
                  SortBy: "",
                  showFastDelivery:false,
                  ProductPriceRange:1500,
                  dataFilter: {
                    includeOutOfStock: false,
                    filterByBrands: [],
                  }
                };
                console.log(state)
              }
              
              case "FILTER_BY_BRANDS": {
                  return state.dataFilter.filterByBrands.includes(payload)
                  ? {
                      ...state,dataFilter:{
                          ...state.dataFilter,filterByBrands:state.dataFilter.filterByBrands.filter((item)=>item !==payload)
                      }
                  } :
                  {
                    ...state,
                    dataFilter: {
                      ...state.dataFilter,
                      filterByBrands: state.dataFilter.filterByBrands.concat(payload)
                    }
                  };
              }

              case "TOGGLE_TOAST":
              return {...state,toast:{value:value,message:payload}}

              default:
                  return state;
}

   
}