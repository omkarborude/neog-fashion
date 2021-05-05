import {useState} from "../index";


export function getPriceSortProducts(state,data) {

    if (state.SortBy === "HIGH_TO_LOW_PRICE") {
        return [...data].sort((acc, product) => {
          return Number(product.price) - Number(acc.price);
        });
      }
      if (state.SortBy === "LOW_TO_HIGH_PRICE") {
        return [...data].sort((acc, product) => {
          return Number(acc.price) - Number(product.price);
        });
      }
      return data;
}

export const getFilterProducts = (state,data) => {
  let dataArray = [...data];
  if(!state.dataFilter.includeOutOfStock){
    dataArray = dataArray.filter((product) => product.inStock);
  }
  if (state.dataFilter.filterByBrands.length !== 0)
    dataArray = dataArray.filter((product) =>
      state.dataFilter.filterByBrands.includes(product.brand)
    );
  return dataArray;
}

export const getFilteredData = 
(data,showFastDelivery) => {
  return data
    .filter(({ fastDelivery }) => (showFastDelivery ? fastDelivery : true))
};

export const getRangedPrice = (productList, ProductPriceRange) => {
  return productList.filter((item) => {
    return item.price <= ProductPriceRange;
  });
};
