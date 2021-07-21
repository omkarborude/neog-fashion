import { Link } from "react-router-dom";
import "./home.css";

export function Home() {
  return (
    <div className="home-main-div">
      <Link to="/products" className="Link">
        <div className="home-main-omg-div">
          <img src="https://www.linkpicture.com/q/Neog-Fashion.jpg" />
        </div>
      </Link>
      <div className="home-categaory-div"></div>
    </div>
  );
}
