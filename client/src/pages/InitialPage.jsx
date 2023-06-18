import axios from "axios"
import { useEffect, useState } from "react"
import { GrPrevious, GrNext } from "react-icons/gr"
import Blog from "../components/Blog"
import Categories from "../components/Categories"
import Header from "../components/Header"
import Hero from '../components/Hero'

const InitialPage = () => {
  const [page, setPage] = useState(0)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    getPostByPage()
  }, [page])

  const getPostByPage = async () => {
    try {
      const res  = await axios.get(`http://localhost:5000/api/post?p=${page}`)
      setPosts(res.data.posts)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <header id="header" className="sticky top-0 z-50 bg-white flex items-center p-2 lg:px-6 shadow-md ">
          <Header/>
      </header>
     

      <section id="hero" className="bg-white py-12">
        <div className="w-full">
            <Hero/>
        </div>
      </section>
      
      <section id="categories" className="py-4 bg-gray-100 border-t border-b font-karla">
        <div className="w-full">
          <Categories/>
        </div>
      </section>

      <section id="blog" className="pt-24 bg-white">
        <div className="w-full lg:px-12 space-x-12">
            <Blog posts={posts}/>
        </div>
      </section>
      <section id="paginatinon">
        <div className="w-full border-2 mb-32">
          <div className="flex justify-center items-center p-4 gap-x-4 ">
            {page > 0 ? (
              <div className="p-4 border rounded-lg shadow-lg bg-gray-300 cursor-pointer" onClick={() => setPage(page - 1) }>
                <GrPrevious />
              </div>
            ) : null}
            <div className="p-4 border rounded-lg shadow-lg bg-gray-300 cursor-pointer" onClick={() => setPage(0)}>
              1
            </div>
            <div className="p-4 border rounded-lg shadow-lg bg-gray-300 cursor-pointer" onClick={() => setPage(1)}>
              2
            </div>
            <div className="p-4 border rounded-lg shadow-lg bg-gray-300 cursor-pointer" onClick={() => setPage(2)}>
              3
            </div>
            <div className="p-4 border rounded-lg shadow-lg bg-gray-300 cursor-pointer" onClick={() => setPage(page + 1 )}>
              <GrNext />
            </div>
          </div>
        </div>
      </section>

    </>
  )
}
export default InitialPage