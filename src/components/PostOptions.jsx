import React, { useRef, useState, useEffect } from 'react'
import ShowLikesFollowersFollowing from './ShowLikesFollowersFollowing';
import ShowPost from './ShowPost';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../features/axioxInstance';
import { toast } from 'react-toastify';
import { deletePostState } from '../redux/Slices/postSlices';

const PostOptions = ({ openPostOptions, setOpenPostOptions, post, parent }) => {
    const userData = useSelector(state => state.auth.userData)
    const modalRef = useRef();
    const [likes, setLikes] = useState([])
    const [likeboxstate, setLikeboxstate] = useState(false)
    const [showpoststate, setShowpoststate] = useState(false)
    const [currentPost, setCurrentPost] = useState({})
    const [authStatus, setAuthStatus] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()


    useEffect(() => {
        if (userData?.username == post?.author_id?.username) {
            setAuthStatus(true)
        }
        else {
            setAuthStatus(false)
        }
    }, [userData, post])

    useEffect(() => {
        setLikes(post?.like)
    }, [post?.like])

    const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setOpenPostOptions(false)
        }
    };
    const deletePost = async () => {
        let toastId
        try {
            if (loading) {
                toast.error("please wait until your post deleted")
                return
            }
            setLoading(true)
            setOpenPostOptions(false)
            toastId = toast.loading("deleting post...");
            const res = await axiosInstance.get("/api/v1/posts/delete/" + post?._id)
            if (res?.data?.success) {
                toast.update(toastId, {
                    render: res?.data?.message || "post deleted successfull...",
                    type: "success",
                    isLoading: false,
                    autoClose: 3000,
                    closeOnClick: true,
                });
                dispatch(deletePostState(res.data.data ))
            }
        }
        catch (error) {
            console.log(error)
            toast.update(toastId, {
                render: error?.response?.data?.message || "Some error occured Please try again",
                type: "error",
                isLoading: false,
                autoClose: 5000,
                closeOnClick: true,
            });
        }
        finally {
            setLoading(false)
        }
    }
    const cancelOptions = () => {
        setOpenPostOptions(false)
    }
    const aboutAccount = () => {
        navigate(`/profile/${post?.author_id?.username}/posts`)
    }
    const goToPost = () => {
        setCurrentPost(post)
        setShowpoststate(true)
    }
    const seeLikes = () => {
        setLikeboxstate(true)
    }

    const Options = [
        {
            "text": "Delete Post",
            "textColor": "red",
            "function_name": deletePost,
            "auth": authStatus,
            "ShowPost": true
        },
        {
            "text": "See all Likes",
            "textColor": "black",
            "function_name": seeLikes,
            "auth": true,
            "ShowPost": true
        },
        {
            "text": "Go to post",
            "textColor": "black",
            "function_name": goToPost,
            "auth": true,
            "ShowPost": false
        },
        {
            "text": "About this account",
            "textColor": "black",
            "function_name": aboutAccount,
            "auth": true,
            "ShowPost": true
        },
        {
            "text": "Cancel",
            "textColor": "black",
            "function_name": cancelOptions,
            "auth": true,
            "ShowPost": true
        },


    ]
    if (!openPostOptions) return null;
    return (
        <div
            className="fixed z-60 inset-0 bg-black/50 flex justify-center items-center"
            onClick={handleClickOutside}
        >
            <div
                ref={modalRef}
                className={`bg-white rounded-lg w-[400px] ${authStatus ? "sm:h-[300px] md:h-[300px] h-[30%]" : "sm:h-[300px] md:h-[300px] h-[20%]"}   shadow-lg`}
            >
                <ul className='h-full w-full flex flex-col justify-evenly'>
                    {
                        Options?.map((option, index) => {
                            if (option.auth) {
                                if (parent == "postbox") {
                                    return <li onClick={option?.function_name} className={`${option.textColor == "red" ? "text-red-700" : "text-black"} font-semibold cursor-pointer w-full h-full px-6 flex justify-center items-center border-b border-gray-700`} key={index}>{option?.text}</li>
                                }
                                else if (parent == "showpost" && option.ShowPost ) {
                                    return <li onClick={option?.function_name} className={`${option.textColor == "red" ? "text-red-700" : "text-black"} font-semibold cursor-pointer w-full h-full px-6 flex justify-center items-center border-b border-gray-700`} key={index}>{option?.text}</li>

                                }
                            }
                        })
                    }
                </ul>
                <ShowLikesFollowersFollowing text={"Likes"} boxstate={likeboxstate} setboxstate={setLikeboxstate} data={likes} />
                <ShowPost showpoststate={showpoststate} setShowpoststate={setShowpoststate} post={currentPost} />

            </div>
        </div>
    )
}

export default PostOptions