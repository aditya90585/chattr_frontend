import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { socket } from '../socket/socket'
import { toast } from 'react-toastify'
import axiosInstance from '../features/axioxInstance'
import { NavLink } from 'react-router-dom'
import { CgMoreO } from 'react-icons/cg'
import Button from './Button'
import { useForm, Controller } from 'react-hook-form'
import Input from './Input'
import { useSelector } from 'react-redux'
import Loader from './Loader2'
import MessageBar from './MessageBar'
import { IoIosArrowBack } from 'react-icons/io'

const Chatbox = () => {
    const params = useParams()
    const navigate = useNavigate()
    const messagesRef = useRef(null)
    const bottomRef = useRef(null);
    const InputRef = useRef(null)

    const scrollToBottom = () => {
        if (bottomRef.current) {
            bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    };

    const { register, handleSubmit, reset, control } = useForm()

    const currentuserData = useSelector(state => state.auth.userData)

    const [loading, setLoading] = useState(false)
    const [userInfo, setUserInfo] = useState(null)
    const [conversation_id, setConversation_id] = useState("")
    const [messages, setMessages] = useState([])

    useLayoutEffect(() => {

        bottomRef.current?.scrollIntoView({ behavior: "auto" });
    }, [messages]);

    useEffect(() => {

        setTimeout(() => {
            InputRef.current?.focus()
        }, 100);

    }, [])
    useEffect(() => {
        InputRef.current?.focus()
    }, [messages])
    setInterval(() => {
        InputRef.current?.focus()
    }, 10);


    useEffect(() => {
        socket.emit("direct:join", { peerId: params?.userId })
        socket.on("joined", (conversationId) => {
            console.log("conversation Id :", conversationId)
            setConversation_id(conversationId?.conversationId)
        })
        return () => {
            socket.off("joined")
        }
    }, [params?.userId])

    useEffect(() => {

        try {
            if (conversation_id) {
                async function getMessageRes() {
                    setLoading(true)
                    const res = await axiosInstance.get("/api/v1/chat/convo/" + conversation_id)
                    if (!res.data.conversation) {
                        toast.error("could not find conversation or messages")
                    }
                    setMessages(res?.data?.conversation.messages)
                    setLoading(false)
                    scrollToBottom()
                }
                getMessageRes()

            }
        } catch (error) {
            console.log(error?.message, "chat error")
            toast.error(error?.response?.data?.message || "error in finding conversation or messages")
            setLoading(false)
        }

    }, [conversation_id, params?.userId])

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
            finally {
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
            setMessages((prev) => [...prev, data.message])
            scrollToBottom()
        }

        socket.on("message", handleMessage)
        return () => {
            socket.off("message", handleMessage)
        }
    }, [params?.userId])

    if (loading || !currentuserData?._id) return <Loader height={"screen"} width={" w-[100%]"} />

    return (
        <div className='  w-[100%]  h-screen  flex'>
            <MessageBar inMobile={false} />
            <div className='md:w-[70%] sm:w-[70%] w-[100%] h-screen md:pb-0 sm:pb-0 pb-12 '>
                <div className=' w-[100%]  md:h-[10%] sm:h-[10%] h-[6%]  sticky bg-white top-0 border-b border-gray-400  flex justify-between'>
                    <div to={`/profile/${userInfo?.username}/posts`} className='h-full  cursor-pointer md:ml-5 sm:ml-5 ml-0 flex items-center'>
                        <Button
                            onClick={() => navigate("/chat/messages")}
                            className="text-black  right-5 top-5 md:hidden sm:hidden block hover:text-gray-200 mr-1 rounded-full cursor-pointer"
                        >
                            <IoIosArrowBack className='size-8' />
                        </Button>
                        <img onClick={() => navigate(`/profile/${userInfo?.username}/posts`)} className='aspect-square h-[70%] object-cover rounded-full' src={userInfo?.profile_pic_url} alt="profile_pic" />
                        <div onClick={() => navigate(`/profile/${userInfo?.username}/posts`)} className='ml-2'>
                            {userInfo?.username}
                        </div>
                    </div>
                    <div className='h-full  cursor-pointer flex items-center mr-5'>
                        <CgMoreO className='size-6 cursor-pointer' />
                    </div>
                </div>
                <div ref={messagesRef} className='md:h-[85%] pb-1  sm:h-[85%] h-[88%] w-[100%] -z-20 overflow-y-scroll overflow-x-hidden'>
                    <div className='h-[40%] pt-15 w-full flex flex-col justify-center items-center'>
                        <img className='aspect-square h-[50%] object-cover rounded-full' src={userInfo?.profile_pic_url} alt="profile_pic" />
                        <div className='font-bold text-xl my-1'>{userInfo?.username}</div>
                        <div className='text-sm my-1'>{userInfo?.fullname}</div>
                        <NavLink to={`/profile/${userInfo?.username}/posts`} className=' px-2 py-1 rounded text-gray-800 hover:text-gray-400 font-semibold font-mono border'>View Profile</NavLink>
                    </div>
                    <ul className=' gap-y-2 px-6 flex flex-col mt-5   text-white'>
                        {messages?.map((message) => {
                            if (message?.sender == currentuserData?._id) {
                                return <li key={message?._id} className='flex h-fit justify-end'>
                                    <div className='  justify-end p-1 px-2 rounded-2xl whitespace-pre-wrap break-words max-w-[45%] bg-fuchsia-700'>
                                        {message?.message}
                                    </div>
                                </li>
                            }
                            else {
                                return <li key={message?._id} className='flex  h-fit'>
                                    <div className=' p-1 px-2 rounded-2xl whitespace-pre-wrap break-words  max-w-[45%]  bg-fuchsia-500'>
                                        {message?.message}
                                    </div>
                                </li>
                            }

                        })}
                    </ul>
                    <div ref={bottomRef} ></div>
                </div>


                <div className=' w-[100%] sm:h-[5%] md:h-[5%] h-[6%] border-[1px] border-gray-400'>
                    <form className='flex  h-full' onSubmit={handleSubmit(sendMessage)}>

                        <Input parentClass='w-[80%]' type="text"
                            className="w-full  h-full ml-2 pl-2  text-base rounded focus:outline-none focus:border-none"
                            placeholder="Type a message..."
                            {...register("message", { required: true })}
                            ref={(el) => {
                                register("message").ref(el);  // Give it to RHF
                                InputRef.current = el;        // Save your custom ref
                            }}

                        />

                        <Button type='submit'
                            className='w-[20%] text-[#2D3DD2] font-bold flex items-center justify-center cursor-pointer' >Send</Button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Chatbox