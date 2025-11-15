import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import useGetAllPosts from '../hooks/useGetAllPosts';
import Navbar from './Navbar';
import { useState } from 'react';

const Home = () => {
  const userData = useSelector(state => state.auth.userData)
 const [messageBarstate, setMessageBarstate] = useState(false)

  useGetAllPosts()
  return (
    <div className='' >
      <Navbar/>
      <div className="flex md:flex-row sm:flex-row flex-col-reverse w-full">
        <Sidebar messageBarstate={messageBarstate} setMessageBarstate={setMessageBarstate} />
        <div className="second h-screen md:w-[80%] w-full sm:border-x-[1px] md:border-x-[1px] border-x-gray-600">
          <Outlet />
        </div >
      </div >
    </div >

  )
}

export default Home