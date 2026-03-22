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
        if (!socket.connected) {
            socket.connect();
        }

        const onConnect = () => {
            console.log("✅ Connected to server:", socket.id);
        };

        const onDisconnect = () => {
            console.log("❌ Disconnected from server");
        };

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
        };
    }, [])


    return (
        <div className='w-full  flex justify-end'>
            <Sidebar messageBarstate={messageBarstate} setMessageBarstate={setMessageBarstate} />
            <div className='sm:w-[95%] md:w-[95%] w-[100%] flex'>
                <Outlet />
            </div>

        </div>
    )
}

export default Messages