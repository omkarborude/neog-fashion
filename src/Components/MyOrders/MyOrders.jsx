import "./myorders.css";
import { useStateProvider, useAuth } from "../index";
import { useEffect, useState } from "react";
import { API } from "../../API";
import axios from "axios";
const rupee = `\u20B9`;

export const MyOrders = () => {
  const [trigger, settrgger] = useState(false);
  const { state, dispatch } = useStateProvider();
  const { userId, isUserloggedIn } = useAuth();

  return (
    <div className="myorders-main-div">
      <h1>My Order's</h1>

      <div className="myorder-inner-div">
        {state.userOrders.map((userOrderObj) => {
          return userOrderObj.map((orderRef) => {
            return (
              <div className="myorder-order-card-div">
                <div className="myorder-card-products">
                  <h3>Order Products</h3>

                  {orderRef?.products.map((product) => {
                    return (
                      <div className="myorder-card-products-info">
                        <p className="myorder-card-product-name">
                          Name: {product.name}
                        </p>
                        <p className="myorder-card-product-price">
                          Price:
                          <span>
                            {rupee}
                            {product.price}
                          </span>
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="myorder-card-address">
                  <h3>Delivery Address</h3>
                  <div>
                    <div className="myaddress-address-card">
                      <h4 className="myaddress-address-card-name">
                        {orderRef?.deliveryaddress?.name}
                      </h4>
                      <p>{orderRef?.deliveryaddress?.streetAddress}</p>
                      <p>
                        {orderRef?.deliveryaddress?.city}{" "}
                        <span>{orderRef?.deliveryaddress?.zipCode}</span>
                      </p>
                      <p>
                        {orderRef?.deliveryaddress?.stateName} ,{" "}
                        {orderRef?.deliveryaddress?.country}
                      </p>
                      <p>{orderRef?.deliveryaddress?.phoneNumber}</p>
                    </div>
                  </div>
                </div>

                <div className="myorder-card-value"></div>
              </div>
            );
          });
        })}
      </div>
    </div>
  );
};
