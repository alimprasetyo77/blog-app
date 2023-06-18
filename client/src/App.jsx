import { useSelector } from 'react-redux'
import {Route, Routes} from 'react-router-dom'
import Login from './components/Login'
import Post from './components/Post'
import Profile from './components/Profile'
import Register from './components/Register'
import Write from './components/Write'
import InitialPage from './pages/InitialPage'

const App = () => {
  const {user} = useSelector(state => state.auth)

  return (
     <Routes>
        <Route path="/" element={ <InitialPage/> }/>
        
        {/* Get Single Post */}
        <Route path='post/:id' element={<Post/>}/> 
      
        <Route path='add-post' element={user ? <Write/> : <Login/>}/>

        <Route path='profile/:id' element={user ? <Profile/> : <InitialPage/>}/>

        <Route path="login" element={user ? <InitialPage/> : <Login/>}/>
        <Route path="register" element={user ? <InitialPage/> : <Register/>} />
      </Routes>
  )
}

export default App