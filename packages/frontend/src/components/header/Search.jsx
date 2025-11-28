import { useState } from 'react';
import { getDataAPI } from '../../utils/apis/FetchData';

const Search = () => {
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useStae(false);
    const [users, setUsers] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (search) {
            getDataAPI(`user?name=${search}`)
                .then(res => {
                    setUsers(res.data.results);
                }).catch(err => console.log(err.response.data.message));
        }
        setLoading(false);
    }
    return (
        <>
            <form
                className='search_form'
                onSubmit={handleSearch}
            >
                <input type="text"
                    id="search"
                    name="Search"
                    className="navbar-search-input"
                    title="What you searching for..."
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div className="search_icon" >
                    <span>Enter to Search</span>
                    <i className="fas fa-search" />
                </div>
                {
                    loading
                        ? <div className="spinner-border text-dark position-absolute mt-2"
                            style={{ width: '30px', height: "30px", right: "15px" }}
                            role="status">
                            :<span className="sr-only">Loading...</span>
                        </div>
                        : <div className="close_search" >&times;</div>
                }
                <button type="submit" style={{ display: 'none' }}>Search</button>
                <div className='users'>
                    {
                        users ?
                            users.map((u, i) => (
                                <div key={u._id || i}>
                                    <p>{u.name}</p>
                                </div>
                            ))
                            : null
                    }
                </div>
            </form>
        </>
    )
}

export default Search;