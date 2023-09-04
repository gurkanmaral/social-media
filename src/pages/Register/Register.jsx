import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import "./Register.scss"
import axios from 'axios'

const Register = () => {

  const [inputs,setInputs] = useState({
    username:"",
    email:"",
    password:"",
    name:"",
  })
  const [err,setErr] = useState(null)
  const navigate = useNavigate()


  const handleChange = (e)=>{
    setInputs((prev)=> ({...prev,[e.target.name]:e.target.value}))
  }
  const handleClick = async(e)=>{
    e.preventDefault();

    try {
        await axios.post("http://localhost:8800/api/auth/register",inputs)
        navigate("/login")
    } catch (error) { 
      setErr(error.response.data)
    }
  }

  return (
    <div className='register'>
     <div  className='gradient' />
     <div className='register-container'>
            <div className='top'>
                <h1>SOCIAL MEDIA</h1>
                <p>Connect and Share</p>
            </div>
            <div className='bottom'>
                <form>
                    <input type="text"
                    placeholder='Username' 
                    name="username"
                    onChange={handleChange}                 
                    />
                     <input type="email" 
                     placeholder="Email" 
                     name="email" 
                     onChange={handleChange} 
                     />
                    <input type="password"
                    placeholder='Password'
                    name="password"
                    onChange={handleChange}  
                    />
                    <input type="text" 
                    placeholder="Name" 
                    name="name" 
                    onChange={handleChange} />

                    {err && err}
                    <button onClick={handleClick}>
                        Register
                    </button>            
                    <div className='login-div'>
                        <p>Do you have an account?</p>
                        <Link to="/login" className='link'>
                          Login
                        </Link>
                    </div>
                   
                </form>
                
            </div>
            
        </div>
    </div>
  )
}

export default Register