import React from "react";
import "../../../styles/Our_rates.css";
import Beginner from "./tarifs/Beginner.js";
import Pro from "./tarifs/Pro.js";
import Business from "./tarifs/Business.js";

const OurRates = () => {
    return (
        <div className="our-rates">
            <h1>Наши тарифы</h1>
            <div className="rates-container">
                <Beginner />
                <Pro />
                <Business />
            </div>
        </div>
    );
};

export default OurRates;