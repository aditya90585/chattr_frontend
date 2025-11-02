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


const PostBox = ({ post }) => {
  const [likestate, setLikestate] = useState(false)
  const userData = useSelector(state => state?.auth?.userData)
  const [loading, setLoading] = useState(false)
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
  }, [post])

  useEffect(() => {
    setLikes(post?.like)
  }, [post?.like])

  const [showpoststate, setShowpoststate] = useState(false)
  const [currentPost, setCurrentPost] = useState({})

  const changeCurrentPost = (post) => {
    setCurrentPost(post)
    setShowpoststate(true)
  }

  const likeFunction = async () => {
    try {
      setLoading(true)
      const res = await axiosInstance.get("/posts/like/" + post?._id)
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
      toast.error(error?.response?.data?.message || " like failed")
    }
    finally {
      setLoading(false)
    }
  }

  const deletePost = async () => {
    try {
      setLoading(true)
      const res = await axiosInstance.get("/posts/delete/" + post?._id)
      if (res?.data?.success) {
        toast.success("post deleted successfully...")
      } else {
        toast.error("some error occured")
      }
    }
    catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || "some error occured while deleting post")
    }
    finally {
      setLoading(false)
    }

  }
 if(!post) return <Loader height={"full"} width={"full"}/>
  return (
    <div className="post md:w-[65%] w-full  my-2">
      <ToastContainer />
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

        <div onClick={deletePost} className=' flex items-center'>
          <CgMoreO className='h-full size-5' />
        </div>
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
              likestate ? <IoHeart className='size-7 text-red-600' /> : <IoHeartOutline className='size-7 text-black ' />
            }

          </div>
          <div onClick={() => changeCurrentPost(post)} className="icon flex items-center justify-center hover:text-[#A8A8A8] p-1 hover:cursor-pointer">
           <IoChatboxOutline className='size-7 text-black'/>
          </div>
          <div className="icon flex items-center justify-center text-black hover:text-[#A8A8A8] p-1 hover:cursor-pointer">
            <LuSend className='text-xl' />
          </div>
        </div>
        <div className="icon flex items-center justify-center hover:text-[#A8A8A8] p-1 hover:cursor-pointer">
          <span className="material-symbols-outlined">bookmark</span>
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
    </div>
  )
}

export default PostBox