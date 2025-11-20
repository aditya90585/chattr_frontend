import React from 'react'
import { useState } from 'react'
import { GoHome } from "react-icons/go";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineExplore } from "react-icons/md";
import { IoChatbubbleOutline } from "react-icons/io5";
import { IoIosHeartEmpty } from "react-icons/io";
import { GoPlusCircle } from "react-icons/go";
import { IoPersonOutline } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";
import { LuLogIn } from "react-icons/lu";
import PostUploader from './PostUploader';
import Searchbar from './Searchbar';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../features/axioxInstance';
import { logout } from '../redux/Slices/authSlices';
import { toast } from 'react-toastify';


const Sidebar = ({ messageBarstate, setMessageBarstate }) => {
    const dispatch = useDispatch()
    const [searchBarstate, setSearchBarstate] = useState(false)
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()
    const authStatus = useSelector(state => state.auth.status)
    const currentUserData = useSelector(state => state.auth.userData)
    const [loading, setLoading] = useState(false)

    const homeFunction = () => {
        setMessageBarstate(false)
        navigate("/")
    }
    const searchFunction = () => {
        // setMessageBarstate(false)
        setSearchBarstate(!searchBarstate)
    }
    const exploreFunction = () => {
        setMessageBarstate(false)
        navigate("/explore")
    }
    const createFunction = () => {
        setOpen(true)
    }
    const profileFunction = () => {
        setMessageBarstate(false)
        navigate(`/profile/${currentUserData?.username}/posts`)
    }
    const messageFunction = () => {
        setSearchBarstate(false)
        setMessageBarstate(true)
        navigate(`/chat/messages`)
    }
    const notificationFunction = () => {
        // setMessageBarstate(false)

    }
    const LogoutFunction = async () => {
        setMessageBarstate(false)
        setLoading(true)
        try {
            const res = await axiosInstance.get("/api/v1/user/logout")
            if (res?.data?.success) {
                dispatch(logout())
                navigate("/login")
                toast.warn("logout successfully...")
            }
        } catch (error) {
            console.log(error?.message, "logout error")
            toast.error(error?.response?.data?.message || "logout failed")
        }
        finally {
            setLoading(false)
        }

    }
    const LogInFunction = ()=>{
     navigate("/login")
    }

    const pages = [
        {
            "logo": <GoHome />,
            "Text": "Home",
            "function_name": homeFunction,
            "in_mobile": true,
            "auth": true
        },
        {
            "logo": <IoSearchOutline />,
            "Text": "Search",
            "function_name": searchFunction,
            "in_mobile": true,
            "auth": true
        },
        {
            "logo": <MdOutlineExplore />,
            "Text": "Explore",
            "function_name": exploreFunction,
            "in_mobile": true,
            "auth": true
        },
        {
            "logo": <IoChatbubbleOutline />,
            "Text": "Messages",
            "function_name": messageFunction,
            "in_mobile": false,
            "auth": true
        },
        {
            "logo": <IoIosHeartEmpty />,
            "Text": "Notifications",
            "function_name": notificationFunction,
            "in_mobile": false,
            "auth": true
        },
        {
            "logo": <GoPlusCircle />,
            "Text": "Create",
            "function_name": createFunction,
            "in_mobile": true,
            "auth": true
        },
        {
            "logo": <IoPersonOutline />,
            "Text": "Profile",
            "function_name": profileFunction,
            "in_mobile": true,
            "auth": true
        },
        {
            "logo": <TbLogout2 />,
            "Text": "Logout",
            "function_name": LogoutFunction,
            "in_mobile": false,
            "auth": authStatus
        },
        {
            "logo": <LuLogIn />,
            "Text": "Log In",
            "function_name": LogInFunction,
            "in_mobile": false,
            "auth": !authStatus
        },
    ]



    return (
        <div className={` ${messageBarstate ? "md:w-[5%] sm:w-fit w-screen" : "md:w-[20%] sm:w-[20%] w-screen"} md:h-screen sm:h-screen h-12 bg-white md:static sm:static fixed bottom-[-1px]`}>
            <div className="flex h-full md:items-end flex-col sticky top-0">
                <div className='hidden md:flex sm:flex items-center justify-start w-full h-18'>
                    <img className='w-[60%] ml-3 object-cover' src="/images/chattrLogo.png" alt="LOGO" />
                </div>

                <ul className={`md:flex md:flex-col sm:flex-col justify-evenly text-2xl grid grid-cols-5 gap-y-1 px-1 w-full h-full`}>
                    {
                        pages.map((page) => {
                            if (page.auth) {
                                return <li key={page.Text} onClick={page.function_name} className={` ${page.in_mobile ? "flex" : "md:flex sm:flex hidden"} items-center gap-3 justify-center ${searchBarstate || messageBarstate ? messageBarstate ? "justify-center md:w-full" : "md:w-[20%] justify-center" : "md:w-full md:justify-start px-5"}  md:h-12 hover:bg-[#F2F2F2] hover:cursor-pointer hover:rounded-xl`}>
                                    <span className="text-3xl material-symbols-outlined">{page.logo}</span>
                                    <span className={`hidden  ${searchBarstate || messageBarstate ? "hidden" : "md:block"}`}>{page.Text}</span>
                                </li>
                            }
                        })
                    }
                    <Searchbar setSearchBarstate={setSearchBarstate} searchBarstate={searchBarstate} />
                    <PostUploader open={open} onClose={() => setOpen(false)} />
                </ul>
            </div>
        </div>
    )
}

export default Sidebar