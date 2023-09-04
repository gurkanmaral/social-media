import React, { useEffect, useState } from 'react'
import "./Input.scss"
import SendIcon from '@mui/icons-material/Send';
  
const Input = ({handleClick,setMessage,message}) => {
  return (

    <form className='input'>
        <input type="text" placeholder='Write a message'
                    onChange={(e)=>setMessage(e.target.value)} 
                    value={message}
                    />
                    <div className='send'>
                        <button onClick={handleClick}>
                            <SendIcon />
                        </button>
                    </div>
                   

    </form>
  )
}

export default Input