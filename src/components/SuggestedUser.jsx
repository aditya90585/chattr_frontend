import React from 'react'

const SuggestedUser = () => {
    return (
        <div className="third w-[35%] hidden md:block">
            <div className="userprofile hidden md:flex mx-5 mt-10">
                <div className="item items-center justify-between flex w-full">
                    <div className='items-center justify-between flex'>
                        <div className=""><img className="w-12 h-12 rounded-full object-cover"
                            src="/images/spiderman2.jpg"
                            alt="vercel" /></div>
                        <div className="ml-2">
                            <div>aditya</div>
                            <div className="text-gray-500">adi</div>
                        </div>
                    </div>
                    <div className="text-sm text-[#2536D0] cursor-pointer">switch</div>
                </div>
            </div>

            <div className="who m-3 py-5 rounded-xl space-y-1">
                <h1 className="font-semibold px-3 flex justify-between items-center">
                    <span className='text-gray-500'>Suggested for you</span>
                    <span>See all</span>
                </h1>
                <div className="item p-3 items-center gap-2 flex justify-between">
                    <div className="flex gap-3">
                        <div className="p1 cursor-pointer">
                            <img className="w-12 h-12 rounded-full"
                                src="/images/spiderman2.jpg"
                                alt="vercel" />
                        </div>
                        <div className="p2 ">
                            <div className='cursor-pointer'>Shad.js</div>
                            <div className="text-gray-500">@shad</div>
                        </div>
                    </div>
                    <div className="p3 cursor-pointer">
                        <button className="text-sm cursor-pointer text-[#2536D0] px-5 py-2 font-bold">Follow</button>
                    </div>
                </div>
            </div>

            <div className="terms sticky top-[84vh] m-3 text-xs text-gray-500 px-3 w-1/2 py-5 space-y-1">
                <span className="hover:underline cursor-pointer mr-2">Terms of Service</span>
                <span className="hover:underline cursor-pointer mr-2">Privacy Policy</span>
                <span className="hover:underline cursor-pointer mr-2">Cookie Policy</span>
                <span className="hover:underline cursor-pointer mr-2">Accessibility</span>
                <span className="hover:underline cursor-pointer mr-2">Ads info</span>
                <span className="hover:underline cursor-pointer mr-2">More</span>
                <span className="hover:underline cursor-pointer mr-2">© 2024 X Corp.</span>
            </div>
        </div>
    )
}

export default SuggestedUser