import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react'
import { IoHeart, IoHeartOutline } from 'react-icons/io5';
import { LuSend } from "react-icons/lu";
import { CgMoreO } from "react-icons/cg";
import axiosInstance from '../features/axioxInstance';
import { toast, ToastContainer } from "react-toastify"
import ShowPost from './ShowPost';
import { NavLink } from 'react-router-dom';
import ShowLikesFollowersFollowing from './ShowLikesFollowersFollowing';
import { IoChatboxOutline } from 'react-icons/io5';
import Loader from './Loader2';
import PostOptions from './PostOptions';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa6';
import LoginRequired from './LoginRequired';
import { Loader2 } from 'lucide-react';


const PostBox = ({ post }) => {
  const [likestate, setLikestate] = useState(false)
  const [savepoststate, setSavepoststate] = useState(false)
  const userData = useSelector(state => state.auth.userData)
  const authStatus = useSelector(state => state.auth.status)
  const [loading, setLoading] = useState(false)
  const [likes, setLikes] = useState([])
  const [likeboxstate, setLikeboxstate] = useState(false)
  const [openPostOptions, setOpenPostOptions] = useState(false)

  const [likeLoading, setLikeLoading] = useState(false)
  const [saveLoading, setSaveLoading] = useState(false)

  const [showLoginRequired, setShowLoginRequired] = useState(false);

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
  }, [post?.like, userData, authStatus])

  useEffect(() => {
    setLikes(post?.like)
  }, [post?.like, userData, authStatus])

  useEffect(() => {
    if (userData?.save_posts?.indexOf(post?._id) == -1) {
      setSavepoststate(false)
    }
    else {
      setSavepoststate(true)
    }
  }, [userData, authStatus, post])


  const [showpoststate, setShowpoststate] = useState(false)
  const [currentPost, setCurrentPost] = useState({})

  const changeCurrentPost = (post) => {
    setCurrentPost(post)
    setShowpoststate(true)
  }

  const likeFunction = async () => {
    if (likeLoading) return
    setLikeLoading(true)
    try {
      const res = await axiosInstance.get("/api/v1/posts/like/" + post?._id)
      if (res?.data?.success) {
        if (likestate) {
          const newPostLikeData = likes.filter((userdata) => {
            return userdata?._id != res?.data?.user?._id
          })
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
      if (error?.response?.status == 401 || error?.response?.data?.message == "You are not logged In") {
        return setShowLoginRequired(true)
      }
      toast.error(error?.response?.data?.message || "like failed")
    }
    finally {
      setLikeLoading(false)
    }
  }

  const Save_post = async () => {
    if (saveLoading) return
    let toastId
    setSaveLoading(true)
    try {
      toastId = toast.loading("saving post...");
      const res = await axiosInstance.get("/api/v1/posts/savepost/" + post?._id)
      if (res?.data?.success) {
        setSavepoststate(!savepoststate)
        toast.update(toastId, {
          render: res?.data?.message || "Post saved successfully",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.log(error)
      if (error?.response?.status == 401 || error?.response?.data?.message == "You are not logged In") {
        setShowLoginRequired(true)
      }
      toast.update(toastId, {
        render: error?.response?.data?.message || "Some error occured Please try again",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
    finally {
      setSaveLoading(false)
    }
  }


  if (!post) return <Loader height={"full"} width={"full"} />
  if (loading) return <Loader height={"full"} width={"full"} />
  return (
    <div className="post md:w-[65%] w-full  my-2">
      <div className='flex h-[5%] w-full  justify-between'>
        <div className='flex items-center h-full ml-2'>
          <NavLink to={`/profile/${post?.author_id?.username}/posts`} className="image w-10 h-10">
            <img className=" w-full h-full rounded-full object-cover"
              src={post?.author_id?.profile_pic_url}
              alt="profile picture" />
          </NavLink>
          <NavLink to={`/profile/${post?.author_id?.username}/posts`} className="content">
            <span className="font-semibold hover:underline cursor-pointer mx-2">{post?.author_id?.username}</span>
          </NavLink>
        </div>

        <div onClick={() => setOpenPostOptions(true)} className=' flex items-center cursor-pointer'>
          <CgMoreO className='h-full size-5' />
        </div>
        <PostOptions parent={"postbox"} post={post} openPostOptions={openPostOptions} setOpenPostOptions={setOpenPostOptions} />
      </div>

      <div className="postimg w-full h-[80vh] border rounded-xl mt-2 bg-gray-800">
        <img className="rounded-xl h-[100%] w-full object-contain"
          src={post.imageUrl}
          alt="postImage" />
      </div>

      <div className="icons flex h-[4%]  justify-between my-1 text-sm text-gray-800">
        <div className='flex justify-between items-center'>
          <div onClick={likeFunction} className="icon flex items-center justify-center hover:text-[#A8A8A8] p-1 hover:cursor-pointer">
            {
              !likeLoading ? likestate ? <IoHeart className='size-7 text-red-600' /> : <IoHeartOutline className='size-7 text-black ' /> : <Loader2 className='size-7 text-gray-400 animate-spin' />
            }

          </div>
          <div onClick={() => changeCurrentPost(post)} className="icon flex items-center justify-center hover:text-[#A8A8A8] p-1 hover:cursor-pointer">
            <IoChatboxOutline className='size-7 text-black' />
          </div>
          <div className="icon flex items-center justify-center text-black hover:text-[#A8A8A8] p-1 hover:cursor-pointer">
            <LuSend className='text-xl' />
          </div>
        </div>
        <div onClick={Save_post} className="icon flex items-center justify-center hover:text-[#A8A8A8] p-1 hover:cursor-pointer">
          {!saveLoading ? !authStatus ? <FaRegBookmark className='text-xl' /> : savepoststate ? <FaBookmark className='text-xl' /> : <FaRegBookmark className='text-xl' /> : <Loader2 className='text-xl animate-spin' />}

        </div>
      </div>
      <div onClick={() => setLikeboxstate(true)} className="font-semibold h-[3%] pl-2 cursor-pointer">{likes?.length} likes</div>
      <ShowLikesFollowersFollowing text={"Likes"} boxstate={likeboxstate} setboxstate={setLikeboxstate} data={likes} />

      <div className=" h-[4%] px-2  whitespace-normal break-words">
        <span className='font-semibold mr-2'>{post?.author_id?.username}</span>{post.caption}</div>
      <div onClick={() => changeCurrentPost(post)} className="text-[#383535] pl-2 hover:text-[#a8a5a5]  hover:cursor-pointer">
        view all {post?.comments?.length} comments
      </div>
      <ShowPost showpoststate={showpoststate} setShowpoststate={setShowpoststate} post={currentPost} />
      {showLoginRequired && (
        <LoginRequired
          onClose={() => setShowLoginRequired(false)}
        />
      )}
    </div>
  )
}

export default PostBox