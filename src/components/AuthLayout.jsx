import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import Loader from "./loader"
import { toast, ToastContainer } from "react-toastify"
import axiosInstance from "../features/axioxInstance"
import { useRef } from "react"

export const AuthLayout = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const authStatus = useSelector(state => state.auth.status)
  const authref = useRef(authStatus)
  
  useEffect(() => {
    authref.current = authStatus
  }, [authStatus])


  useEffect(() => {
    setTimeout(() => {
      if (!authref.current) {
        toast.error("you are not log In")
        navigate("/login")
      }
    }, 500);

  }, [navigate, authStatus])


  if (loading) {
    return <Loader height={"screen"} width={"screen"} />
  }
  return <>
    {children}
  </>
}
