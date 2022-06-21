import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header';
import Login from './components/Login'
import useUser from './hooks/useUser';
import './App.css';

function App() {

  const { user, setUser } = useUser()

  if (!user) {
    return <Login setUser={setUser} />
  }
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
      </Routes>
    </>
  );
}

export default App;
