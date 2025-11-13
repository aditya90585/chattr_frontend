import React, { useState, useEffect } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { IoCloseCircleOutline } from "react-icons/io5";
import { BiLoader } from "react-icons/bi";
import axiosInstance from '../features/axioxInstance';
import { toast, ToastContainer } from "react-toastify"
import Searchresults from './Searchresults';

const Searchbar = ({ searchBarstate, setSearchBarstate }) => {
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])

    useEffect(() => {
        async function searchData() {
            try {

                if (search.length > 0) {
                    setLoading(true)
                    const response = await axiosInstance.get("/api/v1/user/search" + "?search=" + search)
                    setUsers(response.data.data)
                    setLoading(false)
                }
            } catch (error) {
                console.log(error)
                toast.error(error?.response?.data?.message || "semething went wrong...")
                setLoading(false)
            }
        }
        searchData()
    }, [search])

    const resetSearch = () => {
        setSearch("")
        setUsers([])
        setSearchBarstate()
    }

    return (
        <div className={`md:bottom-0 sm:bottom-0 bottom-11 fixed 
            ${searchBarstate ? "md:h-screen sm:h-screen h-[80%] md:w-[30%] sm:w-[30%] w-screen md:translate-x-15 sm:translate-x-15 -translate-x-1 transition-transform duration-400 bg-white md:shadow-[2px_4px_7px_black] sm:shadow-[2px_4px_7px_black] md:rounded-tr-2xl md:rounded-br-2xl sm:rounded-tr-2xl sm:rounded-br-2xl md:rounded-tl-none sm:rounded-tl-none rounded-tr-2xl rounded-tl-2xl border"
                : "md:h-screen sm:h-screen h-[80%] md:w-[30%] sm:w-[30%] w-screen bg-white md:translate-x-[-420px] sm:translate-x-[-420px] translate-x-[0px] md:translate-y-[0px] sm:translate-y-[0px] translate-y-[150%] transition-transform duration-400"}`}>
            <h1 className='font-semibold text-2xl mt-5 ml-3'>Search</h1>
            <div className='ml-3 mt-10 w-full relative'>
                {search?.length == 0 && <IoSearchOutline className='absolute top-2.5 left-1 text-xl text-[#8E8E8E]' />}     <input value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={`${search.length == 0 ? "pl-6" : "pl-2"} pr-8 border-none text-sm w-[95%] h-10 mx-auto rounded-xl bg-[#EFEFEF] `}
                    type="text"
                    placeholder=' Search' />
                {(loading) ? <BiLoader className='absolute animate-spin top-2.5 right-7' /> : search?.length != 0 && <IoCloseCircleOutline onClick={() => setSearch("")} className='cursor-pointer absolute top-2.5 right-7' />}
            </div>
            <div className='w-full  h-[2px] bg-[#EFEFEF] my-5'></div>

            {users.length == 0 && <div className='mx-auto w-fit text-xl text-[#646464] '>no result found</div>}
            {users.map((user) => {
                return <Searchresults key={user?._id} user={user} resetSearch={resetSearch} />
            })}
        </div>

    )
}

export default Searchbar