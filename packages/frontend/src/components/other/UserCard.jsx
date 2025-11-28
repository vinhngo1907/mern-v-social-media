const UserCard = ({ children, user }) => {
    const { theme } = useSelector(state => state);
    
    return (
        <div className="user-card">
            <div className={`user-card_header bg-${theme}`}>
                <img src={user?.avatar} alt="avatar" className="user-card_avatar" />
                <div className="user-card_info">
                    <h3 className="user-card_name">{user?.name}</h3>
                    <small className="user-card_email">{user?.email}</small>
                </div>
            </div>
            <div className="user-card_children">
                {children}

            </div>
        </div>
    )
}

export default UserCard;