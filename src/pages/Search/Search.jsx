import React, { useEffect, useState } from 'react'
import "./Search.scss"
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { makeRequest } from '../../axios'
import userLogo from "../../assets/user.png"
import { Link } from 'react-router-dom'
import moment from "moment";
import { FavoriteBorderOutlined } from '@mui/icons-material'
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import Post from '../../components/Post/Post'
import Spinner from '../../components/Spinner/Spinner'
const Search = () => {

  const {searchTerm} = useParams()
  const [commentOpen, setCommentOpen] = useState(false);
  const navigate = useNavigate()
  

  const { isLoading:searchLoading, error:searchError, data:searchData,refetch: refetchUsers } = useQuery(["searchUsers"], () =>
  makeRequest.get("/users/search/" + searchTerm).then((res) => {
        return res.data
  })
);

console.log(searchData)


const {isLoading:sPostLoading,error:sPostError,data:sPostData,refetch: refetchPosts,} = useQuery(["searchPosts"],()=>
makeRequest.get("/posts/search/" + searchTerm).then((res)=>{
  return res.data
})
)

console.log(sPostData)

useEffect(()=>{

  refetchUsers();
  refetchPosts();
},[searchTerm])




  return (
    <div className='search'>
      <div className='search-container'>
        <div className='user-search'>
          <h1>USERS</h1>
       
        <div className='user-info'>      
        {searchLoading ?
        <Spinner />: 
        searchError ?
        "error" :
      searchData.length > 0 ? searchData?.map((user)=>(
        <div key={user.id} className='user-container'>
          <div className='user-left'>
            <Link to={`/profile/${user.id}`}>
            <img src={user.profilePic ? "/upload/" + user.profilePic : userLogo} alt="" />
            </Link>
            
            <div className='user-middle'>
              <h3>{user.name}</h3>
              <p>{user.username}</p>
            </div>
          </div>
          <div className='user-right'>

          </div>
        </div>
      
      )): <span>No users found</span>
      }
      </div>      
        </div>
        <div className='post-search'>
                <h1>POSTS</h1>

          <div className='posts-info'>
                {sPostData?.length > 0 ? sPostData?.map((post)=>(
                  <Post post={post} key={post.id} />
                  )): <span>No post found</span>}
          </div>


        </div>

      </div>
    </div>
  )
}

export default Search