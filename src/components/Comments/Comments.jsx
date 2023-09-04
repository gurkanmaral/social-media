import React, { useContext, useState } from 'react'
import "./Comments.scss"
import { AuthContext } from '../../context/authContext'
import { useQuery } from '@tanstack/react-query'
import moment from "moment"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {makeRequest} from "../../axios"
import userLogo from "../../assets/user.png"
const Comments = ({postId}) => {

  const [desc,setDesc] = useState("")

    const {currentUser} = useContext(AuthContext)

    const { isLoading, error, data } = useQuery(["comments"], () =>
    makeRequest.get("/comments?postId="+postId).then((res) => {
      return res.data;
    })
    ) 
    const queryClient = useQueryClient();

    const { isLoading:cLoading, error:commentsError, data:commentsData } = useQuery(["commentsUser"], () =>
    makeRequest.get("/users/find/"+ currentUser.id).then((res) => {
      return res.data;
    })
  );

    const mutation = useMutation(
      (newComment) => {
        return makeRequest.post("/comments", newComment);
      },
      {
        onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries(["comments"]);
        },
      }
    );
  
    const handleClick = async (e) => {
      e.preventDefault();
     
      mutation.mutate({ desc, postId});
      setDesc("");
    }
    console.log(commentsData)
  return (
    <div className='comments'>
        <div className="write">
        <img src={commentsData?.profilePic ?"/upload/" + commentsData?.profilePic : userLogo} alt=""  />
        <input type="text" placeholder='Write a comment' onChange={(e)=>setDesc(e.target.value)} 
        value={desc}/>
        <button onClick={handleClick}>Send</button>
        </div>        
        {isLoading ? "loading"
        : data?.map((comment,i)=> (
        <div className="comment" key={`comment_${i}`}>
            <img src={comment?.profilePic ? "/upload/" + comment?.profilePic : userLogo} alt="" />
            <div className="info">
                <span>{comment.name}</span>
                <p>{comment?.desc}</p>
            </div>
            <span className='date'>{moment(comment.createdAt).fromNow()}</span>         
        </div>
        ))}
    </div>
  )
}

export default Comments