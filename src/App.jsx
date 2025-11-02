import { toast, ToastContainer } from 'react-toastify'
import './App.css'
import { createBrowserRouter, Navigate, Outlet, RouterProvider, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import axiosInstance from './features/axioxInstance'
import { useDispatch } from 'react-redux'
import { login as LoginUser } from './redux/Slices/authSlices'

function App({ children }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
   try {
     axiosInstance.get("/user/getcurrentuser").then((res) => {
       if (res.data.success) {
         dispatch(LoginUser({ user: res.data.user }))
        //  navigate("/")
       }
     }).catch((err)=>{
      console.log(err)
     })
   } catch (error) {
    console.log(error.response.data,"error")
      toast.error(error?.response?.data?.message)
   }


  }, [])


  return (
    <div className='min-h-screen flex flex-wrap content-between'>
      <div className='w-full block'>
        <ToastContainer />
        <Outlet />
      </div>
    </div>
  )
}

export default App
