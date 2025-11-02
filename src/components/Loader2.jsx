import React from 'react'
import { TbLoader2 } from "react-icons/tb";

const Loader = ({height,width}) => {
    return (
        <div
            className={`h-${height} w-${width} bg-white flex justify-center items-center relative -z-60`}>
            <TbLoader2 className='text-black size-20 animate-spin' />
        </div>
    )
}

export default Loader