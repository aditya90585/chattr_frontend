import React, { useEffect, useState } from 'react'
import { socket } from '../socket/socket';
import Sidebar from './Sidebar';
import MessageBar from './MessageBar';
import Chatbox from './Chatbox';
import { Outlet } from 'react-router-dom';

const Messages = () => {
    const [messageBarstate, setMessageBarstate] = useState(false)
    useEffect(() => {
        setMessageBarstate(true)
        socket.on("connect", () => {
            console.log("✅ Connected to server:", socket.id);
        });

        socket.on("disconnect", () => {
            console.log("❌ Disconnected from server");
        });
    }, [])


    return (
        <div className='w-full  flex justify-end'>
            <Sidebar messageBarstate={messageBarstate} setMessageBarstate={setMessageBarstate} />
            <div className='sm:w-[95%] md:w-[95%] w-[100%] flex'>
                <MessageBar />
                <Outlet/>
            </div>
            
        </div>
    )
}

export default Messages