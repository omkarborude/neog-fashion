import axios from "axios";
import {API} from "../API";



// getting product from api
export async function getApiProduct (URL) {
   const response = await axios({method:"GET",url:URL});

   if (response.status ===200 || response.status===201){
       return response;
   } else {
       return "Faild to load product."
   }
}

// already exist 
export const isAlreadyExist = (array, id) => {
    for (let product of array) {
      if (product.productId._id === id) 
      return true;
    }
    return false;
  };

//   add product to cart
export const AddProductToCart = async (
  { state,
    product,
    userId,
    dispatch,
    }) => {
      const hideToast = () => {
        setTimeout(() => {
            dispatch({type:"TOGGLE_TOAST",payload:"", value: false});
          }, 1000)
      }
      dispatch({type:"TOGGLE_TOAST",payload:"Adding To Cart..", value: true});
    try {
        const {data: {response},status} = await axios({
            method:"POST",
            url:`${API}/carts/${userId}/cart`,
            data:{ 
                _id:product._id,
                active:true,
                quantity:1
            }
        });
        if (status === 200 || status === 201) {
          console.log(status)
          
            dispatch({
                type:"LOAD_CART",
                paylaod:response
            });
            dispatch({type:"TOGGLE_TOAST",payload:"Added !", value: true});
           hideToast()
            
            
        }
    } catch (error) {
        console.log(error.message);
        
    }

};

// add product to wishlist 
export const AddProductToWishlist = async ({
  state,
  dispatch,
  product,
  userId
}) => {
  const hideToast = () => {
    setTimeout(() => {
        dispatch({type:"TOGGLE_TOAST",payload:"", value: false});
      }, 1000)
  }
  dispatch({type:"TOGGLE_TOAST",payload:"adding  !", value: true})

  try{
    const {data:{response},status} = await axios({
      method:"POST",
      url:`${API}/wishlist/${userId}/wishlist`,
      data:{ 
        _id:product._id,
        active:true,
    }
    });

    if (status === 201 || status === 200) {
      dispatch({type:"LOAD_WISHLIST",paylaod:response})
    }
    dispatch({type:"TOGGLE_TOAST",payload:"Added !", value: true});
    hideToast()
  } catch (error) {
    console.log(error.message);
    }
  
}


export const RemoveProductWishlist = async ({
  state,
  dispatch,
  product,
  userId
}) => {
  const hideToast = () => {
    setTimeout(() => {
        dispatch({type:"TOGGLE_TOAST",payload:"", value: false});
      }, 1000)
  }
  dispatch({type:"TOGGLE_TOAST",payload:"Removing..", value: true});
  try {
  
    const {
      data: { response },
      status
    } = await axios({
      method: "POST",
      url: `${API}/wishlist/${userId}/wishlist`,
      data: {
        _id: product._id,
        active: false
      }
    });
    if (status === 200 || status === 201) {
      dispatch({
        type: "LOAD_WISHLIST",
        payload: response
      });
      dispatch({type:"TOGGLE_TOAST",payload:"Removed !", value: true});
      hideToast()
    }
  } catch (error) {
    console.error(error);
    
  } 
};



// remove product from cart
export const RemoveProductCart = async ({
  state,
  dispatch,
  product,
  userId
}) => {
  const hideToast = () => {
    setTimeout(() => {
        dispatch({type:"TOGGLE_TOAST",payload:"", value: false});
      }, 1000)
  }
  dispatch({type:"TOGGLE_TOAST",payload:"Removing..", value: true});
  try {
  
    const {
      data: { response },
      status
    } = await axios({
      method: "POST",
      url: `${API}/carts/${userId}/cart`,
      data: {
        _id: product._id,
        quantity: 0,
        active: false
      }
    });
    if (status === 200 || status === 201) {
      dispatch({
        type: "LOAD_CART",
        payload: response
      });
      dispatch({type:"TOGGLE_TOAST",payload:"Removed !", value: true});
      hideToast()
    }
  } catch (error) {
    console.error(error);
    
  } 
};

export const IncProductQuantityCart = async ({
  state,
  dispatch,
  product,
  userId
}) => {
  const hideToast = () => {
    setTimeout(() => {
        dispatch({type:"TOGGLE_TOAST",payload:"", value: false});
      }, 1000)
  }
  dispatch({type:"TOGGLE_TOAST",payload:"Updating..", value: true});
  try {
   
    const {
      data: { response },
      status
    } = await axios({
      method: "POST",
      url: `${API}/carts/${userId}/cart`,
      data: {
        _id: product._id,
        quantity: product.quantity + 1,
        active: true
      }
    });
    if (status === 200 || status === 201) {
      dispatch({
        type: "LOAD_CART",
        payload: response
      });
      dispatch({type:"TOGGLE_TOAST",payload:"Updated !", value: true});
      hideToast()
      
    }
  } catch (error) {
    console.error(error);
    
  } 
};

export const DecProductQuantityCart = async ({
  state,
  dispatch,
  product,
  userId
}) => {
  const hideToast = () => {
    setTimeout(() => {
        dispatch({type:"TOGGLE_TOAST",payload:"", value: false});
      }, 1000)
  }
  dispatch({type:"TOGGLE_TOAST",payload:"Updating..", value: true});

  try {
    const {
      data: { response },
      status
    } = await axios({
      method: "POST",
      url: `${API}/carts/${userId}/cart`,
      data: {
        _id: product._id,
        quantity: product.quantity - 1,
        active: true
      }
    });
    if (status === 200 || status === 201) {
      dispatch({
        type: "LOAD_CART",
        payload: response
      });
      dispatch({type:"TOGGLE_TOAST",payload:"Updated !", value: true});
        hideToast()
      
    }
  } catch (error) {
    console.error(error);
    
  } 
};


