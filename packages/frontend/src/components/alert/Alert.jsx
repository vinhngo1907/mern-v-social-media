import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loading from './Loading';
import Toast from './Toast';
import { clearAlert } from '../../redux/alertSlice';

const Notify = () => {
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  return (
    <div>
      {alert.loading && <Loading />}

      {alert.error && (
        <Toast
          msg={{ title: 'Error', body: alert.error }}
          handleShow={() => dispatch(clearAlert())}
          bgColor="bg-danger"
        />
      )}

      {alert.success && (
        <Toast
          msg={{ title: 'Success', body: alert.success }}
          handleShow={() => dispatch(clearAlert())}
          bgColor="bg-success"
        />
      )}
    </div>
  );
};

export default Notify;