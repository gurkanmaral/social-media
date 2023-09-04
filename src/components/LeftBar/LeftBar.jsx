import React, { useContext } from 'react'
import "./LeftBar.scss"
import Friends from "../../assets/1.png";
import Groups from "../../assets/2.png";
import Market from "../../assets/3.png";
import Watch from "../../assets/4.png";
import Memories from "../../assets/5.png";
import Events from "../../assets/6.png";
import Gaming from "../../assets/7.png";
import Gallery from "../../assets/8.png";
import Videos from "../../assets/9.png";
import Messages from "../../assets/10.png";
import Tutorials from "../../assets/11.png";
import Courses from "../../assets/12.png";
import Fund from "../../assets/13.png";
import { AuthContext } from '../../context/authContext';
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import userLogo from "../../assets/user.png"
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import { Link } from 'react-router-dom';
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
const LeftBar = () => {

  const {currentUser} = useContext(AuthContext)

  

  return (
    <div className='leftBar'>
      <div className='container'>
        <div className='menu'>
          <div className="user">
            <img src={currentUser?.profilePic ? "/upload/" + currentUser?.profilePic : userLogo} alt="" />
            <span>{currentUser?.name}</span>
          </div>
        
          <div className='item'>
            <EmailOutlinedIcon style={{width:'30px',height:'30px'}}  />
            <span>Messages</span>
          </div>
          <div className=''>
            <Link to={`profile/${currentUser.id}`} className='item'
            style={{textDecoration: "none",color:"inherit"}}
            >
              <PersonOutlinedIcon style={{width:'30px',height:'30px'}}  />
              <span>Profile</span>
            </Link>         
          </div>
          <div className='item'>
              <PeopleOutlineIcon style={{width:'30px',height:'30px'}} />
              <span>Friends</span>
          </div>
          <div className='item'>
            <NotificationsOutlinedIcon  style={{width:'30px',height:'30px'}} />
            <Link to="/activity"  style={{textDecoration: "none",color:"inherit"}}>
              <span>Notifications</span>
            </Link>
            
          </div>
        </div>
        <hr />
       
      </div>

    </div>
  )
}

export default LeftBar