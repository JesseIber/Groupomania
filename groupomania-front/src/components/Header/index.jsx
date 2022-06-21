import './header.css'
import logo from '../../assets/img/logo.png'

export default function Header() {
    return (
        <div className="nav">
            <img className="nav__logo" src={logo} width="170" />
            <button className="btn btn-primary">Déconnexion</button>
        </div>
    )
}
