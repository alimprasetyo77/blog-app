import axios from 'axios'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from './Header'
import {IoMdNotificationsOutline} from 'react-icons/io'
import { updateDate, UpdateUser  } from '../features/AuthSlice'
const Profile = () => {
    const [file, setFile] = useState(null)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {user} = useSelector((state) => state.auth)
    const [success, setSuccess] = useState(false)
    const dispatch = useDispatch()

    const handleUpdate = async (e) => {
        e.preventDefault()
            const {_id} = user
            let profilePic
        if(file) {
            const data = new FormData()
            const filename = Date.now() + file.name
            data.append('name', filename ) 
            data.append('file', file)  
            profilePic = filename
            try {
                await axios.post('http://localhost:5000/api/upload', data)
            } catch (error) {
                console.log(error)
            }
        }
        try {
            // dispatch(updateDate({_id, username , email, password, profilePic }))
            dispatch(UpdateUser({_id, username , email, password, profilePic }))
            // setSuccess(true)
        } catch (error) {
            console.log(error)
        }
    }
    
  return (
    <div>
        <header id="header" className="sticky top-0 z-50 bg-white flex items-center p-2 lg:px-6 shadow-md">
            <Header/>
        </header>
        {success && (
            <div className="w-full flex items-center h-8 bg-sky-500 gap-x-2">
                <IoMdNotificationsOutline className='text-white'/><span className='text-sm text-white font-semibold '>Profile has been updated..!</span>
            </div>
        )}
        <div className="max-w-4xl rounded-lg shadow-lg mx-auto p-12 ">
            <form onSubmit={handleUpdate}>
                <div className="flex justify-between items-center">
                    <h2 className='text-2xl font-semibold text-slate-700'>Update your Account</h2>
                    <p className='text-red-500 underline text-sm'>Delete Account!</p>
                </div>
                <div className='mt-4'>
                    <h3 className='font-mono text-sm font-semibold'>Profile Picture</h3>
                    {file && (<img src={URL.createObjectURL(file)} alt="profile-img" width={200} className={'rounded-sm shadow-lg'}/>)}
                    <input type="file" name="PicProfile" className='text-xs py-4'  onChange={(e) => setFile(e.target.files[0])}/>
                </div>
                <div className='mt-2'>
                    <label htmlFor='username' className='font-mono text-sm font-semibold'>Username</label>
                    <input type="text" name="username" id="username" className='w-full bg-slate-200 outline-none text-slate-700 text-sm p-2 rounded-md shadow-lg' onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className='mt-2'>
                    <label htmlFor='email' className='font-mono text-sm font-semibold'>Email</label>
                    <input type="email" name="email" id="email" className='w-full bg-slate-200 outline-none text-slate-700 text-sm p-2 rounded-md shadow-lg' onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='mt-2'>
                    <label htmlFor='password' className='font-mono text-sm font-semibold'>Password</label>
                    <input type="password" name="password" id="password" className='w-full bg-slate-200 outline-none text-slate-700 text-sm p-2 rounded-md shadow-lg' onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className='flex items-center justify-end pt-12'>
                    <button type='submit' className='px-8 py-2 text-xs font-semibold bg-teal-500 text-white rounded-lg shadow-md'>Submit</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Profile