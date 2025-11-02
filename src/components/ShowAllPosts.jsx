import React from 'react'
import PostBox from './PostBox'
import { useSelector } from 'react-redux'
import SuggestedUser from './SuggestedUser'
import Navbar from './Navbar'
import Loader from './Loader2'

const ShowAllPosts = () => {
    const posts = useSelector(state => state.posts)

    
    if(!posts) return <Loader height={"full"} width={"full"}/>
    return (
        <div className='flex md:w-full md:pt-0 sm:pt-0 pt-10'>
            <Navbar/>
            <div className="flex flex-wrap overflow-y-scroll h-screen md:w-[65%] w-full  justify-center items-center sm:border-x-[1px]   md:border-x-[1px] border-0 border-x-gray-600">
                {posts.posts?.length == 0 && <div className='font-bold text-4xl mt-20 flex justify-center items-center'>No Posts Yet...</div>
                }
                {posts.posts?.map((post) => {
                    return <PostBox key={post._id} post={post} />
                })}
                <div className='loadmore h-20 w-full'></div>
            </div>
            <SuggestedUser/>
        </div>
    )
}

export default ShowAllPosts