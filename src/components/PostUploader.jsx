import { useRef, useState,useEffect } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import Button from "./Button";
import FileInput from "./FileInput";
import { IoIosShareAlt } from "react-icons/io";
import { set, useForm } from "react-hook-form";
import axiosInstance from "../features/axioxInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useGetAllPosts from "../hooks/useGetAllPosts";

export default function PostUploader({ open, onClose }) {
    const modalRef = useRef();
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false)
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm()

    const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
            setPreview(null)
            reset()
        }
    };



    const closeAll = () => {
        onClose()
        setPreview(null)
        reset()
    }

    const sharePost = async (data) => {
        let toastId
        try {
            if (loading) {
                toast.error("please wait until your post uploaded")
                return
            }
            setLoading(true)

            toastId = toast.loading("Uploading post...");
            const formData = new FormData();
            formData.append("caption", data.caption);
            formData.append("post-image", data.image[0])

            closeAll()
            const res = await axiosInstance.post("/posts/createpost", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            if (res.data.success) {
                toast.update(toastId, {
                    render: res?.data?.message || "Post created successfully",
                    type: "success",
                    isLoading: false,
                    autoClose: 3000,
                });
                setLoading(false)
                closeAll()
            }

        } catch (error) {
            console.log(error)
            toast.update(toastId, {
                render: error?.response?.data?.message || "Some error occured Please try again",
                type: "error",
                isLoading: false,
                autoClose: 5000,
            });
            setLoading(false)
            closeAll()
        }
    }
    if (!open) return null;
    return (
        <div
            className="fixed z-50 inset-0 bg-black/50 flex justify-center items-center"
            onClick={handleClickOutside}
        >
            <div
                ref={modalRef}
                className={`bg-white p-6  rounded-lg ${preview ? "w-[600px] sm:h-[400px] md:h-[400px] h-full" : "w-[400px] sm:h-[300px] md:h-[300px] h-[50%] "} shadow-lg`}
            >
                <div className="w-full h-[10%] flex justify-between items-center">
                    <h2 className="text-xl font-bold">Create new Post</h2>
                    <Button
                        onClick={closeAll}
                        className="text-black hover:text-gray-500 rounded-full cursor-pointer"
                    >
                        <IoCloseCircleOutline />
                    </Button>
                </div>

                <div className={`${preview?"md:h-[90%] sm:h-[90%] h-[50%]":"h-[90%]"} h-[90%] w-full py-2 flex  justify-center items-center`}>
                    <form onSubmit={handleSubmit(sharePost)} className="h-[100%] w-full flex md:flex-row sm:flex-row flex-col justify-between items-center" action="">

                        <FileInput  {...register("image", {
                            required: true
                        })}
                            preview={preview}
                            changepreview={(e) => setPreview(e)}
                            label={"Select From Computer"} />
                        {preview &&
                            <div className="md:w-[40%] sm:w-[40%] w-full md:h-full sm:h-full h-[40%]" >
                                <textarea type="text"
                                    className="w-full md:h-[86%] sm:h-[86%] h-[80%] p-2 resize-none border text-base rounded"
                                    placeholder="Write caption..."
                                    {...register("caption", {
                                        required: true
                                    })}
                                />
                                <Button type="submit" className="bg-[#254CD8] text-white flex justify-center items-center gap-x-3 cursor-pointer text-xl w-full md:h-[12%] sm:h-[12%] h-[20%] rounded" ><span className="">Share</span><IoIosShareAlt className="" /></Button>
                            </div>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
}
