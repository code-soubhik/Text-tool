import { Link } from "react-router-dom"

const Header = () => {
  return (
    <>
      <nav className="nav">
        <Link className="nav-logo" to="/">Text Tool</Link>
        <Link className="nav-saved-btn" to="/saved">Saved Texts</Link>
      </nav>
    </>
  )
}

export default Header