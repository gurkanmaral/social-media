import React, { useContext } from 'react'
import './Navbar.scss'
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from 'react-router-dom';
import { DarkModeContext } from '../../context/darkModeContext';
import {AuthContext} from "../../context/authContext"
import userLogo from "../../assets/user.png"
import { useState } from 'react';
import { useQuery,useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import NavbarBox from "../NavbarBox/NavbarBox"
const Navbar = () => {

  const {toggle,darkMode} = useContext(DarkModeContext)
   const [err,setErr] = useState(null)
  const {currentUser,logout} = useContext(AuthContext)
  const [searchValue,setSearchValue] = useState("")
  const [open,setOpen] = useState(false)
  
  

 
  const navigate = useNavigate()

  const handleLogout = async(e)=>{
    e.preventDefault();

    try {
      await logout();
      navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }

  const handleClick = (e)=>{
    e.preventDefault()

    if(searchValue){
      navigate(`/search/${searchValue}`)
      setSearchValue("")


      
    }
  }


  return (

    <div className='navbar'>
      <div className='left'>
      <Link to="/" style={{textDecoration:"none", color: "inherit"}}>
          <span>SocialMedia</span> 
          </Link>     
          <Link to="/" style={{textDecoration:"none", color: "inherit"}} >
            <HomeOutlinedIcon />
          </Link>
          { darkMode ? <DarkModeOutlinedIcon onClick={toggle} style={{cursor:'pointer'}} />
          : <WbSunnyOutlinedIcon onClick={toggle}  style={{cursor:'pointer',width:'18px',height:'18px'}}  />}
            <div className='search-div'>
              <SearchOutlinedIcon onClick={handleClick} style={{cursor:'pointer',width:'18px',height:'18px'}}  />
              <form>
                <input type="text" placeholder='Search' value={searchValue} 
                onChange={(e)=>setSearchValue(e.target.value)}/>
                <button className='' onClick={handleClick}
                >
                    search
                </button>
              </form>
              
            </div>     
      </div>
      <div className='right'>
          {currentUser ?
          <div className="user" onClick={()=> setOpen((prev)=>!prev)}>
               <img src={currentUser?.profilePic ? "/upload/"+ currentUser?.profilePic : userLogo} alt="" />
               <span>{currentUser?.username}</span>         
          </div>
          : ( 
            <Link to="/login">
              <button>Login</button>
            </Link>
          )
          }
        </div>
        {open && <NavbarBox currentUser={currentUser} />}
    </div>
  )
} 

export default Navbar