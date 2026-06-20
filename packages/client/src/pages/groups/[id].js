import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGroup } from '../../redux/actions/groupAction';
// import Avatar from '../../components/other/Avatar';
import GroupCard from '../../components/other/GroupCard';

const GroupDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const [group, setGroup] = useState([]);

    // const { auth: { user, token }, groups: { group, loading } } = useSelector(state => state);
    // const { auth: { user, token }, groups: { loading }, groupDetail: { group } } = useSelector(state => state);
    const { auth: { token }, theme, groupDetail } = useSelector(state => state);

    useEffect(() => {
        dispatch(getGroup({ groupDetail, id, token }))
        if (groupDetail.length > 0) {
            const groupArr = groupDetail.filter(g => g._id === id);
            setGroup(groupArr)
        }
    }, [id, dispatch, token, groupDetail])

    // if (loading) {
    //     return (<div className='d-block PY-5 mx-auto text-dark spinner-border' role='status'>
    //         <span className="sr-only">Loading...</span>
    //     </div>)
    // }

    if (!group || !token) {
        return <div className="text-center py-5">Group not found</div>;
    }

    return (
        <div>
            {
                groupDetail.loading && <div className="mx-auto d-block spinner-border text-dark my-4">
                    <span className="sr-only">Loading...</span>
                </div>
            }
            {
                group.map(g => (
                    <GroupCard key={g._id}
                        group={g}
                        theme={theme}
                        id={id}
                    />
                ))
            }

        </div>
    );
};

export default GroupDetail;