import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axiosInstance from '../features/axioxInstance'
import MessageSearchResult from './MessageSearchResult'
import Loader from './Loader2'
import { toast } from 'react-toastify'
import { Outlet } from 'react-router-dom'

const MessageBar = ({ inMobile }) => {
    const userData = useSelector(state => state?.auth?.userData)
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState(null)

    useEffect(() => {

        try {
            async function getprevious_chats() {
                setLoading(true)
                const res = await axiosInstance.get("/api/v1/chat/prevchats")
                if (res?.data?.success) {
                    setUsers(res?.data?.data)
                    setLoading(false)
                }
            }
            getprevious_chats()

        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message || "cannot get previous chats")
            setLoading(false)
        }

    }, [])


    if (loading) return <Loader height={"screen"} className={`${inMobile ? "" : "hidden"}`} width={`md:w-[30%] sm:w-[30%] ${inMobile ? "w-[100%]" : ""}`} />
    return (
        <div className={`h-screen shrink-0 ${inMobile ? "" : "md:block sm:block hidden"} md:w-[30%] sm:w-[30%] w-[100%] bg-white border-x`}>
            <h1 className='font-bold text-2xl mt-5 ml-5'>{userData?.username}</h1>
            <div className='ml-3 mt-2 w-full relative'>
            </div>
            <div className='w-full  h-[2px] bg-[#EFEFEF] my-2'></div>
            <div className='font-semibold ml-5 mb-3 font-mono text-base'>
                Messages
            </div>
            {(!users) && <div className='mx-auto w-fit text-xl text-[#646464] '>no previous chats found</div>}
            <div className='overflow-y-scroll [&::-webkit-scrollbar]:hidden'>
                {users?.map((user) => {
                    return <MessageSearchResult key={user[0]?._id} user={user[0]} />
                })}
            </div>
        </div>
    )
}

export default MessageBar