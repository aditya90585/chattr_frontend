import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useForm } from "react-hook-form"
import Input from './Input'
import Button from './Button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../features/axioxInstance'
import Loader from './Loader2'
import { ToastContainer, toast } from 'react-toastify'
import { login as loginUser } from '../redux/Slices/authSlices'
import SplashCursor from './SplashCursor'

import Particles from './Particles';
import CursorGrid from './CursorGrid'
import MagicRings from './MagicRings'
import { Loader2 } from 'lucide-react'
const login = () => {
  const [passwordType, setPasswordType] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()


  const loginform = async (data) => {

    try {
      setLoading(true)
      const res = await axiosInstance.post("/api/v1/user/login", {
        data
      })
      if (res?.data?.success) {
        dispatch(loginUser({ user: res.data.user }))

        navigate("/")
      }

    } catch (error) {
      console.log(error, "error")
      toast.error(error?.response?.data?.message || " login failed")
    }
    finally {
      setLoading(false)
    }
  }


  // if (loading) {
  //   return <Loader height={"screen"} width={"screen"} />
  // }

  return (
    <div className='flex justify-center w-screen items-center overflow-hidden '>

      <div style={{ width: '98%', height: '98%', position: 'absolute' }}>
        <Particles
          particleColors={["#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover
          alphaParticles={false}
          disableRotation={false}
          pixelRatio={1}
        />

        <CursorGrid
          cellSize={70}
          color="#D946EF"
          radius={140}
          falloff="smooth"
          holdTime={400}
          fadeDuration={800}
          lineWidth={1.2}
          maxOpacity={1}
          fillOpacity={0}
          gridOpacity={0}
          cellRadius={0}
          clickPulse
          pulseSpeed={600}
        />
      </div>
      <div className='w-[40%] h-screen md:flex hidden items-center justify-center  relative z-10'>
        <img className={` w-full ml-8 rounded-3xl ease-out duration-600 transition `} src="/images/landingpage.png" alt="loginiImage" />
      </div>
      <div className='h-screen w-[40%] flex items-center justify-center flex-col  relative z-10'>
        <div className='flex items-center w-40 h-20'>
          <img className='w-full object-cover' src="/images/chattrLogo.png" alt="LOGO" />
        </div>
        <div className='flex flex-col items-center justify-center rounded-2xl w-3/4'>
          <form onSubmit={handleSubmit(loginform)} action="">
            <Input
              className='h-8 w-75 border border-gray-200 pl-4 mt-2 text-xs font-semibold shadow-sm inset-shadow-sm'
              type="email"
              placeholder='enter email'
              {...register("email", {
                required: "email must be required",

              }

              )}
            />
            {errors.email && <span className='text-xs text-red-600'>{errors.email.message}</span>}
            <div className='relative'>
              <Input
                className='h-8 w-75 pl-4 border border-gray-200 mt-2 text-xs font-semibold shadow-sm inset-shadow-sm'
                type={passwordType == true ? "password" : "text"}
                placeholder='Password'
                {...register("password",
                  {
                    required: "password must be required",
                    minLength: {
                      value: 6,
                      message: "password length must be greter than 6"
                    },
                    maxLength: {
                      value: 20,
                      message: "password length must be smaller than 20"
                    }
                  }

                )}
              />
              <span onClick={() => setPasswordType(!passwordType)} className='text-xs font-semibold absolute bottom-2 right-4 cursor-pointer'>{passwordType ? "Show" : "Hide"}</span>
            </div>
            {errors.password && <span className='text-xs text-red-600'>{errors.password.message}</span>}

            <Button type='submit'
              className='h-9 bg-[#808DFB] w-75 rounded-sm mt-6 font-bold flex items-center justify-center text-white  bg-lightbrown cursor-pointer' >{!loading?"Log in":<Loader2 className='animate-spin'/>}</Button>
          </form>

          <div className='w-72 my-8 font-semibold text-xs flex justify-between items-center text-gray-600'>
            <span className='bg-gray-600 h-[1px] w-[40%]'></span>
            <span>OR</span>
            <span className='bg-gray-600 h-[1px] w-[40%] '></span>
          </div>
          <div className='flex justify-center items-center text-sm w-screen'>Don't have an account?
            <NavLink to="/sign" className=' text-[#6050F7] mx-1 cursor-pointer font-semibold'>Signup</NavLink>
          </div>

        </div>
      </div>
    </div>
  )
}

export default login