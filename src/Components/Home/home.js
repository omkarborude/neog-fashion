import { useEffect } from "react";
import {
  getApiProduct,
  LoadAllProducts,
  LoadUserAddresses,
  LoadUserCartWishList,
  LoadUserOrder,
} from "../../ApiCalls/api-calls";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext/AuthProvider";
import { useStateProvider } from "../../Context/MainContext/StateProvider";
import "./home.css";

export function Home() {
  const { isUserloggedIn, userId } = useAuth();
  const { dispatch, state } = useStateProvider();

  // Load product from server
  useEffect(() => {
    LoadAllProducts(dispatch);
  }, []);

  // load user Cart/Wishlist from server
  useEffect(() => {
    if (isUserloggedIn) {
      LoadUserCartWishList(dispatch, userId);
      LoadUserOrder(dispatch, userId);
      LoadUserAddresses(dispatch, userId);
    }
  }, [isUserloggedIn]);

  return (
    <div className="home-main-div">
      <section className="section-c">
        <div className="row">
          <div className="col50">
            <div className="home-logo-tag">
              <img
                className="home-logo-img"
                src="https://www.linkpicture.com/q/Colourful-Fashion-Store-Logo_4.jpg"
              />
            </div>
            <h1>When you care enough to send the best</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis
              harum deserunt dolor obcaecati asperiores magnam molestias
              perferendis laborum tenetur quisquam quas, numquam voluptatum qui
              illum explicabo illo delectus. Quis, at?
            </p>
            <Link to="/products" className="Link">
              <button className="home-buy-btn">Buy Now</button>
            </Link>
          </div>

          <div className="col50">
            <div className="img-box">
              <Link to="/products" className="Link">
                <img
                  src="https://www.linkpicture.com/q/Model9.69439559.jpg"
                  alt="Model"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
