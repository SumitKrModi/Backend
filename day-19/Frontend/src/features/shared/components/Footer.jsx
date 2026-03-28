import React, { useState } from 'react'
import '../footer.scss'
import Sidebar from './Sidebar'
import useAuth from '../../auth/hooks/useAuth'

const Footer = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuth();

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  }

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} />
      <footer className='footer'>
         <div className="user" onClick={toggleSidebar} style={{cursor: 'pointer'}}>
              {user?.profileImage ? (
                  <img src={user.profileImage} alt="avatar" />
              ) : (
                  <div style={{width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#333'}}></div>
              )}
              <p>{user?.username || "username"}</p>
          </div> 
      </footer>
    </>
  )
}

export default Footer