import React, {useState} from "react";
import Saerch_date from "./main_screen/Search_date.js";
import WhyWe from "./main_screen/Why_we.js";
import main_image from '../../images/why_we.png'
import '../../styles/Main.css'
import OurRates from "./main_screen/Our_rates.js";

const Main = ({onShowSearch}) => {
    return (
        <div className="main">
            <Saerch_date onShowSearch={onShowSearch} />
            <WhyWe/>
            <div className='main-image-section'>
                <img src={main_image} alt='img' className="main-image"/>
            </div>
            <OurRates/>
        </div>
    )
}

export default Main;