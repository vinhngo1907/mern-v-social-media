import React from 'react'
import UserCard from '../../components/other/UserCard'
import FollowBtn from '../../components/other/FollowBtn'
import { useSelector } from 'react-redux'

const Following = ({ users, setShowFollowing }) => {
    const { auth } = useSelector(state => state)
    return (
        <div className="follow">
            <div className="follow_box">
                <div className='follow_box_header'>
                    <span className="text-center">Following</span>
                </div>
                <hr />

                <div className="follow_content overlay-scrollbar scrollbar-hover">
                    {
                        users.map(user => (
                            <UserCard key={user._id} user={user} setShowFollowing={setShowFollowing} >
                                {
                                    auth.user._id !== user._id && <FollowBtn user={user} />
                                }
                            </UserCard>
                        ))
                    }
                </div>

                <div className="close" onClick={() => setShowFollowing(false)}>
                    {/* &times; */}
                    <i className='fas fa-times-circle' />
                </div>

            </div>
        </div >
    )
}

export default Following;