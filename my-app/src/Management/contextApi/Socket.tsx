


import { createContext ,useMemo} from "react";
import {io} from "socket.io-client"

export const SocketContext:React.Context<any>=createContext(null)






export const SocketProvider=(props:any)=>{

    const Socket=useMemo(()=>io("http://localhost:8000"),[])


          return(

               <SocketContext.Provider  value={{Socket}}>

                {
                     props.children
                }


               </SocketContext.Provider>
          )

        
}