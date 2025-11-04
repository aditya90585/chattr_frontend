import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Input from './Input'
import Button from './Button'
import FileInput from './FileInput'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'
import axiosInstance from '../features/axioxInstance'
import { useNavigate } from 'react-router-dom'
import { IoIosArrowBack } from 'react-icons/io'

const EditProfile = () => {
    const userData = useSelector(state => state.auth.userData)
    const [profile_pic_url, setProfile_pic_url] = useState()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        setProfile_pic_url(userData?.profile_pic_url)
    }, [userData?.profile_pic_url])


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm()

    const {
        register: registerProfile,
        handleSubmit: handleSubmitProfile,
        formState: { errors: errorsProfile },
        setValue: setValueProfile,
        reset: resetProfile
    } = useForm()

    const image = watch("profileImage")

    useEffect(() => {
        if (image && image.length > 0) {
            submitImage({ image })
        }
    }, [image])

    useEffect(() => {
        if (userData) {
            setValueProfile("fullname", userData?.fullname)
            setValueProfile("bio", userData?.bio)
        }
    }, [userData?.fullname, userData?.bio])



    const submitImage = async (data) => {
        if (!data.image[0]) return
        let toastId
        try {
            if (loading) {
                toast.error("please wait until your profile uploaded")
                return
            }
            setLoading(true)
            toastId = toast.loading("Uploading profile_picture...");
            const formData = new FormData();
            formData.append("profileImage", data.image[0])

            const res = await axiosInstance.post("/user/changeprofilepic", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            if (res.data.success) {
                setProfile_pic_url(res?.data?.data)
                toast.update(toastId, {
                    render: res?.data?.message || "profile_picture changed successfully",
                    type: "success",
                    isLoading: false,
                    autoClose: 3000,
                    closeOnClick: true,
                });
            }
            setLoading(false)
            reset()

        } catch (error) {
            console.log(error)
            toast.update(toastId, {
                render: error?.response?.data?.message || "Some error occured Please try again",
                type: "error",
                isLoading: false,
                autoClose: 5000,
                closeOnClick: true,
            });
            setLoading(false)
            reset()
        }
    }

    const editProfileDetails = async (data) => {
        if (!data) return
        let toastId
        try {
            if (loading) {
                toast.error("please wait until your profile details edited")
                return
            }
            setLoading(true)
            toastId = toast.loading("Updating profile details...");

            const res = await axiosInstance.post("/user/editprofile", { data })
            if (res.data.success) {
                toast.update(toastId, {
                    render: res?.data?.message || "profile details  changed successfully",
                    type: "success",
                    isLoading: false,
                    autoClose: 3000,
                    closeOnClick: true,
                });
            }
            setLoading(false)
            resetProfile()
            navigate(`/profile/${userData?.username}/posts`)

        } catch (error) {
            console.log(error)
            toast.update(toastId, {
                render: error?.response?.data?.message || "Some error occured Please try again",
                type: "error",
                isLoading: false,
                autoClose: 5000,
                closeOnClick: true,
            });
            setLoading(false)
            resetProfile()
        }
    }


    return (
        <div className='flex items-center justify-center h-full w-full'>
            <div className='md:h-[80%] md:w-[60%] sm:h-[80%] sm:w-[60%] h-full w-full'>
                <h1 className='w-full font-bold text-2xl h-[6%] md:hidden sm:hidden flex border-b-[1px]'>
                    <Button
                        onClick={() => navigate(`/profile/${userData?.username}/posts`) }
                        className="text-black  right-5 top-5 hover:text-gray-200 rounded-full cursor-pointer"
                    >
                        <IoIosArrowBack className='size-8' />
                    </Button>
                    <div className='h-full ml-[32%] flex items-center font-semibold'>
                        Edit Profile
                    </div>
                </h1>
                <div className='w-full sm:h-[20%]  md:h-[20%] h-[30%] flex md:flex-row sm:flex-row flex-col justify-between bg-gray-200 rounded-xl px-3 py-3'>
                    <div className=' md:h-full sm:h-full h-[60%] flex md:mx-0 sm:mx-0 mx-auto'>
                        <div className='h-full'><img className='h-full aspect-square object-cover rounded-full ' src={profile_pic_url} alt="profile_pic" /></div>
                        <div className='h-full flex flex-col justify-center ml-4'>
                            <div className='font-bold'>{userData?.username}</div>
                            <div>{userData?.fullname}</div>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(submitImage)} className='md:h-full sm:h-full h-[20%] flex items-center md:mx-0 sm:mx-0 mx-auto'>
                        <Input type='file' {...register("profileImage", { required: true })} className='hidden' label={"Change photo"} labelClass={"bg-blue-600 cursor-pointer font-semibold p-2 px-5 rounded-xl text-white "} />
                    </form>
                </div>
                <form className='h-[70%]' onSubmit={handleSubmitProfile(editProfileDetails)}>
                    <div className='w-full md:h-[20%] sm:h-[20%] h-[12%] mt-15 px-6'>
                        <Input
                            parentClass='h-full w-full'
                            className='w-full pl-4 h-[80%] border border-gray-500 md:rounded-xl sm:rounded-xl rounded'
                            placeholder='full name'
                            label={"Full name"}
                            labelClass={" cursor-pointer h-[10%] w-full font-bold text-xl"}
                            {...registerProfile("fullname",
                                {
                                    required: true,

                                }

                            )}
                        />
                        {errorsProfile.fullname && <span className='text-xs text-red-600'>this field required</span>}


                    </div>
                    <div className='w-full md:h-[20%] sm:h-[20%] h-[12%] px-6 my-5'>
                        <Input
                            parentClass='h-full w-full'
                            className='w-full pl-4  h-[80%]  border border-gray-500 md:rounded-xl sm:rounded-xl rounded'
                            placeholder='Bio'
                            label={"Bio"}
                            labelClass={" cursor-pointer h-[10%]  w-full font-bold text-xl"}
                            {...registerProfile("bio")}
                        />
                        {errorsProfile.bio && <span className='text-xs text-red-600'>this field </span>}

                    </div>
                    <div className='w-full md:h-[12%] sm:h-[12%] h-[8%] px-6 my-10'>
                        <Button type='submit' className='w-full cursor-pointer h-full bg-blue-600 text-white rounded'>Submit</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditProfile