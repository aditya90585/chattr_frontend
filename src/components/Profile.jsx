import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ProfileDetails from './ProfileDetails'
import { useParams } from 'react-router-dom'
import axiosInstance from '../features/axioxInstance'
import { toast, ToastContainer } from 'react-toastify'
import Loader from './Loader2'
import Navbar from './Navbar'

const Profile = () => {
  // const userData = useSelector(state => state.auth.userData)
  const { username } = useParams()
  const [userData, setuserData] = useState({})
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState([])



  useEffect(() => {
    async function showuser() {
      try {
        if (username != "undefined") {
          setLoading(true)

          const response = await axiosInstance.get("/user/getprofile/" + username)
 
          setuserData(response?.data?.user)
          setLoading(false)
        }
      } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message || "semething went wrong...")
        setLoading(false)
      }
    }
    showuser()
  }, [username])

 if(loading) return <Loader height={"full"} width={"full"}/>

  return (
    <div className=' h-full  w-full mx-auto overflow-y-scroll pt-10'>
 <Navbar/>
      <ProfileDetails userData={userData} />
    </div>
  )
}

export default Profile