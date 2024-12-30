import Link from 'next/link'

const Header = () => {
  return (
    <>
      <nav className="nav">
        <Link className="nav-logo" href="/">Text Tool</Link>
        <Link className="nav-saved-btn" href="/saved">Saved Texts</Link>
      </nav>
    </>
  )
}

export default Header