import React from 'react'
import { TbLoader2 } from "react-icons/tb";

const Loader = ({height,width,className}) => {
    return (
        <div
            className={`h-${height} w-${width} ${className} bg-white flex justify-center items-center relative -z-60`}>
 <div className="flex-col gap-4 w-[100%] h-[100%] flex items-center justify-center">
      <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
        <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full" />
      </div>
    </div>

        </div>
    )
}

export default Loader