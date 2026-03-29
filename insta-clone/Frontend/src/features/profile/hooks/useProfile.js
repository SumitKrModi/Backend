import { useContext, useEffect } from "react";
import Profilecontext from "../profile.context.jsx";
import { getFollowers, getFollowing, getAllUsers } from "../services/profile.api.js";

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

    return {
        followers, 
        following, 
        otherUsers, 
        loading, 
        handleGetFollowers, 
        handleGetFollowing, 
        handleGetAllUsers
    };
};
