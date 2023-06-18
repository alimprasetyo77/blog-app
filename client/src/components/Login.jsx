import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {LoginUser} from '../features/AuthSlice'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch() 
  const navigate = useNavigate()
  const {isSucces, isLoading, isError, message} = useSelector(state => state.auth)

  const handleLogin = (e) => {
    e.preventDefault()
    if(isSucces)navigate('/')
    dispatch(LoginUser({username, password}))
  }
  return (
      <div className='min-h-screen text-gray-800 flex justify-center items-center bg-gray-50'>
        <div className='py-3 mx-auto text-center w-full sm:max-w-lg px-8'>
          <span className='text-2xl font-light'>Login to your account</span>
          <div className="mt-4 shadow-md rounded-lg bg-white text-left">
            <div className='h-2 bg-sky-500 rounded-t-lg'></div>
            { isError && ( <div className='absolute flex items-center bottom-5 right-5 rounded-xl bg-red-500 p-2 mt-2 text-red-100 text-sm'>{message}!</div>)}
            <div className="px-8 py-6">
              <form onSubmit={handleLogin}>
                <label htmlFor="username" className='block font-semibold'>Username</label>
                <input type="text" name="username" id="username" className='w-full px-3 py-5 h-5 outline-none border rounded-lg' onChange={(e) => setUsername(e.target.value)}/>
                <label htmlFor="password" className='block font-semibold'>Password</label>
                <input type="password" name="password" id="password" className='w-full px-3 py-5 h-5 outline-none border rounded-lg' onChange={(e) => setPassword(e.target.value)}/>
                <div className="flex items-center justify-between mt-8">
                  <button type="submit" className="bg-sky-500 text-white py-2 px-6 rounded-md hover:bg-sky-600 " disabled={isLoading}>
                    {isLoading ? 'loading..' : 'Log In'}
                  </button>
                  <a href="#" className='text-sm hover:underline'>Forgot Password?</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Login