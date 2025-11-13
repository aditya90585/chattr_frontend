import React from 'react'
import { useSelector } from 'react-redux'

const MessageBar = () => {
    const userData = useSelector(state => state?.auth?.userData)
    return (
        <div className={`h-screen md:block sm:block hidden w-[30%]  bg-white border-x`}>
            <h1 className='font-bold text-2xl mt-5 ml-5'>{userData?.username}</h1>
            <div className='ml-3 mt-2 w-full relative'>
            </div>
            <div className='w-full  h-[2px] bg-[#EFEFEF] my-2'></div>
            <div className='font-semibold ml-5 font-mono text-base'>
                Messages
            </div>


        </div>
    )
}

export default MessageBar