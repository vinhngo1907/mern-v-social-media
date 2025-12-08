import {useDispatch, useSelector} from 'react-redux';
import Avatar from '../other/Avatar';
import {GLOBALTYPES} from '../../redux/globalTypes';

const Status = () => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  return (
    <div className="staus my-3 d-flex">
      <Avatar src={auth?.user?.avatar} size="big-avatar" />
      <button
        className="statusBtn flex-fill"
        onClick={() => dispatch({type: GLOBALTYPES.STATUS, payload: true})}>
        {auth?.user?.username}, what are you thinking?
      </button>
    </div>
  );
};

export default Status;
