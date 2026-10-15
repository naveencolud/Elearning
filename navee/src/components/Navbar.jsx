import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

export default function Navbar({ user, onSignOut }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <nav className="navbar page-wrap" aria-label="Main navigation">
        <Link className="brand" to="/" onClick={closeMenu} aria-label="Navee home">
          <span className="brand-mark">N</span> navee<span className="brand-period">.</span>
        </Link>
        <button className="menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
        <div className={`nav-links ${menuOpen ? 'nav-links-open' : ''}`}>
          <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
          <NavLink to="/courses" onClick={closeMenu}>Explore courses</NavLink>
          <NavLink to="/my-learning" onClick={closeMenu}>My learning</NavLink>
          <div className="nav-actions">
            {user ? (
              <>
                <span className="user-greeting">Hi, {user.name.split(' ')[0]}</span>
                <button className="button button-outline button-small" onClick={() => { onSignOut(); closeMenu(); navigate('/') }}>Sign out</button>
              </>
            ) : (
              <>
                <Link className="login-link" to="/login" onClick={closeMenu}>Log in</Link>
                <Link className="button button-dark button-small" to="/register" onClick={closeMenu}>Get started <span aria-hidden="true">↗</span></Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}
