import React from 'react'
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

const NoChats = () => {
    return (
        <div className='w-full h-screen md:block sm:block hidden'>
            <div className='h-full w-full flex flex-col justify-center items-center'>
                <div className='flex items-center justify-center border-4 rounded-full mx-2 px-2 hover:animate-bounce animate-pulse'>
                   <IoChatbubbleEllipsesOutline className='size-30 p-5'/>
                </div>
                <div className='flex items-center justify-start h-[10%] w-[15%] px-2'>
                    <img className='ml-1 object-cover' src="/images/chattrLogo.png" alt="LOGO" />
                </div>
                <div className='font-semibold text-xl text-gray-400'>Start chat with Chattr now...</div>
            </div>
        </div>
    )
}

export default NoChats