import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { getDataApi } from "../../utils/fetchData";
import { MESSAGE_TYPES, getConversations } from "../../redux/actions/messageAction";
import { useHistory, useParams } from "react-router-dom";
import UserCard from "../other/UserCard";

const LeftSide = () => {
    const { auth, message } = useSelector(state => state);
    const [search, setSearch] = useState('');
    const [searchLoad, setSearchLoad] = useState(false);
    const [searchUsers, setSearchUsers] = useState([]);
    const { id } = useParams();
    const history = useHistory();

    const dispatch = useDispatch();

    const handleClose = () => {
        setSearch('');
        setSearchUsers([]);
    }
    const handleAddUser = (user) => {
        setSearch('');
        setSearchUsers([]);
        dispatch({ type: MESSAGE_TYPES.ADD_USER, payload: { ...user, media: [], text: '' } });
        return history.push(`/message/${user._id}`)
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!search) {
            setSearch('');
            setSearchUsers([])
            return;
        }

        try {
            setSearchLoad(true);
            const res = await getDataApi(`user/search?name=${search}`, auth.token);
            setSearchLoad(false);
            setSearchUsers(res.data.results);
        } catch (error) {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error?.response?.data?.message } });
        }
    }

    useEffect(() => {
        if (message.firstLoad) return;
        dispatch(getConversations({ auth }))
    }, [dispatch, message.firstLoad, auth])

    const isActive = (user) => {
        return (id === user._id) ? 'active' : '';
    }

    return (
        <>
            <form className="message_header p-2" onSubmit={handleSearch} >
                <input type="text" value={search}
                    placeholder="Enter to Search..."
                    onChange={e => setSearch(e.target.value)} />

                <button type="submit" style={{ display: 'none' }}>Search</button>
                {
                    searchLoad
                        ? <div className="spinner-border text- position-absolute mt-2"
                            style={{ width: '20px', height: "20px", right: "15px" }}
                            role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        : <div className="close_search" onClick={handleClose}
                            style={{ opacity: searchUsers.length === 0 ? 0 : 1 }}
                        >
                            <i className='fas fa-times-circle' />
                        </div>
                }
            </form>
            <div className="message_chat_list">
                {
                    searchUsers.length !== 0
                        ? <>
                            {
                                searchUsers.map(user => (
                                    <div key={user._id} className={`message_user ${isActive(user)}`}
                                        onClick={() => handleAddUser(user)}>
                                        <UserCard user={user} />
                                    </div>
                                ))
                            }

                        </>
                        :
                        message?.users.map(user => (
                            <div key={user._id} className={`message_user ${isActive(user)}`}
                                onClick={() => handleAddUser(user)}>
                                <UserCard user={user} msg={true}>
                                    {
                                        user.online
                                            ? <i className="fas fa-circle text-success" />
                                            : auth.user.following.find(item =>
                                                item._id === user._id
                                            ) && <i className="fas fa-circle" />

                                    }

                                </UserCard>
                            </div>
                        ))
                }
            </div>
        </>
    )
}

export default LeftSide