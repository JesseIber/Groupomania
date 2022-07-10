import './header.css'
import logo from '../../assets/img/logo.png'
import UserContext from '../../contexts/UserContext'
import { useContext } from 'react'
import { useCookies } from 'react-cookie'
import { Link } from 'react-router-dom'

export default function Header() {
    const [cookies, setCookie, removeCookie] = useCookies()
    const { user, setUser } = useContext(UserContext)

    function handleLogout() {
        setUser(null)
        removeCookie('user')
    }

    if (!user) {
        return
    }

    return (
        <div className="nav">
            <div className="nav__logo">
                <img className="nav__logo" src={logo} width="150" />
            </div>
            <div className="nav__logout">
                <button className="btn btn-primary" onClick={handleLogout}>
                    Déconnexion
                </button>
            </div>
        </div>
    )
}
