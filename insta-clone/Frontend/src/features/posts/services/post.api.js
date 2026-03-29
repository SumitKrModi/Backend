import axios from "axios";
const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
});

export const getFeedPosts = async () => {
    const response = await api.get("/api/posts/feed");
    return response.data;
};

export const createPost = async (post) => {
    const formData = new FormData();
    formData.append("image", post.image);
    formData.append("caption", post.caption);
    const response = await api.post("/api/posts", formData);
    return response.data;
};
export const likePost = async (postId) => {
    const response = await api.post(`/api/posts/like/${postId}`);
    return response.data;
};
export const unLikePost = async (postId) => {
    const response = await api.post(`/api/posts/unlike/${postId}`);
    return response.data;
};