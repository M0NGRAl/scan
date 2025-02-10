import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header.js";
import Main from "./main/Main.js"
import Footer from "./Footer.js";
import '../styles/App.css'
import Search from './search/Search.js'


const App = () => {
    return (
        <div className="App">
            <Header />
            <Search/>
            <Footer/>
        </div>
    );
};

export default App;