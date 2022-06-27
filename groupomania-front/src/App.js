import Home from './pages/Home'
import Login from './components/Login'
import './App.css'
import { useState } from 'react'
import UserContext from './contexts/UserContext'
import { Route, Routes } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import Header from './components/Header'

function App() {
  const [cookies] = useCookies()
  const [user, setUser] = useState(cookies.token ? { token: cookies.token } : null)
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Header />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </UserContext.Provider>
  )

}

export default App;
