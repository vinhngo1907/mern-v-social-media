import { useSelector } from 'react-redux';
import LeftSideBar from './global/LeftSideBar';
import Status from './home/Status';
import RightSideBar from './global/RightSideBar';

const Home = () => {
  const { sidebar } = useSelector(state => state);
  return (
    <div className={`home row mx-0 ${sidebar ? 'sidebar-expand' : ''}`}>
      <div className="left_sidebar col-md-3">
        <LeftSideBar />
      </div>
      <div className="main_sidebar col-md-6">
        <Status />
      </div>
      <div className="right_sidebar col-md-3">
        <RightSideBar />
      </div>
    </div>
  );
};

export default Home;
