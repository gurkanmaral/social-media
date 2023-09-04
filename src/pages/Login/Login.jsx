import React, { useContext, useState } from 'react'
import './Login.scss'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'

const Login = () => {
    
    const {login} = useContext(AuthContext)

    const [inputs,setInputs] = useState({
        username: "",
        password: "",
    })
    const [err,setErr] = useState(null)

    const navigate = useNavigate()

    const handleChange = (e)=>{
        setInputs((prev)=>({...prev,[e.target.name]: e.target.value}))
    }
    
    const handleLogin = async(e)=>{
        e.preventDefault();
        try {
            await login(inputs);
            navigate("/")
        } catch (err) {
            setErr(err.response.data);
        }
    }

  return (
    <div className='login'>
        <div className='gradient' />
        <div className='login-container'>
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
                    <input type="password"
                    placeholder='Password'
                    name="password"
                    onChange={handleChange}  
                    />
                    <div>
                    {err && <p className="error-message">{err}</p>}
                    </div>
                   
                    <button onClick={handleLogin}>
                        Login
                    </button>
                    <p>Dont you have an account?</p>
                    <Link to="/register" className='link'>
                       Register
                    </Link>
                </form>               
            </div>
            
        </div>
    </div>
  )
}

export default Login