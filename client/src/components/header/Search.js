import React, { useState } from "react";
import UserCard from "../other/UserCard";
import { getDataApi } from "../../utils/fetchData";
import { useDispatch, useSelector } from "react-redux";

const Search = () => {
    const {auth} = useSelector(state=>state);
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    // const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (search) {
            getDataApi(`user?name=${search}`,auth.token).then(res => {
                console.log(res)
                setUsers(res.data.results)
            }).catch(error => console.log(error.response.data.message))
        }
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
                <div className="close_search" onClick={handleClose} style={{ opacity: users.length === 0 ? 0 : 1 }}>
                    &times;
                </div>
                <button type="submit" style={{ display: 'none' }}>Search</button>
                <div className="users">
                    {
                        search && users.map((u, i) => (
                            <UserCard key={u._id || i} user={u}/>
                        ))
                    }
                </div>
            </form>
        </>
    )
}

export default Search;