import { toast } from "react-toastify";
import { API } from "../API";
import axios from "axios";

// getting product from api
export async function getApiProduct(URL) {
  const response = await axios({ method: "GET", url: URL });

  if (response.status === 200 || response.status === 201) {
    return response;
  } else {
    return "Faild to load product.";
  }
}

// already exist
export const isAlreadyExist = (array, id) => {
  if (array) {
    return array.find((item) => item.productId._id === id);
  }
  return false;
};

// Address Default
export const isAddressDefault = (array, id) => {
  if (array) {
    return array.find((item) => item._id === id);
  }
  return false;
};

//   add product to cart
export const AddProductToCart = async ({
  state,
  product,
  userId,
  dispatch,
}) => {
  try {
    toast.dark("Adding to Cart!", {
      position: "top-right",
      autoClose: 2000,
    });
    const {
      data: { response },
      status,
    } = await axios({
      method: "POST",
      url: `${API}/carts/${userId}/cart`,
      data: {
        _id: product._id,
        active: true,
        quantity: 1,
      },
    });

    if (status === 200 || status === 201) {
      // dispatch({
      //   type: "LOAD_CART",
      //   paylaod: response,
      // });
      dispatch({
        type: "LOAD_CART",
        payload: response,
      });
    }
  } catch (error) {
    alert(error.message);
  }
};

// add product to wishlist
export const AddProductToWishlist = async ({
  state,
  dispatch,
  product,
  userId,
}) => {
  try {
    toast.dark("Adding to Wishlist!", {
      position: "top-right",
      autoClose: 2000,
    });
    const {
      data: { response },
      status,
    } = await axios({
      method: "POST",
      url: `${API}/wishlist/${userId}/wishlist`,
      data: {
        _id: product._id,
        active: true,
      },
    });

    if (status === 201 || status === 200) {
      dispatch({ type: "LOAD_WISHLIST", payload: response });
    }
  } catch (error) {
    alert(error.message);
  }
};

export const RemoveProductWishlist = async ({
  state,
  dispatch,
  product,
  userId,
}) => {
  try {
    toast.dark("Updating Wishlist!", {
      position: "top-right",
      autoClose: 2000,
    });
    const {
      data: { response },
      status,
    } = await axios({
      method: "POST",
      url: `${API}/wishlist/${userId}/wishlist`,
      data: {
        _id: product._id,
        active: false,
      },
    });
    if (status === 200 || status === 201) {
      dispatch({
        type: "LOAD_WISHLIST",
        payload: response,
      });
    }
  } catch (error) {
    alert(error.message);
  }
};

// remove product from cart
export const RemoveProductCart = async ({
  state,
  dispatch,
  product,
  userId,
}) => {
  try {
    toast.dark("Updating Cart!", {
      position: "top-right",
      autoClose: 2000,
    });
    const {
      data: { response },
      status,
    } = await axios({
      method: "POST",
      url: `${API}/carts/${userId}/cart`,
      data: {
        _id: product._id,
        quantity: 0,
        active: false,
      },
    });
    if (status === 200 || status === 201) {
      dispatch({
        type: "LOAD_CART",
        payload: response,
      });
    }
  } catch (error) {
    alert(error.message);
  }
};

export const IncProductQuantityCart = async ({
  state,
  dispatch,
  product,
  userId,
}) => {
  try {
    toast("Updating Cart!", {
      position: "top-right",
      autoClose: 2000,
    });
    const {
      data: { response },
      status,
    } = await axios({
      method: "POST",
      url: `${API}/carts/${userId}/cart`,
      data: {
        _id: product._id,
        quantity: product.quantity + 1,
        active: true,
      },
    });
    if (status === 200 || status === 201) {
      dispatch({
        type: "LOAD_CART",
        payload: response,
      });
    }
  } catch (error) {
    alert(error.message);
  }
};

export const DecProductQuantityCart = async ({
  state,
  dispatch,
  product,
  userId,
}) => {
  try {
    toast("Updating Cart!", {
      position: "top-right",
      autoClose: 2000,
    });
    const {
      data: { response },
      status,
    } = await axios({
      method: "POST",
      url: `${API}/carts/${userId}/cart`,
      data: {
        _id: product._id,
        quantity: product.quantity - 1,
        active: true,
      },
    });
    if (status === 200 || status === 201) {
      dispatch({
        type: "LOAD_CART",
        payload: response,
      });
    }
  } catch (error) {
    alert(error.message);
  }
};

// Address Api Calls

export const updateNewAddress = async (address, dispatch, userId) => {
  try {
    toast("Updating Address!", {
      position: "top-right",
      autoClose: 2000,
    });
    const { status, data } = await axios.post(
      `${API}/address/${userId}/addresses`,
      address
    );
    if (status === 200 || status === 201) {
      dispatch({
        type: "UPDATE_USER_ADDRESSES",
        payload: data.response.addresses,
      });
    }
  } catch (error) {
    alert(error.message);
  }
};

export const updateDefaultAddress = async (dispatch, userId, addressId) => {
  try {
    toast.dark("Updating Default Address!", {
      position: "top-right",
      autoClose: 2000,
    });
    const { status, data } = await axios.post(
      `${API}/address/${userId}/defaultaddress/${addressId}`
    );
    dispatch({
      type: "UPDATE_DEFAULT_ADDRESS",
      payload: data.response,
    });
  } catch (error) {
    alert(error.message);
  }
};

export const removeAddress = async (dispatch, addressId, userId) => {
  try {
    toast.dark("Updating...", {
      position: "top-right",
      autoClose: 2000,
    });
    const { status, data } = await axios.delete(
      `${API}/address/${userId}/addresses/${addressId}`
    );
    dispatch({
      type: "UPDATE_USER_ADDRESSES",
      payload: data.response.addresses,
    });
  } catch (error) {
    alert(error.message);
  }
};

export const updateUserOrder = async (dispatch, state, userId, navigate) => {
  const cartProducts = state.itemsInCart;
  const defaultAddres = await state.userSelectedAddress.find(function (e) {
    return e;
  });
  const orderDetails = {
    products: cartProducts.map(({ productId }) => ({
      name: productId.name,
      price: productId.price,
      brand: productId.brand,
      _id: productId._id,
      image: productId.image,
    })),
    deliveryaddress: defaultAddres,
  };
  try {
    toast("Placing Order!", {
      position: "top-right",
      autoClose: 2000,
    });
    const { status, data } = await axios.post(
      `${API}/userorders/${userId}`,
      orderDetails
    );
    dispatch({ type: "UPDATE_USER_ORDERS", payload: data.response });
    navigate("/");
    toast.dark("Congratulations ! Your order has been placed !", {
      position: "top-center",
      autoClose: 3000,
    });
  } catch (error) {
    alert(error.message);
  }
};
