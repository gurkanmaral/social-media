import React, { useContext, useRef } from 'react'
import "./Chat.scss"
import { AuthContext } from '../../context/authContext'
import { useEffect } from 'react'
import { DarkModeContext } from '../../context/darkModeContext'


const Chat = ({chat}) => {

  const chatRef = useRef(null);
  const {currentUser} = useContext(AuthContext)
  const {darkMode} = useContext(DarkModeContext)

 



  return (
    <div className={`chat ${chat.senderId === currentUser?.id ? 'owner' : ''}`}
    style={{
      backgroundColor: darkMode ? "white" : "black",
      color: darkMode ? "black" : "white"
    }}
    >
     
        <p>{chat?.message}</p>

    </div>
  )
}

export default Chat