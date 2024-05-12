import React, { useState } from 'react';

// ChatItem component represents each user in the list
function ChatItem({ user, onClick }) {
    return (
        <div className="d-flex p-2 align-items-center justify-content-between w-100 undefined">
            <div>
                <a className="d-flex align-items-center" href={`/profile/${user.id}`} onClick={() => onClick(user)}>
                    <img src={user.avatar} className="large-avatar" alt="avatar" style={{ filter: 'invert(0)' }} />
                    <div className="ml-3" style={{ transform: 'translateY(-2px)' }}>
                        <span className="d-block" style={{ color: 'rgb(84, 84, 84)' }}>{user.username}</span>
                        <small style={{ opacity: 0.7 }}>{user.fullName}</small>
                    </div>
                </a>
            </div>
        </div>
    );
}


// function ChatApp() {
//     const [selectedUser, setSelectedUser] = useState(null);

//     // Simulated list of users
//     const userList = [
//         { id: '643aae10ae22f30740644f4d', username: 'mirandacohenfit', fullName: 'Miranda Cohen', avatar: 'https://res.cloudinary.com/v-webdev/image/upload/v1682429553/v-media/jt3rhrmtomzy0gpezxam.jpg' },
//         { id: '6431428160b08d0480bf3440', username: 'vinhngotung', fullName: 'Ngo Trung Vinh', avatar: 'https://res.cloudinary.com/v-webdev/image/upload/v1682431944/v-media/mxwv6vcbmk1n9arsjluf.jpg' },
//     ];

//     // Handle user click event
//     const handleUserClick = (user) => {
//         setSelectedUser(user);
//     };

//     return (
//         <div>
//             <h1>Chat App</h1>
//             <ul className="overlay-scrollbar scrollbar-hover px-3 my-2">
//                 <div className="following">
//                     {userList.map((user) => (
//                         <ChatItem key={user.id} user={user} onClick={handleUserClick} />
//                     ))}
//                 </div>
//             </ul>
//             {selectedUser && <ChatBox selectedUser={selectedUser} />}
//         </div>
//     );
// }

export default ChatItem;