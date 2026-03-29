import AppRoutes from "./AppRoutes" 
import "./style.scss"
import { AuthProvider } from "./features/auth/auth.context.jsx"
import { PostProvider } from "./features/posts/post.context.jsx"
import { ProfileProvider } from "./features/profile/profile.context.jsx"

function App() {

  return (
    <AuthProvider>
      <ProfileProvider>
        <PostProvider>
          <AppRoutes />
        </PostProvider>
      </ProfileProvider>
    </AuthProvider>
  )
}

export default App
