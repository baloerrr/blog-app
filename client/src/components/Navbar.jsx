import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import useLogout from '../hooks/useLogout'

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const { logout } = useLogout()

  const handleClick = () => {
    logout()
  }

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <h2>Baloer Blog</h2>
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/?cat=art">
            <h6>ART</h6>
          </Link>
          <Link className="link" to="/?cat=science">
            <h6>SCIENCE</h6>
          </Link>
          <Link className="link" to="/?cat=technology">
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link className="link" to="/?cat=sport">
            <h6>SPORT</h6>
          </Link>
          <Link className="link" to="/?cat=food">
            <h6>FOOD</h6>
          </Link>
          <Link className="link" to="/?cat=design">
            <h6>DESIGN</h6>
          </Link>
          {user ? (
            <div>
              <span>{user?.username}</span>
              <span onClick={handleClick}>Logout</span>
            </div>
          ) : (
            <Link to={'/login'} className="link">
              Login
            </Link>
          )}
          <span className="write">
            <Link className="link" to="/write">
              Write
            </Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Navbar
