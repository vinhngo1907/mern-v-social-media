import React, { useState } from "react";
import UserCard from "../other/UserCard";
import { getDataApi } from "../../utils/fetchData";
import { useSelector } from "react-redux";

const Search = () => {
    const { auth } = useSelector(state => state);
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        if (search) {
            getDataApi(`user?name=${search}`, auth.token).then(res => {
                console.log(res)
                setUsers(res.data.results)
            }).catch(error => console.log(error.response.data.message))
        }
        setLoading(false)
    }

    const handleClose = () => {
        setUsers([]);
        setSearch('');
    }
    return (
        <>
            <form className="search_form" onSubmit={handleSubmit}>
                <input type="text" id="search" name="Search" className="navbar-search-input" title="What you searching for..."
                    onChange={(e) => setSearch(e.target.value)} value={search}
                />
                <div className="search_icon" style={{ opacity: search ? 0 : 0.3 }}>
                    <span>Enter to Search</span>
                    <i className="fas fa-search" />

                </div>

                {
                    loading
                        ?
                        <div className="spinner-border text-dark position-absolute mt-2"
                            style={{ width: '30px', height: "30px", right: "15px" }}
                            role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        :
                        <div className="close_search" onClick={handleClose} style={{ opacity: users.length === 0 ? 0 : 1 }}>
                            &times;
                        </div>
                }
                <button type="submit" style={{ display: 'none' }}>Search</button>
                <div className="users">
                    {
                        search && users.map((u, i) => (
                            <UserCard key={u._id || i} user={u} type="home"/>
                        ))
                    }
                </div>
            </form>
        </>
    )
}

export default Search;