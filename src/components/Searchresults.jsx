import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Searchresults = ({ user, resetSearch }) => {
    const navigate = useNavigate()
 

    const showprofile = () => {
        navigate(`/profile/${user?.username}/posts`)
        resetSearch()
    }

    // const showprofile = () => {
    //     navigate(`/profile/${userref.current?.username}/posts`)
    //     resetSearch()
    // }
    return (
        <div onClick={showprofile} className="item h-14 hover:bg-[#F2F2F2] items-center justify-between flex w-full cursor-pointer">
            <div className='items-center flex ml-4'>
                <div className="">
                    <img className="w-10 h-10 rounded-full object-cover"
                        src={user?.profile_pic_url}
                        alt="profile_picture" />
                </div>
                <div className="ml-2 text-sm h-8 flex flex-col justify-center">
                    <div className='font-semibold'>{user?.username}</div>
                    <div className="text-gray-500">{user?.fullname}</div>
                </div>
            </div>
        </div>
    )
}

export default Searchresults