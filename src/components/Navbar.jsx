import React from 'react'
import { NavLink } from 'react-router-dom'
import { IoIosHeartEmpty } from "react-icons/io";
import { IoChatbubbleOutline } from 'react-icons/io5';



const Navbar = () => {
  return (
    <div className='fixed top-0  h-10 w-full md:hidden sm:hidden block border-b-[1px]'>
      <nav className='bg-white h-full w-full flex justify-between '>
        <div className='flex items-center justify-start w-[30%] p-2'>
          <img className='ml-1 object-cover' src="/images/chattrLogo.png" alt="LOGO" />
        </div>
        <div className="links flex h-full justify-between items-center w-[10%] mr-2">

          <NavLink to="/"><IoIosHeartEmpty/></NavLink>
          <NavLink to="/"><IoChatbubbleOutline/></NavLink>
        </div>
      </nav>
    </div>
  )
}

export default Navbar