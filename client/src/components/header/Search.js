import React, { useState } from "react";
import UserCard from "../other/UserCard";

const Search = () => {
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleClose = () => {

    }
    return (
        <>
            <form class="search_form">
                <input type="text" id="search" name="Search" className="navbar-search-input" title="What you searching for..."
                    onChange={(e) => setSearch(e.target.value)} value={search}
                />
                <div className="search_icon" style={{ opacity: search ? 0 : 0.3 }}>
                    <span>Enter to Search</span>
                    <i class="fas fa-search" />

                </div>
                <div className="close_search" onClick={handleClose} style={{ opacity: users.length === 0 ? 0 : 1 }}>
                    &times;
                </div>
                <button type="submit" style={{ display: 'none' }}>Search</button>
                <div className="users">
                    {
                        search && users.map((u, i) => (
                            <UserCard key={u._id || i} />
                        ))
                    }
                </div>
            </form>
        </>
    )
}

export default Search;