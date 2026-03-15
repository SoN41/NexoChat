import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from 'socket.io-client'

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
}

export const SocketContextProvider = ({children}) => {
    const {authUser} = useAuthContext();
    const [socket , setSocket] = useState(null);
    const [onlineUsers , setOnlineUsers] = useState([]);

    useEffect(() => {
        if(authUser){
            const newSocket = io("http://localhost:5000",{
                query:{
                    // FIX: Use authUser.uid for Firebase users, 
                    // fallback to _id just in case you still have old local users
                    userId : authUser.uid || authUser._id, 
                }
            });
            setSocket(newSocket);
            
            newSocket.on("getOnlineUsers" , (users) => {
                setOnlineUsers(users);
            })
            
            return () => newSocket.close();
        } else {
            if(socket){
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser])

    return(
        <SocketContext.Provider value={{socket , onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
}