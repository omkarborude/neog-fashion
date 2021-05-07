import { Link } from "react-router-dom";
import "./home.css"

export function Home() {


    return (
    <div className="home-main-div"> 
        <div>
            <h1>Home Page </h1>
            <span>Working On it !</span>
        </div>
            <Link end to="/products" className="Link" >
            <button className="btn-home-shop-now">
                Shop Now !
            </button>
            </Link>

            <div className="pro-bottm-div">
                @Omkar.<span>Pro</span> Codes
            </div>
    </div>
    )
}