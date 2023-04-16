import React from "react";
import LeftSideBar from "../components/home/LeftSideBar";
import RightSideBar from "../components/home/RightSideBar";
import Status from "../components/home/Status";
import { useSelector } from "react-redux";
import Posts from "../components/home/Posts";

const Home = () => {
	const { homePosts, sidebar } = useSelector(state => state);
	return (
		<div className={`home row mx-0 ${sidebar ? 'sidebar-expand' : ''}`}>
			<div className="left_sidebar col-md-3">
				<LeftSideBar />
			</div>
			<div className="main_sidebar col-md-6">
				<Status />
				
				{
					homePosts.loading
						? <div class="spinner-border text-primary  d-block mx-auto" role="status">
							<span class="sr-only">Loading...</span>
						</div>
						: (homePosts.result === 0 && homePosts.posts.length === 0)
							? <h2 className="text-center">No Post</h2>
							: <Posts />
				}
			</div>
			<div className="right_sidebar col-md-3">
				<RightSideBar />
			</div>
		</div>
	)
}

export default Home
