import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Button from './Button'
import ProfilePosts from './ProfilePosts'
import SavedPosts from './SavedPosts'
import { NavLink, Outlet, UNSAFE_createClientRoutesWithHMRRevalidationOptOut } from 'react-router-dom'
import { BiCategory } from "react-icons/bi";
import { FaRegBookmark } from "react-icons/fa6";
import axiosInstance from '../features/axioxInstance'
import { ToastContainer, toast } from 'react-toastify'
import ShowLikesFollowersFollowing from './ShowLikesFollowersFollowing'
import { useNavigate } from 'react-router-dom'
import Loader from './Loader2'


const ProfileDetails = ({ userData }) => {
    const [followState, setFollowState] = useState(false)
    const [followers, setfollowers] = useState([])
    const [loading, setLoading] = useState(false)
    const [followersBoxState, setFollowersBoxState] = useState(false)
    const [followingBoxState, setFollowingBoxState] = useState(false)

const navigate = useNavigate()

    const currentUserData = useSelector(state => state?.auth?.userData)

    useEffect(() => {
        setfollowers(userData?.followers)

        for (let index = 0; index < userData?.followers?.length; index++) {
            if (userData?.followers[index]?._id == currentUserData?._id) {
                setFollowState(true)
                break
            }
            else {
                setFollowState(false)
            }
        }

    }, [userData])

    const followUnfollow = async () => {
        try {
            setLoading(true)
            const res = await axiosInstance.get("/user/followunfollow/" + userData?._id)
            if (res?.data?.success) {
                if (followState) {
                    const newfollowersData = followers.filter((userdata) => {
                        return userdata?._id != res?.data?.user?._id
                    })
                    setfollowers(newfollowersData)
                    toast.success("user unfollowed")
                } else {
                    setfollowers((prev) => [res?.data?.user, ...prev])
                    toast.success("user followed")
                }
                setFollowState(!followState)
            }
        }
        catch (error) {

        }
        finally {
            setLoading(false)
        }
    }
 if( !userData || Object.keys(userData).length == 0 || !currentUserData) return <Loader height={"full"} width={"full"}/>
    return (
        <div className=' md:h-[45%] flex flex-col md:justify-between items-center '>
            <ToastContainer />
            <div className='flex md:h-[70%] h-[50%] gap-x-10 mt-10 mx-5 md:mx- md:mx-0'>
                <div className='flex w-full  flex-col justify-center items-center'>
                    <img className='rounded-full aspect-square md:h-50 object-cover' src={userData?.profile_pic_url} alt="" />
                    <div className='font-semibold text-xl flex md:hidden '>{userData?.fullname}</div>
                    <div className='mt-2 flex md:hidden'>{userData?.bio}</div>
                </div>
                <div className='flex h-[40%] justify-evenly flex-col my-auto'>
                    <div className='font-extrabold text-2xl'>{userData?.username}</div>
                    <div className='font-semibold text-xl md:block hidden'>{userData?.fullname}</div>
                    <div className='flex justify-between gap-x-5'>
                        <div><span className='font-semibold text-base'>{userData?.posts?.length}</span> posts</div>
                        <div className='cursor-pointer' onClick={() => setFollowersBoxState(true)}><span className='font-semibold cursor-pointer text-base'>{followers?.length}</span> followers</div>
                        <div className='cursor-pointer' onClick={() => setFollowingBoxState(true)}><span className='font-semibold cursor-pointer text-base'>{userData?.following?.length}</span> following</div>

                        <ShowLikesFollowersFollowing text={"Followers"} data={followers} boxstate={followersBoxState} setboxstate={setFollowersBoxState} />
                        <ShowLikesFollowersFollowing text={"Following"} data={userData?.following} boxstate={followingBoxState} setboxstate={setFollowingBoxState} />

                    </div>
                    <div className='mt-2 md:block hidden'>{userData?.bio}</div>
                </div>
            </div>

            {currentUserData?.username == userData?.username ?
                <div className='md:w-[60%] sm:w-[60%] w-[96%] flex justify-around mt-5 md:mx-15'>
                    <Button onClick={()=> navigate("/account/edit")} className='bg-[#E7EAEE] cursor-pointer w-[48%] h-12 rounded-xl font-semibold text-base'>Edit Profile</Button>
                    <Button className='bg-[#E7EAEE] w-[48%] h-12 rounded-xl font-semibold text-base' >View Achive</Button>
                </div>
                : (!followState) ?
                    <div className='md:w-[50%] sm:w-[50%] w-[96%]  flex justify-around mt-5 md:mx-15'>
                        <Button onClick={followUnfollow} className='bg-[#0961d4] cursor-pointer text-white w-[100%] h-12 rounded-xl font-semibold text-base'>
                            Follow</Button>
                    </div>
                    : <div className='md:w-[60%] sm:w-[60%] w-[96%]  flex justify-around mt-5 md:mx-15'>
                        <Button onClick={followUnfollow} className='bg-[#E7EAEE] cursor-pointer w-[48%] h-12 rounded-xl font-semibold text-base'>
                            Following</Button>
                        <Button className='bg-[#E7EAEE] cursor-pointer w-[48%] h-12 rounded-xl font-semibold text-base' >
                            Message</Button>
                    </div>
            }



            <div className='mt-10 w-full flex'>
                <NavLink className="w-[50%] h-10 flex flex-col justify-between items-center" to={`/profile/${userData.username}/posts`} >
                    {({ isActive }) => (
                        <>
                            <BiCategory
                                size={24}
                                className={isActive ? "text-black" : "text-gray-400"}
                            />
                            <div
                                className={`w-14 h-[2px] rounded-full mt-1 transition-all duration-200 ${isActive ? "bg-black opacity-100" : "bg-transparent opacity-0"
                                    }`}
                            />
                        </>
                    )}
                </NavLink>
                <NavLink className="w-[50%] h-10 flex flex-col justify-between items-center" to={`/profile/${userData.username}/savedposts`} >
                    {({ isActive }) => (
                        <>
                            < FaRegBookmark
                                size={22}
                                className={isActive ? "text-black" : "text-gray-400"}
                            />
                            <div
                                className={`w-14 h-[2px] rounded-full mt-1 transition-all duration-200 ${isActive ? "bg-black opacity-100" : "bg-transparent opacity-0"
                                    }`}
                            />
                        </>
                    )}
                </NavLink>
            </div>

            <Outlet context={{ userData }} />
        </div >
    )
}

export default ProfileDetails