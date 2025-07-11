import React from 'react'
import UserCard from '../../components/other/UserCard'
import FollowBtn from '../../components/other/FollowBtn'
import { useSelector } from 'react-redux'

const Followers = ({ users, setShowFollowers }) => {
    const { auth } = useSelector(state => state)
    return (
        <div className="follow">
            <div className="follow_box">
                <div className='follow_box_header'>
                    <span>Followers</span>
                </div>
                <hr />

                <div className="follow_content overlay-scrollbar scrollbar-hover">
                    {
                        users.map(user => (
                            <UserCard key={user._id} user={user} setShowFollowers={setShowFollowers} >
                                {
                                    auth.user._id !== user._id && <FollowBtn user={user} />
                                }
                            </UserCard>
                        ))
                    }
                </div>


                <div className="close" onClick={() => setShowFollowers(false)}>
                    {/* &times; */}
                    <i className='fas fa-times-circle' />
                </div>

            </div>
        </div>
    )
}

export default Followers
