import React, { useState } from "react";
import searchIcon from "../assets/search.svg";

const Search = ( { onSend }) => {
    const [searchInput, setSearchInput] = useState("")

    return (
        <div className="search-box">
            
            <input 
                type="text"
                placeholder="type something here..."
                value={searchInput}
                onChange={(e)=>setSearchInput(e.target.value)}
                onKeyDown={(e)=> {
                    if (e.key === 'Enter') {
                        onSend(searchInput);
                    }
                }}
                className="input-box"
            />
            <button className="search-button" onClick={()=>onSend(searchInput)}><img src={searchIcon} /></button>
          
        </div>
    )
}

export default Search