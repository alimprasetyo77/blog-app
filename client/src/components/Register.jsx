import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {CgDanger} from 'react-icons/cg'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const navigate = useNavigate()
  
  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      setError(false)
      const res = await axios.post('http://localhost:5000/api/auth/register',{
        username,
        email,
        password
      })
      res.data && navigate('/login') 
    } catch (error) {
      console.log(error)
      setError(true)
    }
  }
  return (
      <div className='min-h-screen text-gray-800 flex justify-center items-center bg-gray-50'>
        <div className='py-3 mx-auto text-center w-full sm:max-w-lg px-8'>
          <span className='text-2xl font-light'>Register to your account</span>
          <div className="mt-4 shadow-md rounded-lg bg-white text-left">
            <div className='h-2 bg-sky-500 rounded-t-lg'></div>
            { error && ( <div className='absolute flex items-center bottom-5 right-5 rounded-xl bg-red-500 p-2 mt-2 text-red-100 text-sm'><CgDanger className='text-xl mr-1'/>Something went wrong!</div>)}
            <div className="px-8 py-6">
              <form onSubmit={handleRegister}>
                <label htmlFor="username" className='block font-semibold'>Username</label>
                <input type="text" name="username" id="username" placeholder='Enter your username' className='w-full px-3 py-5 h-5 outline-none border rounded-lg' onChange={(e) => setUsername(e.target.value)} />

                <label htmlFor="email" className='block font-semibold'>Email</label>
                <input type="email" name="email" id="email" placeholder='Enter your email' className=' w-full px-3 py-5 h-5 outline-none border rounded-lg' onChange={(e) => setEmail(e.target.value)}/>

                <label htmlFor="password" className='block font-semibold'>Password</label>
                <input type="password" name="password" id="password" placeholder='Enter your password' className='w-full px-3 py-5 h-5 outline-none border rounded-lg' onChange={(e) => setPassword(e.target.value)}/>
                <div className="flex items-center justify-between mt-8">
                   <button type="submit" className="bg-sky-500 text-white py-2 px-6 rounded-md hover:bg-sky-600 ">Register</button>
                  <Link to={'/login'} className='text-sm hover:underline'>already have an account?</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Register