import { useContext,useEffect} from "react";
import Postcontext from "../post.context.jsx";
import { getFeedPosts,createPost,likePost,unLikePost } from "../services/post.api.js";

export const usePost = () => {
    const context = useContext(Postcontext);
    if (!context) {
        throw new Error("usePost must be used within PostProvider");
    }
    const {feed,loading,post,setFeed,setLoading,setPost} = context

    const handleGetFeedPosts = async () => {
        setLoading(true)
        const data = await getFeedPosts()
        setFeed(data.posts.reverse())
        setLoading(false)

    } 
    const handleCreatePost = async (post) => {
        setLoading(true)
        const data = await createPost(post)
        setFeed([...feed,data.post])
        setLoading(false)
    }
    const handleLikePost = async (postId) => {
        const data = await likePost(postId)
        handleGetFeedPosts()
    } 
    const handleUnLikePost = async (postId) => {
        const data = await unLikePost(postId)
        handleGetFeedPosts()
    } 
    useEffect(() => {
        handleGetFeedPosts()
    }, [])
    return {handleGetFeedPosts,feed,loading,post,setFeed,setLoading,setPost,handleCreatePost,handleLikePost,handleUnLikePost};
};