import React from 'react'
import { useState } from 'react'
import { GoHome } from "react-icons/go";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineExplore } from "react-icons/md";
import { FaPlayCircle } from "react-icons/fa";
import { IoChatbubbleOutline } from "react-icons/io5";
import { IoIosHeartEmpty } from "react-icons/io";
import { GoPlusCircle } from "react-icons/go";
import { IoPersonOutline } from "react-icons/io5";
import { CgMoreO } from "react-icons/cg";
import PostUploader from './PostUploader';
import Searchbar from './Searchbar';
import Posttype from './Posttype';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Sidebar = () => {
    const [searchBarstate, setSearchBarstate] = useState(false)
    const [createSelectorState, setCreateSelectorState] = useState(false)
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()
    const currentUserData = useSelector(state => state.auth.userData)


    const homeFunction = () => {
        navigate("/")
    }
    const searchFunction = () => {
        setSearchBarstate(!searchBarstate)
    }
    const exploreFunction = () => {
        navigate("/explore")
    }
    const createFunction = () => {
        setCreateSelectorState(!createSelectorState)
    }
    const profileFunction = () => {
        navigate(`/profile/${currentUserData?.username}/posts`)
    }
    const reelsFunction = () => {

    }
    const messageFunction = () => {

    }
    const notificationFunction = () => {

    }
    const moreFunction = () => {

    }

    const pages = [
        {
            "logo": <GoHome />,
            "Text": "Home",
            "function_name": homeFunction,
            "in_mobile":true
        },
        {
            "logo": <IoSearchOutline />,
            "Text": "Search",
            "function_name": searchFunction,
             "in_mobile":true
        },
        {
            "logo": <MdOutlineExplore />,
            "Text": "Explore",
            "function_name": exploreFunction,
             "in_mobile":true
        },
        {
            "logo": <FaPlayCircle />,
            "Text": "Reels",
            "function_name": reelsFunction,
             "in_mobile":true
        },
        {
            "logo": <IoChatbubbleOutline />,
            "Text": "Messages",
            "function_name": messageFunction,
             "in_mobile":false
        },
        {
            "logo": <IoIosHeartEmpty />,
            "Text": "Notifications",
            "function_name": notificationFunction,
             "in_mobile":false
        },
        {
            "logo": <GoPlusCircle />,
            "Text": "Create",
            "function_name": createFunction,
             "in_mobile":true
        },
        {
            "logo": <IoPersonOutline />,
            "Text": "Profile",
            "function_name": profileFunction,
             "in_mobile":true
        },
        {
            "logo": <CgMoreO />,
            "Text": "More",
            "function_name": moreFunction,
             "in_mobile":false
        },
    ]



    return (
        <div className="md:w-[20%] sm:w-[20%] w-screen md:h-screen sm:h-screen h-12 bg-white md:static sm:static fixed bottom-[-1px]">
            <div className="flex h-full md:items-end flex-col sticky top-0">
                <div className='hidden md:flex sm:flex items-center justify-start w-full h-18'>
                    <img className='w-[60%] ml-3 object-cover' src="/images/chattrLogo.png" alt="LOGO" />
                </div>

                <ul className={`flex md:flex-col sm:flex-col justify-evenly text-2xl gap-y-1 px-1 w-full h-full`}>
                    {
                        pages.map((page) => {
                            return <li key={page.Text} onClick={page.function_name} className={` ${page.in_mobile?"flex":"md:flex sm:flex hidden"} items-center gap-3 justify-center  ${searchBarstate ? "md:w-[20%] justify-center" : "md:w-full md:justify-start"} md:h-12 hover:bg-[#F2F2F2] hover:cursor-pointer px-5 hover:rounded-xl`}>
                                <span className="text-3xl material-symbols-outlined">{page.logo}</span>
                                <span className={`hidden  ${searchBarstate ? "hidden" : "md:block"}`}>{page.Text}</span>
                            </li>
                        })
                    }
                    <Searchbar setSearchBarstate={setSearchBarstate} searchBarstate={searchBarstate} />
                    <Posttype setOpen={setOpen} createSelectorState={createSelectorState} />
                    <PostUploader open={open} onClose={() => setOpen(false)} />
                </ul>
            </div>
        </div>
    )
}

export default Sidebar