import React from 'react'
import { NavLink } from 'react-router-dom'
import { IoIosHeartEmpty } from "react-icons/io";
import { IoChatbubbleOutline } from 'react-icons/io5';



const Navbar = () => {
  return (
    <div className='fixed top-0  h-12 w-full md:hidden sm:hidden block border-b-[1px]'>
      <nav className='bg-white h-full w-full flex justify-between '>
        <div className='flex items-center justify-start w-[30%] px-2'>
          <img className='ml-1 object-cover' src="/images/chattrLogo.png" alt="LOGO" />
        </div>
        <div className="links flex gap-x-1 h-full justify-between items-center w-[15%] mr-2 p-1">

          <NavLink className={"h-full w-[50%]"} to="/"><IoIosHeartEmpty className='h-full  w-full '/></NavLink>
          <NavLink className={"h-full w-[50%]"} to="/"><IoChatbubbleOutline className='h-full  w-full'/></NavLink>
        </div>
      </nav>
    </div>
  )
}

export default Navbar