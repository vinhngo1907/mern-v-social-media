import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Avatar from "../other/Avatar";
import { getDataAPI } from "../../utils/apis/FetchData";

const RightSideBar = () => {
    const { auth,
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
    }

    const handleSearch = async(e) => {
        e.preventDefault();
        if(!search) return setSearchUsers([]);
        try{
            setLoadSearch(true);
            const res = await getDataAPI(`users/search?name=${search}`);
            setSearchUsers(res.data.results);
            setLoadSearch(false);
        }catch(error){
            dispatch({type: GLOBALTYPES.ALERT, payload: {error: error?.response?.data?.message || error}});
        }
    }
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
            </div>
        </div>

    )
}

export default RightSideBar;