import { useState } from 'react'
import {DiYii} from 'react-icons/di'
import {AiOutlineSearch, AiFillWarning} from 'react-icons/ai'
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { reset } from '../features/AuthSlice'

const Header = () => {
  const [showModal, setShowModal] = useState(false)
  const {user} = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const PF = "http://localhost:5000/images/"
  const [searchOn, setSearchOn] = useState(false)
  const [query , setQuery] = useState('')

  const handleLogout = () => {
    localStorage.clear()
    navigate('/')
    dispatch(reset())
  }
  return (
      <>
       {/* Left */}
        <div className='flex flex-shrink-0 items-center max-w-[250px]'>
          <a href='#'><DiYii className='w-8 h-8 text-sky-500'/></a>
          <div className='flex ml-2 items-center rounded-full bg-gray-100 p-2 '>
            <label htmlFor="search">
              <AiOutlineSearch className='h-6 w-6 text-gray-600 ' onClick={() => setSearchOn((prev) => !prev)}/>
            </label>
            {searchOn && <input type="search" id='search' className=' py-[2px] px-2 outline-none w-full bg-slate-200 rounded-lg text-sm' onChange={(e) => setQuery(e.target.value)}/>}
          </div>
        </div>

        {/* Center */}
        <div className="flex flex-grow mx-auto justify-center max-w-3xl">
          <div className='flex items-center cursor-pointer space-x-6 md:space-x-2 font-medium'>
            <div className='group hover:bg-slate-100 active:border-b-2 md:px-10 active:border-sky-500 '>
              <Link to={'/'} className={'h-5 text-gray-600 text-center sm:h-7 group-hover:text-sky-500'}>Home</Link>
            </div>
            <div className='group hover:bg-slate-100 active:border-b-2 md:px-10 active:border-sky-500 '>
              <a href="#"  className={'h-5 text-gray-600 text-center sm:h-7 group-hover:text-sky-500'}>Contact</a>
            </div>
            <div className='group hover:bg-slate-100 active:border-b-2 md:px-10 active:border-sky-500 '>
              <a href="#"  className={'h-5 text-gray-600 text-center sm:h-7 group-hover:text-sky-500'}>About</a>
            </div>
            <div className='group hover:bg-slate-100 active:border-b-2 md:px-10 active:border-sky-500 '>
              <Link to={'/add-post'} className={'h-5 text-gray-600 text-center sm:h-7 group-hover:text-sky-500'}>Write</Link>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className='flex flex-shrink-0 items-center max-w-[250px] sm:space-x-2 text-slate-700 '>
          <div className='flex items-center space-x-4 font-medium text-sm'>
            {user ? (
              <>
                <Link to={'/profile/'+user._id}>
                 <img src={PF + user.profilePic} alt="Profile" className='h-8 w-8 rounded-full cursor-pointer' />
                </Link>
                <p className='whitespace-nowrap font-semibold hidden md:flex'>{user.username}</p>
                <button onClick={() => setShowModal(true)} className='hover:opacity-90 border text-white text-xs font-semibold bg-red-500 shadow-md rounded-xl px-4 py-2'>Logout</button>
              </>) 
              : 
              <>
                  <Link to={'/login'} className='hover:opacity-90 border rounded-xl px-4 py-2 text-slate-900 text-xs font-semibold'>Log In</Link>
                  <Link to={'/register'} className='px-4 py-2 bg-sky-500 rounded-xl hover:opacity-90 text-white text-xs font-semibold'>Sign Up</Link>
              </>
            }
          </div>
        </div>
        
        {showModal ? (
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="fixed inset-0 w-full h-full bg-black opacity-40" onClick={() => setShowModal(false)}></div>
            <div className="flex items-center min-h-screen px-4 py-8">
                <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                    <div className="mt-3 sm:flex">
                        <div className="flex items-center justify-center flex-none w-12 h-12 mx-auto bg-red-100 rounded-full">
                            <AiFillWarning className='w-7 h-7 text-red-700'/>
                        </div>
                        <div className="mt-2 text-center sm:ml-4 sm:text-left">
                            <h4 className="text-lg font-medium text-gray-800">Logout account ?</h4>
                            <p className="mt-2 text-[15px] leading-relaxed text-gray-500"> Lorem ipsum dolor sit amet,consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            <div className="items-center gap-2 mt-3 sm:flex" onClick={() => setShowModal(false)}>
                                <button className="w-full mt-2 p-2.5 flex-1 text-white bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2" onClick={handleLogout}>Logout</button>

                                <button className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2" onClick={() => setShowModal(false)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ): null}
      </>
)
}

export default Header