import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link} from 'react-router-dom'

const Categories = () => {
  const [category, setCategory] = useState([])
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/categories')
        setCategory(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getCategories()
  }, [])
  return (
    <>
        <div className="gap-x-2 flex items-center justify-center">
          {category.map(category => (
            <Link to={`/?cat=${category.name}`} className='font-semibold text-sm uppercase text-black hover:bg-gray-400 rounded px-4 py-2 cursor-pointer' key={category.id}>{category.name}</Link>
          ))}
        </div>
    </>
  )
}

export default Categories