import React, { useState } from "react";

const Search = () => {
    const [search, setSearch] = useState('');
    return (
        <>
            <form class="search_form">
                <input type="text" id="search" name="Search" className="navbar-search-input" title="What you searching for..."
                    onChange={(e) => setSearch(e.target.value)} value={search}
                />
                <div className="search_icon" style={{ opacity: search ? 0 : 0.3 }}>
                    <span>Enter to Search</span>
                    <i class="fas fa-search"/>

                </div>
                <div className="close_search">

                </div>
                <button type="submit" style={{ display: 'none' }}>Search</button>
            </form>
        </>
    )
}

export default Search;