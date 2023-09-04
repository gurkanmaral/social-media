import React from 'react'
import "./ProfilePosts.scss"
import { useQuery } from '@tanstack/react-query'
import {makeRequest} from "../../axios"
import Spinner from '../Spinner/Spinner'
import Post from '../post/Post'

const ProfilePosts = ({userId}) => {

  const { isLoading, error, data } = useQuery(["profilePosts",userId], () =>
  makeRequest.get("/posts/profile?userId="+userId).then((res) => {
    return res.data;
  })
);
console.log(data)


  return (
    <div className='posts'>
        {isLoading 
        ? <Spinner /> 
        : data.map((post)=>(
          <Post post={post} key={post.id} />
        ))}
    </div>
  )
}

export default ProfilePosts