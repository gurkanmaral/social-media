import React from 'react'
import "./Posts.scss"
import Post from '../post/Post'
import { useQuery } from '@tanstack/react-query'
import {makeRequest} from "../../axios"
import Spinner from '../Spinner/Spinner'

const Posts = () => {

  const { isLoading, error, data } = useQuery(["posts"], () =>
  makeRequest.get("/posts").then((res) => {
    return res.data;
  })
);
  console.log(data)

  return (
    <div className='posts'>
        {isLoading 
        ? <Spinner /> 
        : data.map((post,i)=>(
          <Post post={post} key={i} />
        ))}
    </div>
  )
}

export default Posts