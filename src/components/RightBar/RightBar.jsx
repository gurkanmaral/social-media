import React, { useContext, useState } from 'react'
import "./RightBar.scss"
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import userLogo from "../../assets/user.png"
import { AuthContext } from '../../context/authContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import Message from '../Message/Message';
import ChatBox from '../ChatBox/ChatBox';


const RightBar = () => {

  const {currentUser} = useContext(AuthContext)
  const [openChat, setOpenChat] = useState(true)
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatSearch,setChatSearch] = useState("")

  const userId = currentUser?.id

  const { isLoading:userLoading, error:userError, data:userData } = useQuery(["allUsers"], () =>
  makeRequest.get("/users").then((res) => {
    return res.data
  })
);

const {isLoading:rLoading,data: rightRelationshipData} = useQuery(["relationship"],()=>
makeRequest.get("/relationships?followedUserId="+ currentUser?.id).then((res) => {
  return res.data;
})
)

const {isLoading:chatFLoading,data:chatFollowdata} = useQuery(["chatFollow"], ()=>
  makeRequest.get(`/relationships/followers-following?userId=${userId}`).then((res)=>{
    return res.data
  })
)
console.log(chatFollowdata)

const followingUsers = chatFollowdata?.following

const queryClient = useQueryClient()

const mutation = useMutation(
  ({ userId, following }) => {
    if (following) {
      return makeRequest.delete(`/relationships?userId=${userId}`);
    }
    return makeRequest.post("/relationships", { userId });
  },
  {
    onSuccess: () => {
      queryClient.invalidateQueries(["relationship"]);
      queryClient.invalidateQueries(["allUsers"]);
    },
  }
);
console.log(userData)

const handleFollow = (userId)=>{
  const following = rightRelationshipData.includes(userId);
  mutation.mutate({ userId, following });
  }

  

  return (
    <div className='rightBar'>  
      <div className="container">
        <div className="item">
          <span>Suggestions For you</span>
          {userLoading 
        ? "loading" 
        : userError 
        ? "error" 
        : userData && Array.isArray(userData) && userData.slice(0,3).map((user) => (
          <div className="user" key={user.id}>
            <div className="userInfo">
              <Link to={`profile/${user.id}`}>
              <img src={user.profilePic ? "/upload/" + user.profilePic : userLogo} alt="" />
              </Link>             
              <span>{user.name}</span>
            </div>
            <div className="buttons">
              <button onClick={() => handleFollow(user.id)}>
                <span>Follow</span>

              </button>
            </div>
          </div>
        ))}
        
         
       </div> 
       
       
            <div className='chat-box-container'>
             {openChat && <ChatBox setSelectedUser={setSelectedUser}
             selectedUser={selectedUser}
             followingUsers={followingUsers}
             />}
            </div>
            
          </div>
        </div>
  )
}

export default RightBar