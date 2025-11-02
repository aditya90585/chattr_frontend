import React from 'react'
import { useSelector } from 'react-redux'
import Input from './Input'

const EditProfile = () => {
    const userData = useSelector(state => state.auth.userData)
    return (
        <div className='flex items-center justify-center h-full w-full'>
            <div className='md:h-[80%] md:w-[60%] sm:h-[80%] sm:w-[60%] h-full w-full'>
                <h1 className='font-bold text-2xl h-[10%]'>Edit Profile</h1>
                <div className='w-full h-[20%] flex justify-between bg-gray-200 rounded-xl px-3 py-3'>
                    <div className=' h-full flex'>
                        <div className='h-full'><img className='h-full aspect-square rounded-full ' src={userData?.profile_pic_url} alt="profile_pic" /></div>
                        <div className='h-full flex flex-col justify-center ml-4'>
                            <div className='font-bold'>{userData?.username}</div>
                            <div>{userData?.fullname}</div>
                        </div>
                    </div>
                    <div className='h-full flex items-center'>
                        <Input type='file' className='hidden' label={"Change photo"} labelClass={"bg-blue-600 cursor-pointer font-semibold p-2 px-5 rounded-xl text-white "}/>
                    </div>
                </div>
                <div className='w-full h-[20%] mt-5 px-6'>
                     <Input  className='w-full  border rounded-xl' placeholder='full name' label={"Full name"} labelClass={" cursor-pointer w-full font-semibold"}/>
                 
                </div>
                 <div className='w-full h-[20%] px-6'>
                     <Input  className='' placeholder='Bio' label={"Bio"} labelClass={" cursor-pointer w-full "}/>
                 
                </div>

            </div>
        </div>
    )
}

export default EditProfile