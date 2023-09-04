import React, { useContext } from 'react'
import "./NavbarBox.scss"
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
const NavbarBox = ({currentUser}) => {

  const navigate = useNavigate()
  const {logout} = useContext(AuthContext)


  const handleClick = ()=>{
    logout()
    navigate("/login")
  }

  return (
    <div className='navbar-box'>
      <Link to={`profile/${currentUser.id}`} className='navbar-box-profile' >
        My Profile
      </Link>
      <span>Settings</span>
      <span onClick={handleClick}>
        Logout

      </span>

    </div>
  )
}

export default NavbarBox