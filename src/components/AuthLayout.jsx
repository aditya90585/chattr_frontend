import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import Loader from "./Loader2"
import axiosInstance from "../features/axioxInstance"
import { useRef } from "react"
import { login as LoginUser } from "../redux/Slices/authSlices"
import { ToastContainer,toast } from "react-toastify"


export const AuthLayout = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const authStatus = useSelector(state => state?.auth?.status)
  const dispatch = useDispatch()
  
 


  useEffect(() => {
   
      try {
        setLoading(true)
           axiosInstance.get("/user/getcurrentuser").then((res) => {
             if (res.data.success) {
               dispatch(LoginUser({ user: res.data.user }))
              //  navigate("/")
             }
           }).catch((err)=>{
            console.log(err)
            navigate("/login")
           })
         } catch (error) {
          console.log(error.response.data,"error")
            toast.error(error?.response?.data?.message)
         }
         finally{
          setLoading(false)
         }

  }, [navigate, authStatus])


  if (loading) {
    return <Loader height={"screen"} width={"screen"} />
  }
  return <>
    {children}
  </>
}
