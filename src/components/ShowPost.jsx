import React, { useRef, useState } from 'react'
import { IoChatboxOutline, IoCloseCircleOutline } from "react-icons/io5";
import { CgMoreO } from "react-icons/cg";
import { IoIosArrowBack } from "react-icons/io";
import { IoHeart, IoHeartOutline } from 'react-icons/io5';
import { useForm } from 'react-hook-form';
import Button from './Button';
import Input from './Input';
import { ToastContainer, toast } from 'react-toastify';
import axiosInstance from '../features/axioxInstance';
import { useEffect } from 'react';
import Loader from './Loader2';
import { IoIosMore } from "react-icons/io";
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ShowLikesFollowersFollowing from './ShowLikesFollowersFollowing';
import Commentbox from './Commentbox';


const ShowPost = ({ showpoststate, post, setShowpoststate }) => {
    const userData = useSelector(state => state.auth.userData)
    const [likestate, setLikestate] = useState(false)
    const [loading, setLoading] = useState(false)
    const [comments, setcomments] = useState([])
    const [likes, setLikes] = useState([])
    const [likeboxstate, setLikeboxstate] = useState(false)

    useEffect(() => {
        for (let index = 0; index < post?.like?.length; index++) {
            if (post?.like[index]?._id == userData?._id) {
                setLikestate(true)
                break
            }
            else {
                setLikestate(false)
            }
        }
    }, [post?.like])

    useEffect(() => {
        setLikes(post?.like)
    }, [post?.like])

    useEffect(() => {
        setcomments(post?.comments)
    }, [post?.comments])

    const modalRef = useRef()
    const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setShowpoststate(false)
        }
    };

    const likeFunction = async () => {
        if(loading) return
        try {
            setLoading(true)
            const res = await axiosInstance.get("/posts/like/" + post?._id)
            if (res?.data?.success) {
                if (likestate) {
                    const newPostLikeData = likes.filter((userdata) => {
                        console.log(userdata._id, res.data)
                        return userdata?._id != res?.data?.user?._id
                    })
                    console.log(newPostLikeData)
                    setLikes(newPostLikeData)
                    toast.success("post disliked")
                } else {
                    setLikes((prev) => [res?.data?.user, ...prev])
                    toast.success("post liked")
                }
                setLikestate(!likestate)
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message || " SignUp failed")
        }
        finally {
            setLoading(false)
        }
    }


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset
    } = useForm()

    const PostComment = async (data) => {
        if(loading) return 
        try {
            setLoading(true)
            const res = await axiosInstance.post("/posts/comment", {
                data,
                post_id: post?._id
            })
            if (res.data.success) {
                setcomments((prev) => [res?.data?.data, ...prev])
                reset()
            }


        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message || "something went wrong")
        }
        finally {
            setLoading(false)
            reset()
        }
    }


    if (!showpoststate) return null
    // if (!post.comments) return <Loader height={"full"} width={"full"} />
    return (
        <div className="fixed z-50 inset-0 bg-black/50 flex  justify-center items-center"
            onClick={handleClickOutside}>
            <Button
                onClick={() => (setShowpoststate(false))}
                className="text-white fixed md:flex sm:flex hidden  right-5 top-5 hover:text-gray-200 rounded-full cursor-pointer">
                <IoCloseCircleOutline className='size-8' />
            </Button>
            <div
                ref={modalRef}
                className={`bg-white overflow-hidden md:static sm:static absolute top-0 md:rounded-lg sm:rounded-lg rounded-none md:w-[70%] sm:w-[70%] w-full h-full sm:h-[90%] md:h-[90%] shadow-lg flex md:flex-row sm:flex-row flex-col`}
            >
                <div className='w-full h-[5%] md:hidden sm:hidden flex border-b-[1px]'>
                    <Button
                        onClick={() => (setShowpoststate(false))}
                        className="text-black  right-5 top-5 hover:text-gray-200 rounded-full cursor-pointer"
                    >
                        <IoIosArrowBack className='size-8' />
                    </Button>
                    <div className='h-full ml-[38%] flex items-center font-semibold'>
                        Post
                    </div>
                </div>
                <div className='w-full h-[5%] md:hidden sm:hidden flex justify-between'>
                    <NavLink to={`/profile/${post?.author_id?.username}/posts`} className='h-full cursor-pointer ml-5 flex items-center'>
                        <img className='aspect-square h-[70%] object-cover rounded-full' src={post?.author_id?.profile_pic_url} alt="profile_pic" />
                        <div className='ml-2'>
                            {post?.author_id?.username}
                        </div>
                    </NavLink>
                    <div className='h-full flex items-center mr-6'>
                        <CgMoreO className='size-6 cursor-pointer' />
                    </div>
                </div>

                <div className="md:h-full sm:h-full h-[55%] md:w-[55%] sm:w-[55%] w-full">
                    <img
                        src={post.imageUrl}
                        alt="post_image"
                        className="h-full w-full object-cover rounded shadow-[2px_2px_5px_black]"
                    />
                </div>

                <div className="md:h-full sm:h-full h-[35%] md:w-[45%] sm:w-[45%] w-full relative">
                    <div className='w-full h-[8%] md:flex sm:flex hidden justify-between'>
                        <NavLink to={`/profile/${post?.author_id?.username}/posts`} className='h-full ml-5 flex items-center'>
                            <img className='aspect-square h-[70%] object-cover rounded-full' src={post?.author_id?.profile_pic_url} alt="" />
                            <div className='ml-2'>
                                {post?.author_id?.username}
                            </div>
                        </NavLink>
                        <div className='h-full flex items-center mr-6'>
                            <CgMoreO className='size-6 cursor-pointer' />
                        </div>
                    </div>
                    <div className='w-full h-[1px] bg-gray-400'></div>
                    <div className=' w-full md:h-[67%] sm:h-[67%] h-[65%]  flex flex-col overflow-y-scroll overflow-x-hidden  gap-x-1 gap-y-2 px-3'>
                        {post?.caption && <div className='flex items-center w-full cursor-default rounded-xl p-2'>
                            <NavLink to={`/profile/${post?.author_id?.username}/posts`} className='h-full w-[10%] flex items-start'>
                                <img className='aspect-square cursor-pointer w-8 h-8 rounded-full' src={post?.author_id?.profile_pic_url} alt="profile_pic" />
                            </NavLink>
                            <div className=' w-[90%] h-fit flex  flex-col  justify-center'>
                                <NavLink to={`/profile/${post?.author_id?.username}/posts`} className='text-black cursor-pointer font-semibold'>{post?.author_id?.username}</NavLink>
                                <div className='w-full h-fit whitespace-normal break-words'>{post?.caption}</div>
                            </div>
                        </div>}

                        {comments?.map((comment) => {
                            return <Commentbox key={comment?._id} comment={comment} />
                        })}
                    </div>
                    <div className='w-full md:h-[25%] sm:h-[25%] h-[35%] border-t-[1px] border-gray-400 absolute bottom-0'>
                        <div className='w-full h-[60%]'>
                            <div className="icons flex h-[50%] justify-between my-1 text-sm text-gray-800">
                                <div className='flex justify-between items-center'>
                                    <div onClick={likeFunction} className="icon flex items-center justify-center hover:text-[#A8A8A8] p-1 hover:cursor-pointer">
                                        {
                                            likestate ? <IoHeart className='size-7 text-red-600' /> : <IoHeartOutline className='size-7 text-black ' />
                                        }

                                    </div>
                                    <div className="icon flex items-center justify-center hover:text-[#A8A8A8] p-1 hover:cursor-pointer">
                                        <IoChatboxOutline className='size-7' />
                                    </div>

                                </div>
                                <div className="icon flex items-center justify-center hover:text-[#A8A8A8] p-1 hover:cursor-pointer">
                                    <span className="material-symbols-outlined">bookmark</span>
                                </div>
                            </div>
                            <div onClick={() => setLikeboxstate(true)} className="font-semibold cursor-pointer h-[50%] pl-2">{likes?.length} likes</div>

                            <ShowLikesFollowersFollowing text={"Likes"} boxstate={likeboxstate} setboxstate={setLikeboxstate} data={likes} />

                        </div>
                        <div className='w-full sm:h-[40%] md:h-[40%] h-[40%] border-t-[1px] border-gray-400'>
                            <form className='flex h-full' onSubmit={handleSubmit(PostComment)}>
                                <textarea type="text"
                                    className="w-[80%] h-full ml-2 pl-2 resize-none text-base rounded focus:outline-none focus:border-none"
                                    placeholder="Add a comment..."
                                    {...register("comment", {
                                        required: true
                                    })}
                                />
                                <Button type='submit'
                                    className='w-[20%] text-[#2D3DD2] font-bold flex items-center justify-center cursor-pointer' >Post</Button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ShowPost