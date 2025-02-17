import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header.js";
import Main from "./main/Main.js";
import Footer from "./Footer.js";
import "../styles/App.css";
import Authorization from "./authorization/Authorization.js";
import Search from "./search/Search.js";
import Search_result from "./search_result/Search_result.js";
import {AuthProvider} from "./context/AuthContext.js";
import {HistogramsProvider} from "./context/HistogramsContext.js";

const App = () => {
    return (

            <AuthProvider>
                <Router>
                    <HistogramsProvider>
                        <div className="App">
                            <Header />
                            <Routes>
                                <Route path="/" element={<Main />} /> {/* Главная страница */}
                                <Route path="/authorization" element={<Authorization />} /> {/* Страница авторизации */}
                                <Route path="/search" element={<Search />} /> {/* Страница поиска */}
                                <Route path='/search-result' element={<Search_result />} />
                            </Routes>
                            <Footer />
                        </div>
                    </HistogramsProvider>
                </Router>
            </AuthProvider>


    );
};

export default App;