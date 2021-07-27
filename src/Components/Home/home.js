import { Link } from "react-router-dom";
import "./home.css";
import ImageSlider from "../Slider/ImageSlider";
import { StackData } from "stack-utils";
import { SliderData } from "../Slider/SliderData";

export function Home() {
  return (
    <div className="home-main-div">
      {/* <Link to="/products" className="Link"> */}
      <ImageSlider slides={SliderData} />
      {/* </Link> */}
    </div>
  );
}
