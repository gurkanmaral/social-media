import React, { useContext, useEffect, useState } from 'react'
import "./Profile.scss"
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts"
import { useQuery,useMutation,useQueryClient } from '@tanstack/react-query'
import {makeRequest} from "../../axios"
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import Update from "../../components/update/Update"
import userLogo from "../../assets/user.png"
import background from "../../assets/background.jpg"
import ProfileFollow from '../../components/ProfileFollow/ProfileFollow';
import Spinner from '../../components/Spinner/Spinner';
import ProfilePosts from '../../components/ProfilePosts/ProfilePosts';

const Profile = () => {

  const [openUpdate,setOpenUpdate] = useState(false)
  const [openFollow,setOpenFollow] = useState(false)
  const [openFollowing,setOpenFollowing] = useState(false)
  const userId = parseInt(useLocation().pathname.split("/")[2])

  const {currentUser} = useContext(AuthContext)

  const { isLoading, error, data,refetch:reFetchUser } = useQuery(["user"], () =>
  makeRequest.get("/users/find/"+ userId).then((res) => {
    return res.data;
  })
);

const {isLoading: allIsLoading, data: allData} = useQuery(["allUsers"],() =>
makeRequest.get("/users").then((res) => {
  return res.data
})
);



const { isLoading:rIsLoading ,data: relationshipData } = useQuery(["relationship"], () =>
makeRequest.get("/relationships?followedUserId="+ userId).then((res) => {
  return res.data;
})
);

const {isLoading:followIsLoading,data: followData,refetch:followingRefetch} = useQuery(["following"], ()=>
  makeRequest.get(`/relationships/followers-following?userId=${userId}`).then((res)=>{
    return res.data;
  })
)

console.log(followData)



const queryClient = useQueryClient()

const mutation = useMutation(
  (following) => {
    if(following) return makeRequest.delete("/relationships?userId="+ userId)

    return makeRequest.post("/relationships",{userId})
  },
 {
  onSuccess: ()=>{
    queryClient.invalidateQueries(["relationship"])
    queryClient.invalidateQueries(["allUsers"])
  }
 }
)




const handleFollow = ()=>{
mutation.mutate(relationshipData.includes(currentUser.id))
}

useEffect(()=>{
  reFetchUser()
  followingRefetch()
},[userId])




  return (
    <div className="profile">
      <div className="images">
        <img src={data?.coverPic ? "/upload/"+ data?.coverPic : background} alt="" className="cover" />
        <img src={data?.profilePic ? "/upload/"+ data?.profilePic : userLogo} alt="" className="profilePic" />
      
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
                  <div className='left-item'>
                  <PlaceIcon />
                  <span>{data?.city}</span>
                  </div>
                    <div className='left-item'>
                        
                    <LanguageIcon />
                    <a href={data?.website} target="_blank" rel="noopener noreferrer">
                    <span>{data?.website?.substring(0, 22)}</span>
                    </a>                   
                    </div>

          </div>

          <div className="center">
            <span>
            {data?.name}
            </span>
            <div className="info">
                <div className="item" onClick={()=>setOpenFollow(true)} style={{cursor:"pointer"}}>
                  {followData?.followers.length} Followers
                </div>

                <div className="item" onClick={()=>setOpenFollowing(true)} style={{cursor:"pointer"}}>
                  {followData?.following.length} Following
                </div>
                
            </div>
            {rIsLoading ? "loading" : userId === currentUser.id ? (<button onClick={()=>setOpenUpdate(true)}>update</button>)
            : (<button onClick={handleFollow}>{relationshipData?.includes(currentUser.id) ? "Following" : "Follow"}</button>)}
           
          </div>

          <div className="right">
             {userId === currentUser.id ? '' : <EmailOutlinedIcon />} 
          </div>
        </div>
        <ProfilePosts userId={userId}/>
      </div>
      {openUpdate &&  <Update setOpenUpdate={setOpenUpdate} user={data} />}
      {openFollow && <ProfileFollow  setOpenFollow={setOpenFollow} followData={followData} h1={"follow"} /> }
      {openFollowing && <ProfileFollow setOpenFollowing={setOpenFollowing} followData={followData} h1={"following"} />}
    </div>
  )
}

export default Profile