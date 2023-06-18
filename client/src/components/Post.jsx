import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {IoMdRemoveCircleOutline} from 'react-icons/io'
import {AiFillEdit, AiFillWarning} from 'react-icons/ai'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {GrFormPreviousLink} from 'react-icons/gr'
import { useSelector } from 'react-redux'


const Blog = () => {
    const [Posts, setPost] = useState([])
    const {id} = useParams()
    const navigate =  useNavigate()
    const {user} = useSelector(state => state.auth)
    const [showUpdate, setShowUpdate] = useState(false)
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')

    useEffect(() => {
        getPost()
    }, [id])

    const getPost = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/post/${id}`)
            setPost(res.data)
            setTitle(res.data.title)
            setDesc(res.data.desc)
        } catch (error) {
            console.log(error)
        }
    }
    const deletePost = async (id) => {
       try {
        await axios.delete(`http://localhost:5000/api/post/${id}`,{data : {username : Posts.username}})
        navigate('/')
       } catch (error) {
        console.log(error)
       }
    }
    const PF = 'http://localhost:5000/images/'

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            await axios.put(`http://localhost:5000/api/post/${Posts._id}`, {
                username : user.username,
                title, 
                desc 
            })
            setShowUpdate(false)
            getPost()
        } catch (error) {
            console.log(error)
        }
    }
    return (
    <div className='container'>
        <Link to={'/'}>
            <button className='px-6 py-2 rounded-lg shadow-lg bg-sky-500 active:bg-sky-600 text-white font-semibold text-xs mt-4 ml-4 flex items-center'>Back to main page</button>
        </Link>
        <div className='max-w-8xl mx-auto md:pt-10 pt-6'>
          <div className="flex lg:mx-8">
                <div key={Posts._id} className="w-full px-4 ">
                    <div className="mb-10 bg-white rounded-xl shadow-lg overflow-hidden">
                        {Posts.photo && (
                            <img src={PF + Posts.photo} alt="" className='w-full h-80 object-cover' />
                        )}
                        <div className='flex justify-between'>
                            <Link to={`/?user=${Posts.username}`}>
                                <h2 className='text-slate-500 font-semibold text-sm p-2'>Author : {Posts.username}</h2>
                            </Link>
                            {Posts.username === user?.username && (
                                <div className='space-x-4 mt-2'>
                                    <button onClick={() => deletePost(Posts._id)} className='py-2 px-4 rounded-xl shadow-xl bg-red-500'><IoMdRemoveCircleOutline/></button>
                                    <button className='py-2 px-4 rounded-xl shadow-xl bg-teal-500' onClick={() => setShowUpdate(true)}><AiFillEdit/></button>
                                </div>
                            )}
                        </div>
                        <div className="py-4 px-6">
                            <h3 className='font-semibold text-center text-xl text-slate-900 truncate'>{Posts.title}</h3>
                            <span className='font-bold text-slate-500 text-sm'>{new Date(Posts.createdAt).toDateString()}</span>
                            <p className='text-slate-700 text-base font-medium mb-6'>{Posts.desc}</p>
                         
                        </div>
                    </div>
                </div>
          </div>
        </div>
       {showUpdate ? (
         <div className="fixed inset-0 z-10 ">
            <div className="fixed inset-0 bg-black opacity-30" onClick={() => setShowUpdate(false)}></div>
            <div className="flex items-center min-h-screen ">
                <div className="relative w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-4">
                    <div className="mt-3">
                        <div className="flex flex-col mt-2">
                            <form onSubmit={handleUpdate}>
                                <h3 className="text-2xl font-medium text-gray-800 text-center">Update post</h3>
                                <div className="mt-2">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" name="title" id="title" className='w-full outline-none bg-slate-200 rounded-md px-4 py-2' value={title} onChange={(e) => setTitle(e.target.value)}/>
                                    <label htmlFor="desc">Description</label>
                                    <textarea type="text" name="desc" id="desc" className='w-full outline-none bg-slate-200 rounded-md px-4 py-2 h-40' value={desc} onChange={(e) => setDesc(e.target.value)}/>
                                </div>
                                <div className="flex justify-end items-center gap-x-8 py-2">
                                    <button type='submit' className='bg-sky-500 px-10 py-2 text-sm rounded-md shadow-lg text-white '>Submit</button>
                                    <button className='bg-red-500 px-10 py-2 text-sm rounded-md shadow-lg text-white ' onClick={() => setShowUpdate(false)}>Close</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       ) : null}
    </div>
  )
}

export default Blog