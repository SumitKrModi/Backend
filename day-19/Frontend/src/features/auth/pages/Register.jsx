import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Register = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:3000/api/auth/register", {
        username,
        password, 
        email 
      },{
        withCredentials:true
      })
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <main>
        <div className="form-container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder='Username' onInput={(e) => setUsername(e.target.value)}/>
                <input type="text" name="email" placeholder='Email' onInput={(e) => setEmail(e.target.value)}/>
                <input type="password" name="password" placeholder='Password' onInput={(e) => setPassword(e.target.value)}/>
                <button type='submit'>Register</button>
            </form>
            <p>Already have an account? <Link className='link' to="/login">Login</Link></p>
        </div>
    </main>
  )
}

export default Register