import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {IoLogoApple, IoLogoBitcoin, IoLogoGithub, IoLogoYoutube} from 'react-icons/io'
import { Link, useLocation } from 'react-router-dom'

const Blog = ({posts}) => { 
    const [Posts, setPost] = useState([])
    const { search } = useLocation()

    useEffect(() => {
        if(posts) {
            setPost(posts)
        }else{
            const getPost = async () => {
                try {
                    const res = await axios.get('http://localhost:5000/api/post' + search )
                    setPost(res.data)
                } catch (error) {
                    console.log(error)
                }
            }
            getPost()
        }
    }, [search, posts])
    
    const PF = 'http://localhost:5000/images/'

    return (
        <div className='lg:flex'>
          <div className="flex flex-wrap">
           {Posts.map(post => (
                <div className="w-full flex-grow">
                    <div key={post._id} className="mb-10 bg-white rounded-xl shadow-lg overflow-hidden">
                        {post.photo && (
                            <img src={PF + post.photo} alt="" className='w-full h-250 object-cover hover:scale-105 transition' />
                        )}
                        <div className="py-8 px-6">
                            {post.categories.map(category => (
                                <h3>{category.name}</h3>
                            ))}
                            <h3 className='font-semibold text-xl text-slate-900 truncate hover:text-sky-500 mb-3'>{post.title}</h3>
                            <span className='font-bold text-slate-500 text-sm'>{new Date(post.createdAt).toDateString()}</span>
                            <p className='text-slate-700 text-base font-medium mb-6'>{post.desc}</p>
                            <Link to={`/post/${post._id}`}>
                                <button href="" className='font-medium text-sm text-white px-4 py-2 rounded-lg bg-sky-500 hover:opacity-80'>Baca Selengkapnya..</button>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
            </div>
            <div className="w-full md:w-1/3 ml-6">
                <div className="mb-10 p-5 bg-white rounded-xl shadow-lg overflow-hidden border">
                    <div className='py-2 mb-2'>
                        <h3 className='font-semibold text-xl text-slate-900  mb-3'>About</h3>
                    </div>
                    <p className='text-slate-700 text-base font-sm mb-10'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni beatae, omnis cum debitis rem labore nobis vitae perferendis vero minus.</p>
                    <button className='w-full py-3 bg-sky-500 font-semibold text-white rounded'>GET TO KNOW US</button>
                    
                    <div className='text-center py-2 mb-5'>
                        <h3 className='font-semibold text-xl text-slate-900  mb-3'>Follow Us</h3>
                    </div>
                    <div className='w-full px-8 mb-10'>
                        <div className="flex items-center justify-center gap-10 ">
                            <a href="https://youtube.com" target={'_blank'} className="text-xl hover:text-sky-500 w-9 h-9 text-slate-700 hover:scale-105 duration-500" ><IoLogoYoutube/></a>
                            <a href="https://github.com" target={'_blank'} className="text-xl hover:text-sky-500 w-9 h-9 text-slate-700 hover:scale-105 duration-500" ><IoLogoGithub/></a>
                            <a href="https://apple.com" target={'_blank'} className="text-xl hover:text-sky-500 w-9 h-9 text-slate-700 hover:scale-105 duration-500" ><IoLogoApple/></a>
                            <a href="https://bitcoin.com" target={'_blank'} className="text-xl hover:text-sky-500 w-9 h-9 text-slate-700 hover:scale-105 duration-500" ><IoLogoBitcoin/></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Blog