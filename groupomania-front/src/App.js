import Home from './pages/Home'
import Login from './components/Login'
import './App.css'
import { useState } from 'react'
import UserContext from './contexts/UserContext'
import { Route, Routes } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import Sidenav from './components/Sidenav'

function App() {
  const [cookies] = useCookies()
  const [user, setUser] = useState(cookies.user ? cookies.user : null)
  // console.log('user from context : ', user);
  // console.log('user from cookies : ', cookies.user)
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Sidenav />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </UserContext.Provider>
  )

}

export default App;
