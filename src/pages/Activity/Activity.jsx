import React, { useContext, useState } from 'react'
import './Activity.scss'
import { AuthContext } from '../../context/authContext'
import { useQuery } from '@tanstack/react-query'
import { makeRequest } from '../../axios'
const Activity = () => {


   const {isLoading,error,data} = useQuery(['activity'],()=>
    
   makeRequest.get("/activity").then((res)=>{
    return res.data
   })

   )
   console.log(data)

  return (
    <div className='activity'>
        {data?.map((like)=>(
            <div className='activity-like'>
                <p>{like.likedByUsername} {like.actionType}d your post.</p>

            </div>
        ))}
    </div>
  )
}

export default Activity