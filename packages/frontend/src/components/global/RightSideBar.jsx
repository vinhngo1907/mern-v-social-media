import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import Avatar from '../other/Avatar';
import {getDataAPI} from '../../utils/apis/FetchData';
import UserCard from '../other/UserCard';

const RightSideBar = () => {
  const {
    auth,
    statistic,
    // notify, statistic, message
  } = useSelector(state => state);
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [searchUsers, setSearchUsers] = useState([]);
  const [loadSearch, setLoadSearch] = useState(false);

  useEffect(() => {
    if (auth.user.following) {
      setUsers(auth.user.following);
    }
  }, [auth.user.following]);

  const handleClose = () => {
    setSearch('');
    setSearchUsers([]);
    setUsers(auth.user.following);
  };

  const handleSearch = async e => {
    e.preventDefault();
    if (!search) return setSearchUsers([]);
    try {
      setLoadSearch(true);
      const res = await getDataAPI(`users/search?name=${search}`);
      setSearchUsers(res.data.results);
      setLoadSearch(false);
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {error: error?.response?.data?.message || error},
      });
    }
  };

  const handleUserClick = user => {
    setSelectdUser(user);
  };

  return (
    <div className="sidebar static">
      <div className="widget mt-3">
        <h4 className="widget-title">Your page</h4>
        <div className="your-page">
          <figure>
            <Link to={`/profile/${auth.user._id}`} title="">
              <Avatar size="big-avatar" src={auth.user.avatar} />
            </Link>
          </figure>
          <div className="page-meta">
            <Link to={`/profile/${auth.user._id}`} title="">
              <h6>{auth.user.username}</h6>
            </Link>
            <span>{auth.user.followers.length} followers</span>
          </div>
        </div>
      </div>
      <div className="widget mt-3">
        <h4 className="widget-title">Who's Following</h4>
        <div className="searchDir">
          <form className="search_form" onSubmit={handleSearch}>
            <input
              className="filterinput"
              type="text"
              placeholder="Search Contacts..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <div className="search_icon" style={{opacity: search ? 0 : 0.3}}>
              {/* <span className="material-icons">search</span> */}
              {/* <span>Enter to Search</span> */}
            </div>
            {loadSearch ? (
              <div
                className="spinner-border position-absolute mt-2"
                style={{width: '20px', height: '20px', right: '15px'}}
                role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <div
                className="close_search"
                onClick={handleClose}
                style={{opacity: searchUsers.length === 0 ? 0 : 1}}>
                <i className="fas fa-times-circle" />
              </div>
            )}

            <button type="submit" style={{display: 'none'}}>
              Search
            </button>
          </form>
        </div>
        {
          <ul className="overlay-scrollbar scrollbar-hover px-3 my-2">
            {auth.user.loading ? (
              <div
                className="spinner-border d-block mx-auto my-2"
                role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <div className="following">
                {loadSearch ? (
                  <div
                    className="spinner-border d-block mx-auto my-2"
                    role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : searchUsers.length >= 1 ? (
                  searchUsers.map((user, index) => (
                    <UserCard
                      key={user ? user._id : index}
                      user={user}
                      type="user_card"
                      handleUserClick={handleUserClick}
                    />
                  ))
                ) : (
                  users.map((user, index) => (
                    <UserCard
                      key={user ? user._id : index}
                      user={user}
                      type="user_card"
                      handleUserClick={handleUserClick}
                    />
                  ))
                )}
              </div>
            )}
            {/* {selectedUser && <ChatBox selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>} */}
          </ul>
        }
      </div>
    </div>
  );
};

export default RightSideBar;
