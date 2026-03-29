import React from 'react'
import {useState,useRef} from 'react'
import '../style/createpost.scss'
import { usePost } from '../hook/usePost'
import { useNavigate } from 'react-router'
const CreatePost = () => {
    const [caption,setCaption] = useState("")
    const fileRef = useRef(null)
    const {handleCreatePost,loading} = usePost()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const post = {
            image: fileRef.current.files[0],
            caption: caption
        }
        handleCreatePost(post)
        navigate("/")
    }
    if(loading){
        return <div>Creating Post...</div>
    }
  return (
    <main className="create-post">
        <h1>Create Post</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="postImage">Post Image</label>
            <input hidden type="file" name="postImage" id="postImage" ref={fileRef} />
            <input type="text" name="caption" id="caption" placeholder='Caption' value={caption} onChange={(e) => setCaption(e.target.value)} />
            <button type='submit' className='button primary-button'>Create Post</button>
        </form>
    </main>
  )
}

export default CreatePost