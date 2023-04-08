import React from "react";
import LeftSideBar from "../components/home/LeftSideBar";
import RightSideBar from "../components/home/RightSideBar";
import Status from "../components/home/Status";
import { useSelector } from "react-redux";

const Home = () => {
	const {sidebar} = useSelector(state=>state);
	return (
		<div className={`home row mx-0 ${sidebar? 'sidebar-expand' : ''}`}>
			<div className="col-md-3 left_sidebar">
				<LeftSideBar />
			</div>
			<div className="main_sidebar col-md-6">
				<Status/>
				Home Page
			</div>
			<div className="right_sidebar col-md-3">
                <RightSideBar />
            </div>
		</div>
	)
}

export default Home
