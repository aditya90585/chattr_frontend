import React, { useState, useRef } from 'react'
import { NavLink } from 'react-router-dom';
import { IoIosMore } from "react-icons/io";


const ShowLikesFollowersFollowing = ({ text, data, boxstate, setboxstate }) => {
    const modalRef = useRef();
    const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setboxstate(false)

        }
    };

    if (!boxstate) return null
    return (
        <div
            className="fixed inset-0 bg-black/50 flex justify-center items-center"
            onClick={handleClickOutside}
        >
            <div
                ref={modalRef}
                className={`bg-white rounded-lg h-[400px] w-[400px]  shadow-lg overflow-hidden`}
            >
                <h1 className='font-semibold text-2xl font-serif h-[10%] flex justify-center items-center'>{text}</h1>
                <div className='h-[1px] my-[6px] bg-black w-full'></div>
                {data?.length == 0 && <div className='w-full h-[90%] overflow-y-scroll flex justify-center items-center font-semibold'>no {text}</div>}
                {data?.map((user) => {
                    return <div key={user?._id} className='flex items-center  w-full cursor-default px-3 hover:bg-gray-300'>
                        <NavLink to={`/profile/${user?.username}/posts`} className='h-full w-[10%] flex items-start'>
                            <img className='aspect-square cursor-pointer w-8 h-8 rounded-full' src={user?.profile_pic_url} alt="profile_pic" />
                        </NavLink>
                        <div className=' w-[85%] h-fit flex  flex-col  justify-center'>
                            <NavLink to={`/profile/${user?.username}/posts`} className='text-black cursor-pointer font-semibold'>{user?.username}</NavLink>
                            <div className='w-full h-fit whitespace-normal break-words'>{user?.fullname}</div>
                        </div>
                        <div className='h-full w-[5%] flex items-start'>
                            <IoIosMore className='size-6 cursor-pointer' />
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default ShowLikesFollowersFollowing