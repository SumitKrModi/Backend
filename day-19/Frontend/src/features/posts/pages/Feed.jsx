import React from 'react'
import '../style/feed.scss'
import Post from '../components/Post'
import { usePost } from '../hook/usePost'
import { useEffect } from 'react'
import Nav from '../../shared/components/Nav'
import Footer from '../../shared/components/Footer'

const Feed = () => {
  const {handleGetFeedPosts,feed,loading,handleLikePost,handleUnLikePost} = usePost()
  useEffect(() => {
    handleGetFeedPosts()
  }, [])
  if(loading || !feed){
    return <div>Loading...</div>
  }
  return (
    <main className='feed-pages'>
      <Nav />
        <div className="feed">
            <div className="posts">
              {feed.map(post=>{
                if (!post) return null;
                return (
                  <Post key={post._id} user={post.user} post={post} handleLikePost={handleLikePost} handleUnLikePost={handleUnLikePost}/>
                )
              })}
            </div>
        </div>
        <Footer />
    </main>
  )
}

export default Feed