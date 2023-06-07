import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { getDataApi } from "../../utils/fetchData";
import { MESSAGE_TYPES } from "../../redux/actions/messageAction";
import { useHistory, useParams } from "react-router-dom";
import UserCard from "../other/UserCard";

const LeftSide = () => {
    const { auth, message } = useSelector(state => state);
    const [search, setSearch] = useState('');
    const [searchLoad, setSearchLoad] = useState(false);
    const [searchUsers, setSearchUsers] = useState([]);
    const {id} = useParams();
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

    const isActive = (user) => {
        return (id === user._id) ? 'active' : '';
    }

    return (
        <>
            <form className="message_header" onSubmit={handleSearch} >
                <input type="text" value={search}
                    placeholder="Enter to Search..."
                    onChange={e => setSearch(e.target.value)} />

                <button type="submit" style={{ display: 'none' }}>Search</button>
                <i className="fas fa-time-circle"/>
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