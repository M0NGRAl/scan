import React, { createContext, useContext, useState } from "react";
import { validateInn } from './validateInn.js';
import {useNavigate} from 'react-router-dom';
import { useHistograms} from "../context/HistogramsContext.js";


const SearchRequest = () => {
    const [isValidInn, setIsValidInn] = useState(true);
    const [isValidDocuments, setIsValidDocuments] = useState(true);
    const [isDateValid, setIsDateValid] = useState(true);
    const [inn, setInn] = useState("");
    const [tonality, setTonality] = useState("any");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [docCount, setDocCount] = useState("");
    const [maxFullness, setMaxFullness] = useState(false);
    const [inBusinessNews, setInBusinessNews] = useState(null);
    const [onlyMainRole, setOnlyMainRole] = useState(false);
    const [onlyWithRiskFactors, setOnlyWithRiskFactors] = useState(false);
    const [includeTechNews, setIncludeTechNews] = useState(false);
    const [includeAnnouncements, setIncludeAnnouncements] = useState(false);
    const [includeDigests, setIncludeDigests] = useState(false);
    const { setHistograms, setIsLoadingHistograms, setIsLoadingDocuments, setDocumentsData } = useHistograms();
    const navigate = useNavigate();

    const handleInnChange = (e) => {
        setInn(e.target.value);
        setIsValidInn(validateInn(e.target.value));
    };

    const handleTonalityChange = (e) => {
        setTonality(e.target.value);
    };

    const handleDocumentsChange = (e) => {
        const value = e.target.value;
        setDocCount(value);
        setIsValidDocuments(value <= 1000);
    };

    const validateDates = (start, end) => {
        const today = new Date().toISOString().split("T")[0];
        if (start && end) {
                setIsDateValid(start <= end && start <= today && end <= today);
            } else {
                setIsDateValid(true);
        }
    };

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
        validateDates(e.target.value, endDate);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
        validateDates(startDate, e.target.value);
    };


    const handleMaxFullnessChange = (e) => setMaxFullness(e.target.checked);
    const handleInBusinessNewsChange = (e) => setInBusinessNews(e.target.checked);
    const handleOnlyMainRoleChange = (e) => setOnlyMainRole(e.target.checked);
    const handleOnlyWithRiskFactorsChange = (e) => setOnlyWithRiskFactors(e.target.checked);
    const handleIncludeTechNewsChange = (e) => setIncludeTechNews(e.target.checked);
    const handleIncludeAnnouncementsChange = (e) => setIncludeAnnouncements(e.target.checked);
    const handleIncludeDigestsChange = (e) => setIncludeDigests(e.target.checked);

    const isFormValid = () => {
        return (
            isValidInn &&
            isValidDocuments &&
            isDateValid &&
            inn.trim() !== "" &&
            startDate &&
            endDate &&
            docCount.trim() !== ""
        );
    };

    const handleSubmit = async () => {
        if (!isFormValid()) {
            return;
        }

        navigate('/search-result')

        setIsLoadingHistograms(true);
        setIsLoadingDocuments(true);


        const requestBody = {

            "issueDateInterval": {
                "startDate": startDate,
                "endDate": endDate
            },
            "searchContext": {
                "targetSearchEntitiesContext": {
                    "targetSearchEntities": [
                        {
                            "type": "company",
                            "sparkId": null,
                            "entityId": null,
                            "inn": inn,
                            "maxFullness": maxFullness,
                            "inBusinessNews": null
                        }
                    ],
                    "onlyMainRole": onlyMainRole,
                    "tonality": tonality,
                    "onlyWithRiskFactors": onlyWithRiskFactors,
                },
            },
            "attributeFilters": {
                "excludeTechNews": includeTechNews,
                "excludeAnnouncements": includeAnnouncements,
                "excludeDigests": includeDigests
            },
            "similarMode": "duplicates",
            "limit": parseInt(docCount),
            "sortType": "sourceInfluence",
            "sortDirectionType": "desc",
            "intervalType": "month",
            "histogramTypes": [
                "totalDocuments",
                "riskFactors"
            ]
        }

        try {
            const response = await fetch('https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const histogramsData = await response.json();
            setHistograms(histogramsData.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoadingHistograms(false);
        }

        try {
            const response = await fetch('https://gateway.scan-interfax.ru/api/v1/objectsearch', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setDocumentsData(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoadingDocuments(false);
        }
    };



    return {
        inn, startDate, endDate, docCount,
        isValidInn, isValidDocuments, isDateValid,
        maxFullness, inBusinessNews, onlyMainRole, onlyWithRiskFactors,
        includeTechNews, includeAnnouncements, includeDigests, tonality,
        handleInnChange, handleDocumentsChange, handleTonalityChange, handleStartDateChange, handleEndDateChange,
        handleIncludeDigestsChange, handleInBusinessNewsChange, handleIncludeAnnouncementsChange,
        handleIncludeTechNewsChange, handleOnlyMainRoleChange, handleOnlyWithRiskFactorsChange,
        handleMaxFullnessChange, isFormValid, handleSubmit
    };
};
export default SearchRequest;