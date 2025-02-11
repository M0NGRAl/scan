import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header.js";
import Main from "./main/Main.js"
import Footer from "./Footer.js";
import '../styles/App.css'
import Authorization from "./authorization/Authorization.js";
import Search from "./search/Search.js";


const App = () => {
    const [activeComponent, setActiveComponent] = useState("main");

    const showMain = () => setActiveComponent("main");
    const showAuthorization = () => setActiveComponent("authorization");
    const showSearch = () => setActiveComponent("search");
    return (
        <div className="App">
            <Header
                onShowMain={showMain}
                onShowAuthorization={showAuthorization}
            />
            {activeComponent === "main" && <Main onShowSearch={showSearch} />}
            {activeComponent === "authorization" && <Authorization />}
            {activeComponent === "search" && <Search />}
            <Footer/>
        </div>
    );
};

export default App;