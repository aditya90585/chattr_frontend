import React from 'react'
import { LuLogIn } from 'react-icons/lu';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SuggestedUser = () => {
    const currentUserData = useSelector(state => state.auth.userData)
    const navigate = useNavigate()
    return (
        <div className="third w-[35%] hidden md:block">
            <div className="userprofile hidden md:flex mx-5 mt-10">
                {currentUserData ?
                    <div onClick={() => navigate(`/profile/${currentUserData?.username}/posts`)} className="item items-center justify-between flex w-full cursor-pointer">
                        <div className='items-center justify-between flex'>
                            <div className=""><img className="w-12 h-12 rounded-full object-cover"
                                src={currentUserData?.profile_pic_url}
                                alt="profile_pic" /></div>
                            <div className="ml-2">
                                <div>{currentUserData?.fullname}</div>
                                <div className="text-gray-500">{currentUserData?.username}</div>
                            </div>
                        </div>
                        <div className="text-sm text-[#2536D0] cursor-pointer">visit profile</div>
                    </div>
                    :
                    <div onClick={() => navigate("/login")} className="item cursor-pointer items-center justify-between flex w-full px-8 shadow-sm hover:shadow-md rounded-lg py-3">
                        <div className='items-center justify-between flex font-bold'>
                            Log In
                        </div>
                        <div className="text-sm text-[#2536D0] cursor-pointer"><LuLogIn /></div>
                    </div>
                }

            </div>

            <div className="who m-3 py-5 rounded-xl space-y-1">
                <h1 className="font-semibold px-3 flex justify-between items-center">
                    <span className='text-gray-500'>Suggested for you</span>
                    <span>See all</span>
                </h1>
                <div onClick={() => navigate(`/profile/chattrofficial/posts`)} className="item p-3 cursor-pointer items-center gap-2 flex justify-between">
                    <div  className="flex gap-3">
                        <div className="p1 cursor-pointer">
                            <img className="w-12 h-12 rounded-full"
                                src="http://res.cloudinary.com/dm3xoqps6/image/upload/v1774348340/qfdnvd58rumcicwgfsg3.png"
                                alt="cattr_profile" />
                        </div>
                        <div className="p2 ">
                            <div className='cursor-pointer'>Chattr_official☑️</div>
                            <div className="text-gray-500">chattrofficial</div>
                        </div>
                    </div>
                    <div className="p3 cursor-pointer">
                        <button className="text-sm cursor-pointer text-[#2536D0] px-5 py-2 font-bold">Follow</button>
                    </div>
                </div>
            </div>

            <div className="terms sticky top-[84vh] m-3 text-xs text-gray-500 px-3 w-1/2 py-5 space-y-1">
                <span className="hover:underline cursor-pointer mr-2">Terms of Service</span>
                <span className="hover:underline cursor-pointer mr-2">Privacy Policy</span>
                <span className="hover:underline cursor-pointer mr-2">Cookie Policy</span>
                <span className="hover:underline cursor-pointer mr-2">Accessibility</span>
                <span className="hover:underline cursor-pointer mr-2">Ads info</span>
                <span className="hover:underline cursor-pointer mr-2">More</span>
                <span className="hover:underline cursor-pointer mr-2">© 2024 X Corp.</span>
            </div>
        </div>
    )
}

export default SuggestedUser