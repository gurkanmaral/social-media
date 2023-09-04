import React, { useEffect, useRef, useState } from 'react'
import "./Message.scss"
import Chat from '../Chat/Chat'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { makeRequest } from '../../axios'
import { AuthContext } from '../../context/authContext'
import { useContext } from 'react'
import userLogo from "../../assets/user.png"
import Input from '../Input/Input'

const Message = ({selectedUser,followingUsers,chatSearch,setChatSearch,setSelectedUser}) => {

    const {currentUser} = useContext(AuthContext)
    const senderId = currentUser?.id
    const [message,setMessage] = useState("")
    const queryClient = useQueryClient();
    const receiverId = selectedUser
    const messageRef = useRef(null);

 

   

    

 
    
    
    


  

  return (
    <div className='message'>
           <div className='chat-search-container'>
            <div className='search-chat'>
                        <div className='search-chat-1'>
                        <input type="text" 
                        value={chatSearch}
                        placeholder='Search for users'
                        onChange={(e)=>setChatSearch(e.target.value)} />
                        </div>
              <div className='search-chat-2'>
                {chatSearch !== ""
    ? filteredFollowingUsers?.map((item) => (
        <div key={item.id} onClick={() => setSelectedUser(item.id)} className="chat-item">
          <img src={item.profilePic ? "/upload/" + item.profilePic : userLogo} alt="" />
          <p>{item.name}</p>
        </div>
      ))
    : followingUsers?.map((item) => (
        <div key={item.id} onClick={() => setSelectedUser(item.id)} className="chat-item">
          <img src={item.profilePic ? "/upload/" + item.profilePic : userLogo} alt="" />
          <p>{item.name}</p>
        </div>
      ))}
                </div>
            </div>
            <div className='message-chat' ref={messageRef} >
            {mData?.map((chat)=>(
                <Chat chat={chat} key={`chat_${chat.id}`} />
            ))}
            </div>    
           </div>
           
           
        
  
       
        <div className='input-container'>
           <Input handleClick={handleClick} setMessage={setMessage} message={message} />
        </div>
        
    </div>
  )
}

export default Message