import React, { useState } from "react";
import searchIcon from "../assets/search.svg";

const Search = ( { onSend, searchQuery, setSearchQuery }) => {
    //const [searchInput, setSearchInput] = useState("")

    return (
        <div className="search-box">
            
            <input 
                type="text"
                placeholder="type something here..."
                value={searchQuery}
                onChange={(e)=>setSearchQuery(e.target.value)}
                onKeyDown={(e)=> {
                    if (e.key === 'Enter') {
                        onSend(searchQuery);
                    }
                }}
                className="input-box"
            />
            <button aria-label="search-button" className="search-button" onClick={()=>onSend(searchQuery)}><img src={searchIcon} alt="search icon" /></button>
          
        </div>
    )
}

export default Search