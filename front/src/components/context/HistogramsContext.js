import React from 'react'; // Добавьте эту строку
import { createContext, useContext, useState } from "react";

const HistogramsContext = createContext();

export const HistogramsProvider = ({ children }) => {
    const [histograms, setHistograms] = useState([]);
    const [isLoadingHistograms, setIsLoadingHistograms] = useState(false);
    const [documentsData, setDocumentsData] = useState([]);
    const [isLoadingDocuments, setIsLoadingDocuments] = useState(false);

    return (
        <HistogramsContext.Provider value={{ histograms, setHistograms,
            isLoadingHistograms, setIsLoadingHistograms,
            documentsData, setDocumentsData,
            isLoadingDocuments, setIsLoadingDocuments,}}>
            {children}
        </HistogramsContext.Provider>
    );
};

export const useHistograms = () => useContext(HistogramsContext);