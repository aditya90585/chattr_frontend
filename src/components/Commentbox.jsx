import React from 'react'
import { IoIosMore } from 'react-icons/io'
import { NavLink } from 'react-router-dom'

const Commentbox = ({ comment }) => {
    return (
        <div key={comment?._id} className='flex items-center  w-full cursor-default'>
            <NavLink to={`/profile/${comment?.author?.username}/posts`} className='h-full w-[10%] flex items-start'>
                <img className='aspect-square object-cover cursor-pointer w-8 h-8 rounded-full' src={comment?.author?.profile_pic_url} alt="profile_pic" />
            </NavLink>
            <div className=' w-[85%] h-fit flex  flex-col  justify-center'>
                <NavLink to={`/profile/${comment?.author?.username}/posts`} className='text-black cursor-pointer font-semibold'>{comment?.author?.username}</NavLink>
                <div className='w-full h-fit whitespace-normal break-words'>{comment?.text}</div>
            </div>
            <div className='h-full w-[5%] flex items-start'>
                <IoIosMore className='size-6 cursor-pointer' />
            </div>
        </div>
    )
}

export default Commentbox