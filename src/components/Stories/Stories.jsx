import React, { useContext } from 'react'
import "./Stories.scss"
import { AuthContext } from '../../context/authContext'
const Stories = () => {


  const {currentUser} = useContext(AuthContext)
  
  const stories =[
    {
      id:1,
      name:"Gurkan",
      img:"https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id:2,
      name:"John Doe",
      img:"https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id:3,
      name:"Jane Doe",
      img:"https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
  ]

  return (
    <div className='stories'>
      <div className="story">
        <img src="" alt="" />
        <span>gurkan</span>
        <button>+</button>
      </div>

      {stories.map((story)=>(
        <div className='story' key={stories.id}>
          <img src={story.img} alt="" />
          <span>{story.name}</span>
        </div>
      ))}
    </div>
  )
}

export default Stories