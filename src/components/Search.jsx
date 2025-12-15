import React, { useState } from "react";
import searchIcon from "../assets/search.svg";

const Search = () => {
    const [searchInput, setSearchInput] = useState("")

    return (
        <div className="search-box">
            
            <input 
                type="text"
                placeholder="type something here..."
                value={searchInput}
                onChange={(e)=>setSearchInput(e.target.value)}
                className="input-box"
                autoFocus
            />
            <button type="submit" className="search-button"><img src={searchIcon} /></button>
          
        </div>
    )
}

export default Search