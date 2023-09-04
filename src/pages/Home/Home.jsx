import React, { useContext } from 'react'
import './Home.scss'
import Stories from '../../components/Stories/Stories'
import Share from '../../components/Share/Share'
import Posts from '../../components/Posts/Posts'
import { useQuery } from '@tanstack/react-query'
import { makeRequest } from '../../axios'
import { AuthContext } from '../../context/authContext'

const Home = () => {

 

  return (
    <div className='home'>
      <Share />
      <Posts />
    </div>
  )
}

export default Home