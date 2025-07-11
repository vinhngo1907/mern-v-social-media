import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DISCOVER_TYPES, getDiscoverPosts } from '../redux/actions/discoverAction';
import { GLOBALTYPES } from '../redux/actions/globalTypes';
import { getDataApi } from '../utils/fetchData';
import PostThumb from "../components/other/PostThumb";
import LoadMoreBtn from '../components/other/LoadMoreBtn';
import LeftSideBar from '../components/global/LeftSideBar';

const Discover = () => {
	const { auth, discover } = useSelector(state => state);
	const dispatch = useDispatch();
	const [load, setLoad] = useState(false);

	useEffect(() => {
		if (!discover.firstLoad) {
			dispatch(getDiscoverPosts(auth.token));
		}
	}, [dispatch, auth.token, discover.firstLoad]);

	const handleLoadMore = async () => {
		try {
			setLoad(true);
			const res = await getDataApi(`post/dicover?num=${discover.page}*9`, auth.token);
			dispatch({ type: DISCOVER_TYPES.UPDATE_POST, payload: res.data.results })
			setLoad(false);
		} catch (err) {
			dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message || err } })
		}
	}
	return (
		<div className='home row mx-0'>
			<div className="left_sidebar col-md-3">
                <LeftSideBar />
            </div>
			<div className="main_sidebar py-1 col-md-6">
				{
					discover.loading ? <div className='d-block mx-auto text-dark spinner-border' role='status'>
						<span className="sr-only">Loading...</span>
					</div>
						:
						<PostThumb posts={discover.posts} result={discover.result} />
				}
				{
					load && <div className="spinner-border d-block mx-auto text-primary" role="status">
						<span className="sr-only">Loading...</span>
					</div>
				}
				{
					!discover.loading
					&& <LoadMoreBtn load={load} page={discover.page} result={discover.result} handleLoadMore={handleLoadMore} />
				}
			</div>
		</div>
	)
}

export default Discover
