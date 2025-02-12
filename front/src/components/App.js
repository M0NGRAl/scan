import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header.js";
import Main from "./main/Main.js";
import Footer from "./Footer.js";
import "../styles/App.css";
import Authorization from "./authorization/Authorization.js";
import Search from "./search/Search.js";
import {AuthProvider} from "./context/AuthContext.js";

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Header />
                    <Routes>
                        <Route path="/" element={<Main />} /> {/* Главная страница */}
                        <Route path="/authorization" element={<Authorization />} /> {/* Страница авторизации */}
                        <Route path="/search" element={<Search />} /> {/* Страница поиска */}
                    </Routes>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;