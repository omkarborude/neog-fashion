import {Filter} from "./Filterview"
import "./filter.css";
import { useState } from "react";
export const FilterMobile = () => {
    const [mobilefilter, setmobilefilter] = useState(false);

    function openfilter () {
        setmobilefilter(true)
    }
    function closefilter () {
        setmobilefilter(false)
    }
    return (
        <>
        <div className='Filter-mobile'>
        <h3>Filters</h3>
        <button className='btn-open' onClick={openfilter}>
          &#9776;
        </button>
      </div>
      <div className={mobilefilter ? "filtermobile showfilter" : "filtermobile hidefilter "}>
        <div className='filter-heading'>
          <h1>Apply Filters</h1>
          <button className='btn-close' onClick={closefilter}>
            &times;
          </button>
        </div>
        <Filter />
      </div>
      <div className='Filter-desktop'>
        <Filter />
      </div>
        </>
    )
}