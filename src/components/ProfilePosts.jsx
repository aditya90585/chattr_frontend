import React, { useRef, useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import Loader from './Loader2'
import { get, set } from 'react-hook-form'
import ShowPost from './ShowPost'

const ProfilePosts = () => {
  let userData = useOutletContext().userData
  const [showpoststate, setShowpoststate] = useState(false)
  const [currentPost, setCurrentPost] = useState({})
  
  const changeCurrentPost = (post) => {
    setCurrentPost(post)
    setShowpoststate(true)
  }
  if (!userData) return <Loader height={"full"} width={"full"} />

  return (
    <div className='md:w-[75%] sm:w-[75%] w-full grid grid-cols-3 gap-x-[1px] gap-y-[1px] mt-1 pb-12'>
      {userData?.posts?.length == 0 && <div className=' mx-auto mt-10 font-bold text-2xl'>no posts yet</div>}
      {userData?.posts?.map((post, index) => {
        return <div onClick={() => changeCurrentPost(post)} key={post?._id} className='w-full group md:h-80 sm:h-80 h-40 cursor-pointer grid grid-cols-1 grid-rows-1'>

          <img className='-z-40 w-full h-full object-cover row-start-1 col-start-1' src={post?.imageUrl} alt="" />

          <div className="-z-30 w-full h-full row-start-1 col-start-1  bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
            <div className="flex items-center space-x-4 text-white text-lg font-semibold">
              <div className="flex items-center space-x-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                  <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 18.343l-6.828-6.829a4 4 0 010-5.656z" />
                </svg>
                <span>{post?.like?.length}</span>
              </div>
              <div className="flex items-center space-x-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                  <path d="M18 10c0 3.866-3.582 7-8 7a8.96 8.96 0 01-4.917-1.472L2 16l.746-3.07A7.963 7.963 0 012 10c0-3.866 3.582-7 8-7s8 3.134 8 7z" />
                </svg>
                <span>{post?.comments?.length}</span>
              </div>
            </div>
          </div>

        </div>
      })}

      <ShowPost showpoststate={showpoststate} setShowpoststate={setShowpoststate} post={currentPost} />
    </div>
  )
}

export default ProfilePosts