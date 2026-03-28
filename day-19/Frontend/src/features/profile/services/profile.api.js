import axios from "axios";
const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
});

export const getFollowers = async () => {
    const response = await api.get("/api/user/followers");
    return response.data;
};

export const getFollowing = async () => {
    const response = await api.get("/api/user/following");
    return response.data;
};

export const getAllUsers = async () => {
    const response = await api.get("/api/user/all-users");
    return response.data;
};

export const followUser = async (username) => {
    const response = await api.post(`/api/user/follow/${username}`);
    return response.data;
};

export const unfollowUser = async (username) => {
    const response = await api.post(`/api/user/unfollow/${username}`);
    return response.data;
};

export const removeFollower = async (username) => {
    const response = await api.post(`/api/user/remove/${username}`);
    return response.data;
};
