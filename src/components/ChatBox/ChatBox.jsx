import React, { useState,useEffect } from 'react'
import "./ChatBox.scss"
import userLogo from "../../assets/user.png"
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import Input from '../Input/Input'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { makeRequest } from '../../axios'
import { AuthContext } from '../../context/authContext'
import { useContext } from 'react'
import { useRef } from 'react';
import Chat from '../Chat/Chat';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
const ChatBox = ({setSelectedUser,selectedUser,followingUsers}) => {

    const [openChat,setOpenChat] = useState(false)
    const [chatSearch,setChatSearch] = useState("")
    const {currentUser} = useContext(AuthContext)
    const senderId = currentUser?.id
    const [message,setMessage] = useState("")
    const queryClient = useQueryClient();
    const receiverId = selectedUser
    const messageRef = useRef(null);
 

    const {isLoading:chatIsLoading,data:chatBoxData,refetch:refetchChatBox} = useQuery(["chatBox"],()=>
    makeRequest.get(`/chat/${senderId}/${receiverId}`).then((res)=>{
        return res.data
    }))
    const { isLoading: userLoading, data: selectedUserInfo } = useQuery(
      ["selectedUserInfo", selectedUser], // Query key includes selectedUser
      () => makeRequest.get(`/users/find/${selectedUser}`).then((res) => res.data),
      {
        enabled: !!selectedUser, // Only fetch when selectedUser is available
      }
    );
   
const mutation = useMutation(
    (newMessage) =>{
        return makeRequest.post("/chat", newMessage)
    },
    {
        onSuccess:()=>{
            queryClient.invalidateQueries(["chatBox"])
        },
    }
)


useEffect(()=>{
    refetchChatBox()
   
},[selectedUser])

const scrollToBottom = () => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom(); // Scroll to the bottom when component initially renders
  }, [chatBoxData]);




const handleClick = async(e)=>{
    e.preventDefault();

    if (message.trim() === "") {
      // If it's empty, do not send
      return;
    }
    mutation.mutate({senderId, receiverId ,message})
    setMessage("")
}

    const handleChatIconClick = () => {
        setOpenChat((prev) => !prev);
      };

      
    const filteredFollowingUsers = followingUsers?.filter(
        (item) =>
          item.name.toLowerCase().includes(chatSearch.toLowerCase()) // Filter based on name
      );
      
    console.log(selectedUser)
  
  return (
    <div className={`chatbox ${openChat ? 'open' : ''}`}>
        <div className='message-icon'>
            {openChat && selectedUser ? <div 
            className='chat-icon-container'>
              <div className='message-user-icon'>
               <ArrowBackIosIcon onClick={()=> setSelectedUser(null)}  />
                  <div className='message-user-image'>
                    <img src={selectedUserInfo?.profilePic ? '/upload/' + selectedUserInfo.profilePic : userLogo} alt="" />
                    <span>{selectedUserInfo?.name}</span>
                   </div>
              </div>
                    <KeyboardDoubleArrowDownIcon className='chat-icon'
                    onClick={handleChatIconClick}
                   />
                   
            </div>:
            openChat ? <div onClick={handleChatIconClick} 
            className='chat-icon-container'>
            <h3>Messages</h3>
            <KeyboardDoubleArrowDownIcon className='chat-icon'
            
            />
            </div>
            : 
            <div onClick={handleChatIconClick} className='chat-icon-container'>
            <h3>Messages</h3>
            <KeyboardDoubleArrowUpIcon className='chat-icon'
            
            />
            </div>
           
            
            }
        </div>
       
        {openChat && !selectedUser &&(
            <div className='chat-users'>
                        <div className='search-chat'>
                            
                            <input type="text" 
                        value={chatSearch}
                        placeholder='Search for users'
                        onChange={(e)=>setChatSearch(e.target.value)} />
                        </div>
                <div className='chat-user-container'>
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
        )}

        {openChat && selectedUser && (
        <div className='chat-message-container'>
          <div className='chat-messages' ref={messageRef} >
          {chatBoxData?.map((chat)=>(
                <Chat chat={chat} key={`chat_${chat.id}`} />
            ))}
          
          </div>
          <div className='chat-input'>
          <Input handleClick={handleClick} setMessage={setMessage} message={message} />
          </div>
        </div>
      )}

    </div>
  )
}

export default ChatBox