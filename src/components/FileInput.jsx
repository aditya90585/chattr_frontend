import React, { useId, useState } from 'react'
import Input from './Input';

const FileInput = ({
    type = "text",
    placeholder = "",
    className = "",
    label,
    preview,
    changepreview,
    ...props
}, ref) => {

    const id = useId()


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file); // create temporary URL
            changepreview(imageUrl)
        }
    };
    return (
        <div className={`flex ${preview ? " md:w-[60%] sm:w-[60%] w-full  md:h-full sm:h-full h-[60%]" : "w-full h-full"}  justify-center items-center `}>
            {
                (label) && <label
                    className={`  ${preview ? "hidden" : "inline-block"} text-base font-semibold p-1 cursor-pointer bg-[#4150F7] text-white rounded`}
                    htmlFor={id}>
                    {label}
                </label>
            }
            <input className={`${className} hidden`}
                type="file"
                accept="image/*"
                onInput={handleFileChange}
                placeholder={placeholder}
                ref={ref}
                {...props}
                id={id}
            />

            {preview && (
                <div className=" md:h-full sm:h-full h-full w-full md:pr-4 sm:pr-4 pr-0">
                    <img
                        src={preview}
                        alt="preview"
                        className="h-full w-full object-cover rounded shadow-[2px_2px_5px_black]"
                    />
                </div>
            )}
        </div>
    )
}

export default FileInput