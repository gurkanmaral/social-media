import React from 'react'
import "./ProfileFollow.scss"
import userLogo from "../../assets/user.png"
import { Link } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close';
const ProfileFollow = ({setOpenFollow,followData,setOpenFollowing,h1}) => {



    return (
    <div className='profileFollow' >
      <div className='followWrapper'>
        {h1 === "follow" ?        
          <div className='closeButton'>
                 <h1 >
                  Followers
                 </h1>
                 <button onClick={()=>setOpenFollow(false)} className='button'>
                 <CloseIcon style={{cursor:"pointer"}} />
                 </button>
          </div>
       
        :  
          <div className='closeButton'>
              <h1 >
                 Following
              </h1>
              <button onClick={()=>setOpenFollowing(false)} className='button'>
                <CloseIcon style={{cursor:"pointer"}}/>
              </button>
          </div>
         }
          <div className='followUsers'>        
              {h1 === "follow" ? followData?.followers.map((follower)=>(
                <Link to={`/profile/${follower.id}`} style={{textDecoration:"none"}}
                className="custom-link"
                key={follower.id}
                onClick={()=>setOpenFollow(false)}
                >
                <div className='followUsersInfo'>
                  
                  <img src={follower.profilePic ? "/upload/" +follower.profilePic : userLogo} alt="" />
                  <h1>{follower.name}</h1>
       
                </div>
                </Link>
              )

              ): followData?.following.map((follower)=>(
                <Link to={`/profile/${follower.id}`} style={{textDecoration:"none"}}
                className="custom-link"
                key={follower.id}
                onClick={()=>setOpenFollow(false)}>
                  
                <div className='followUsersInfo'>
                 
                 <img src={follower.profilePic ? "/upload/" +follower.profilePic : userLogo} alt="" />
                  <h1>{follower.name}</h1>
                            
                </div>
                </Link>  
              )) }
          </div>
      </div>
      </div>
  )
}

export default ProfileFollow