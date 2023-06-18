import { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import {BsFillPlusSquareFill} from 'react-icons/bs'
import { useSelector } from 'react-redux'
import axios from 'axios'
const Write = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [file, setFile] = useState(null)
    const {user} =  useSelector(state => state.auth)
    const navigate = useNavigate()
    const [cat, getCat] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault()
        const newPost = {
            username : user.username,
            title , 
            categories : cat,
            desc : description 
        }
        if(file) {
            const data = new FormData()
            const fileName = Date.now() + file.name
            data.append('name', fileName)
            data.append('file', file)
            newPost.photo = fileName
            try {
                await axios.post(`http://localhost:5000/api/upload`, data)
            } catch (error) { 
                console.log(error)
            }
        }

        try {
            const res = await axios.post(`http://localhost:5000/api/post`, newPost)
            navigate(`/post/${res.data._id}`)
        } catch (error) { 
            console.log(error.response)
        }
    }
  return (
    <div className='w-full h-screen bg-slate-100 pt-6'>
        <form onSubmit={handleSubmit}>
            <div className="max-w-5xl mx-auto rounded-lg shadow-lg bg-white py-8 px-10">
                <input type="file" name="fileInput" id="fileInput"  onChange={(e) => setFile(e.target.files[0])}/>
                {file  && (<img src={URL.createObjectURL(file)} className={'rounded-lg h-72 '}></img>)}
                <div className="flex justify-end mt-4">
                    <button type='submit' className='px-4 py-2 bg-teal-500 shadow-md text-white text-sm font-medium rounded-full'>Publish</button>
                </div>
                <div className='flex items-center mt-8 mb-4 bg-slate-300 rounded-lg overflow-hidden'>
                    <label htmlFor="title"><BsFillPlusSquareFill className='text-slate-600 ml-4'/></label>
                    <input type="text" id='title' placeholder='Title' className='placeholder-slate-500 outline-none bg-slate-300 w-full text-2xl py-2 px-4' autoFocus onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div className='py-12 text-slate-700 text-sm font-semibold'>
                    <label htmlFor="cat" >Select Categories :</label>
                    <select name="cat" className='outline-none ml-4 py-2 px-10 bg-slate-300 rounded-lg' id='cat' onChange={(e) => getCat(e.target.value)}>
                        <option hidden ></option>
                        <option value="music">Music</option>
                        <option value="life">Life</option>
                        <option value="tech">Tech</option>
                    </select>
                </div>
                <div className='bg-slate-300 rounded-lg p-4'>
                    <textarea type="text" placeholder='Description' className='placeholder-slate-500 outline-none bg-slate-300 pl-4 w-full h-44 resize-none' onChange={(e) => setDescription(e.target.value)}/>
                </div>
            </div>
        </form>
    </div>
    
  )
}

export default Write