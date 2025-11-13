import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { socket } from '../socket/socket'
import { toast } from 'react-toastify'
import axiosInstance from '../features/axioxInstance'
import { NavLink } from 'react-router-dom'
import { CgMoreO } from 'react-icons/cg'
import Button from './Button'
import { useForm } from 'react-hook-form'
import Input from './Input'
import { useSelector } from 'react-redux'
import Loader from './Loader2'

const Chatbox = () => {
    const params = useParams()

    const { register, handleSubmit, reset } = useForm()

    const currentuserData = useSelector(state => state.auth.userData)

    const [loading, setLoading] = useState(false)
    const [userInfo, setUserInfo] = useState(null)
    const [conversation_id, setConversation_id] = useState("")
    const [messages, setMessages] = useState([])

    useEffect(() => {
        socket.emit("direct:join", { peerId: params?.userId })
        socket.on("joined", (conversationId) => {
            console.log("conversation Id :", conversationId)
            setConversation_id(conversationId?.conversationId)
        })
        return () => {
            socket.off("joined")
        }
    }, [])

    useEffect(() => {
        setLoading(true)
        try {
            if (conversation_id) {
                async function getMessageRes() {
                    const res = await axiosInstance.get("/api/v1/chat/convo/" + conversation_id)
                    if (!res.data.conversation) {
                        toast.error("could not find conversation or messages")
                    }
                    setMessages(res?.data?.conversation.messages)
                }
                getMessageRes()

            }
        } catch (error) {
            console.log(error?.message, "chat error")
            toast.error(error?.response?.data?.message || "error in finding conversation or messages")
        }
        finally {
            setLoading(false)
        }
    }, [conversation_id])





    useEffect(() => {
        async function showuser() {
            try {
                if (params?.userId) {
                    setLoading(true)

                    const response = await axiosInstance.get("/api/v1/user/getprofile/" + params?.userId)

                    setUserInfo(response?.data?.user)
                    setLoading(false)
                }
            } catch (error) {
                console.log(error)
                toast.error(error?.response?.data?.message || "semething went wrong...")
                setLoading(false)
            }
        }
        showuser()
    }, [params?.userId])

    const sendMessage = async (data) => {

        socket.emit("message", ({ peerId: params?.userId, conversationId: conversation_id, message: data.message }))
        reset()
    }

    useEffect(() => {

        const handleMessage = (data) => {
            console.log(data.message)
            setMessages((prev) => [...prev, data.message])
        }

        socket.on("message", handleMessage)
        return () => {
            socket.off("message", handleMessage)
        }
    }, [])




    if (loading) return <Loader height={"full"} width={"full"} />

    return (
        <div className='md:w-[70%] sm:w-[70%] w-[100%]  h-screen md:pb-0 sm:pb-0 pb-12'>
            <div className='w-full  h-[10%] -z-10 bg-white sticky top-0 border-b border-gray-400  flex justify-between'>
                <NavLink to={`/profile/${userInfo?.username}/posts`} className='h-full cursor-pointer ml-5 flex items-center'>
                    <img className='aspect-square h-[70%] object-cover rounded-full' src={userInfo?.profile_pic_url} alt="profile_pic" />
                    <div className='ml-2'>
                        {userInfo?.username}
                    </div>
                </NavLink>
                <div className='h-full  cursor-pointer flex items-center mr-5'>
                    <CgMoreO className='size-6 cursor-pointer' />
                </div>
            </div>
            <div className='h-[85%] overflow-y-scroll overflow-x-hidden'>
                <div className='h-[40%] pt-15 w-full flex flex-col justify-center items-center'>
                    <img className='aspect-square h-[50%] object-cover rounded-full' src={userInfo?.profile_pic_url} alt="profile_pic" />
                    <div className='font-bold text-xl my-1'>{userInfo?.username}</div>
                    <div className='text-sm my-1'>{userInfo?.fullname}</div>
                    <NavLink to={`/profile/${userInfo?.username}/posts`} className=' px-2 py-1 rounded text-gray-800 hover:text-gray-400 font-semibold font-mono border'>View Profile</NavLink>
                </div>
                <div className='h-[60%] gap-y-2 px-6 flex flex-col mt-5 pb-8'>
                    {messages?.map((message) => {
                        if (message?.sender == currentuserData?._id) {
                            return <div className='flex h-fit justify-end'>
                                <div className='  justify-end p-1 px-2 rounded-2xl whitespace-pre-wrap break-words  max-w-[45%] bg-fuchsia-700'>
                                    {message?.message}
                                </div>
                            </div>
                        }
                        else {
                            return <div className='flex  h-fit'>
                                <div className=' p-1 px-2 rounded-2xl whitespace-pre-wrap break-words max-w-[45%]  bg-fuchsia-500'>
                                    {message?.message}
                                </div>
                            </div>
                        }

                    })}
                </div>
            </div>

            <div className='w-full sm:h-[5%] md:h-[5%] h-[5%] border-[1px] border-gray-400'>
                <form className='flex  h-full' onSubmit={handleSubmit(sendMessage)}>
                    <Input parentClass='w-[80%]' type="text"
                        className="w-full  h-full ml-2 pl-2  text-base rounded focus:outline-none focus:border-none"
                        placeholder="Type a message..."
                        {...register("message", {
                            required: true
                        })}
                    />
                    <Button type='submit'
                        className='w-[20%] text-[#2D3DD2] font-bold flex items-center justify-center cursor-pointer' >Send</Button>

                </form>
            </div>

        </div>
    )
}

export default Chatbox