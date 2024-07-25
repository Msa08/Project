import React from 'react';
import './barsearch.css'


function BarSearch(props) {
    return (
        <div className="search-bar-freinds">
            <input type="text" placeholder="Rechercher une discussion" className="search-input-freinds" onChange={(event)=>props.function(event.target.value)}/>
        </div>
    )
}

export default BarSearch;