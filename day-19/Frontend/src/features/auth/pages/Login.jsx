import React from 'react'
import "../style/form.scss"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
const Login = () => {
const [username, setUsername] = useState("")
const [password, setPassword] = useState("")
const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", {
        username,
        password,
      })
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    
    <main>
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder='Username' onInput={(e) => setUsername(e.target.value)}/>
                <input type="password" name="password" placeholder='Password' onInput={(e) => setPassword(e.target.value)}/>
                <button type='submit'>Login</button>
            </form>
            <p>Don't have an account? <Link className='link' to="/register">Register</Link></p>
        </div>
    </main>
  )
}

export default Login