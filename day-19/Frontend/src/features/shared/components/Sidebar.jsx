import React, { useEffect } from 'react'
import '../sidebar.scss'
import { useProfile } from '../../profile/profile.context.jsx'
import useAuth from '../../auth/hooks/useAuth.js'

const Sidebar = ({ isOpen }) => {
    const { user } = useAuth();
    const { 
        followers, 
        following, 
        otherUsers, 
        handleGetFollowers, 
        handleGetFollowing, 
        handleGetAllUsers,
        handleFollow,
        handleUnfollow,
        handleRemoveFollower 
    } = useProfile();

    useEffect(() => {
        handleGetFollowers();
        handleGetFollowing();
        handleGetAllUsers();
    }, []);

    const renderUser = (user, index, isFirstSection = false, actionType) => (
        <div key={user._id} className={`user-item ${actionType === 'remove' && index === 0 ? 'active' : ''}`}>
            {user.profileImage ? (
                <img src={user.profileImage} alt="avatar" className="user-avatar" />
            ) : (
                <div className="avatar-placeholder"></div>
            )}
            <div style={{ flex: 1 }}>
                <p>{user.username}</p>
            </div>
            
            {actionType === 'remove' && (
                <button className="action-btn remove" onClick={() => handleRemoveFollower(user.username)}>Remove</button>
            )}
            {actionType === 'unfollow' && (
                <button className="action-btn unfollow" onClick={() => handleUnfollow(user.username)}>Unfollow</button>
            )}
            {actionType === 'follow' && (
                <button className="action-btn follow" onClick={() => handleFollow(user.username)}>Follow</button>
            )}
        </div>
    );

    // Filter out users that are already in the 'following' list just to be absolutely certain the UI is instant
    const discoverUsers = otherUsers.filter(
        user => !following.some(followedUser => followedUser.username === user.username)
    );

    return (
        <div className={`sidebar-container ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
                {user?.profileImage ? (
                    <img src={user.profileImage} alt="profile" style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} />
                ) : (
                    <div className="logo-icon" style={{ borderRadius: '50%' }}></div>
                )}
                <h2>{user?.username || "Loading..."}</h2>
            </div>

            <div className="sidebar-section">
                <h3>Followers</h3>
                {followers.length > 0 ? (
                    followers.map((user, idx) => renderUser(user, idx, true, 'remove'))
                ) : (
                    <div className="user-item">
                        <div className="avatar-placeholder" style={{ opacity: 0.5 }}></div>
                        <p style={{ color: '#949ba4' }}>No followers yet...</p>
                    </div>
                )}
            </div>

            <div className="sidebar-section">
                <h3>Following</h3>
                {following.length > 0 ? (
                    following.map((user, idx) => renderUser(user, idx, followers.length === 0, 'unfollow'))
                ) : (
                    <div className="user-item">
                        <div className="avatar-placeholder" style={{ opacity: 0.5 }}></div>
                        <p style={{ color: '#949ba4' }}>Not following anyone...</p>
                    </div>
                )}
            </div>

            <div className="sidebar-section">
                <h3>Discover Users</h3>
                {discoverUsers.length > 0 ? (
                    discoverUsers.map((user, idx) => renderUser(user, idx, followers.length === 0 && following.length === 0, 'follow'))
                ) : (
                    <div className="user-item">
                        <div className="avatar-placeholder"></div>
                        <p>No new users...</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Sidebar;
