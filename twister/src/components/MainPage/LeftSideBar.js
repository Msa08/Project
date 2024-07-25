import React from 'react';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import './leftsidebar.css';
import axios from 'axios';

function LeftSideBar() {
    const [queries, setQueries] = useState([]);
    const navigate = useNavigate();

    const handleTrend = (trendquery) => {
        navigate(`/search?category=#&q=${trendquery}`);
    }

    const loadtheme = () =>{
        axios.get("http://localhost:4000/twist/gettopHashtags",{withCredentials:true})
        .then(response=>{
            let tab = []
            for(var i = 0;i<response.data.length;i++){
                tab.push(response.data[i].nom)
            }
            setQueries(tab)
        })
    }

    useEffect(()=>{
        loadtheme();
    },[])

    return (
            <div className="trends-container">
                <h2 className="trends-header">Catégories en tendances</h2>
                <ul className="trends-list">
                    {queries.map((query, index) => (
                        <li key={index} className="trend-item">
                            <a href={`/search?category=Theme&q=${query}`} className="trend-link" onClick={() => handleTrend(query)}>
                                {query}
                            </a>

                        </li>
                    ))}

                </ul>
            </div>
    );
}

export default LeftSideBar;
