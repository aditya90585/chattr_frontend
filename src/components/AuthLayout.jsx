import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import Loader from "./Loader2"
import axiosInstance from "../features/axioxInstance"
import { useRef } from "react"
import { login as LoginUser } from "../redux/Slices/authSlices"
import { ToastContainer, toast } from "react-toastify"


export const AuthLayout = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userData = useSelector(state => state.auth.userData)
  const authStatus = useSelector(state => state.auth.status)

  useEffect(() => {
    // setLoading(true)
    // axiosInstance.get("/user/getcurrentuser").then((res) => {
    // if (res.data.success) {
    //   dispatch(LoginUser({ user: res.data.user }))
    // }
    // }).catch((err) => {
    //   console.log(err)
    //   navigate("/login")
    // )
    if (authStatus === undefined || authStatus === null) return

    if (!authStatus) {
      toast.error("you are not logged in...")
      navigate("/login")
    }



  }, [navigate, authStatus, userData])


  if (!authStatus) {
    return <Loader height={"full"} width={"full"} />
  }
  return <>
    {children}
  </>
}
