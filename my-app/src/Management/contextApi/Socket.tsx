


import { createContext ,useMemo,useState} from "react";
import {io} from "socket.io-client"

export const SocketContext:React.Context<any>=createContext(null)

// "https://lifecarebackend-439a.onrender.com"






export const SocketProvider=(props:any)=>{

    const Socket=useMemo(()=>io( "https://lifecarebackend-439a.onrender.com"),[])
    const [flag,setflag]=useState<boolean>(false)


          return(

               <SocketContext.Provider  value={{Socket,flag,setflag}}>

                {
                     props.children
                }


               </SocketContext.Provider>
          )

        
}