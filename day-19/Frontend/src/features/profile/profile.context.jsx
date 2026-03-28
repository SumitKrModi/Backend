import { createContext, useState, useContext } from "react"
import { getFollowers, getFollowing, getAllUsers, followUser, unfollowUser, removeFollower } from "./services/profile.api.js"

const Profilecontext = createContext()

export const ProfileProvider = ({children}) => {
    const [followers, setFollowers] = useState([])
    const [following, setFollowing] = useState([])
    const [otherUsers, setOtherUsers] = useState([])
    const [loading, setLoading] = useState(false)

    return (
        <Profilecontext.Provider value={{
            followers, setFollowers,
            following, setFollowing,
            otherUsers, setOtherUsers,
            loading, setLoading
        }}>
            {children}
        </Profilecontext.Provider>
    )
}

export const useProfile = () => {
    const context = useContext(Profilecontext);
    if (!context) {
        throw new Error("useProfile must be used within ProfileProvider");
    }
    const {
        followers, setFollowers,
        following, setFollowing,
        otherUsers, setOtherUsers,
        loading, setLoading
    } = context;

    const handleGetFollowers = async () => {
        setLoading(true);
        try {
            const data = await getFollowers();
            setFollowers(data.followers || []);
        } catch (error) {
            console.error("Error fetching followers:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleGetFollowing = async () => {
        setLoading(true);
        try {
            const data = await getFollowing();
            setFollowing(data.following || []);
        } catch (error) {
            console.error("Error fetching following:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleGetAllUsers = async () => {
        setLoading(true);
        try {
            const data = await getAllUsers();
            setOtherUsers(data.users || []);
        } catch (error) {
            console.error("Error fetching all users:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFollow = async (username) => {
        try {
            await followUser(username);
            handleGetFollowing();
            handleGetAllUsers();
        } catch (error) {
            console.error("Error following user:", error);
        }
    };

    const handleUnfollow = async (username) => {
        try {
            await unfollowUser(username);
            handleGetFollowing();
            handleGetAllUsers();
        } catch (error) {
            console.error("Error unfollowing user:", error);
        }
    };

    const handleRemoveFollower = async (username) => {
        try {
            await removeFollower(username);
            handleGetFollowers();
        } catch (error) {
            console.error("Error removing follower:", error);
        }
    };

    return {
        followers, 
        following, 
        otherUsers, 
        loading, 
        handleGetFollowers, 
        handleGetFollowing, 
        handleGetAllUsers,
        handleFollow,
        handleUnfollow,
        handleRemoveFollower
    };
};

export default Profilecontext
