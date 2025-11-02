import React from 'react'

const Posttype = ({ createSelectorState, setOpen }) => {
    return (
        <div className={`${createSelectorState ? "flex" : "hidden"} border items-center justify-around flex-col  border-gray-900 md:rounded-xl sm:rounded-xl rounded-md bg-white absolute md:h-25 sm:h-25 h-18 md:mt-6 sm:mt-6 mt-0 md:top-7/9 -top-18 md:left-0 sm:left-0 left-[50%] md:w-[96%] sm:w-[96%] w-35 md:text-2xl sm:text-2xl text-base `}>
            <div onClick={() => setOpen(true)} className='bg-white hover:bg-gray-100 cursor-pointer w-full h-[48%] rounded-tl-xl rounded-tr-xl flex justify-center items-center'>
                Post
            </div>
            <div className='bg-gray-300 w-[90%] h-[1px]'></div>
            <div className='bg-white hover:bg-gray-100 cursor-pointer w-full h-[48%] rounded-bl-xl rounded-br-xl flex justify-center items-center'>
                Reel
            </div>
        </div>
    )
}

export default Posttype