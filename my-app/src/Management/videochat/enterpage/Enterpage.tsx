

import React from 'react'
import "./Enterpage.css"
import Navbar_mang from '../../Navbar/Navbar_mang'
import Sidebar from '../../Sidebar/Sidebar'
import { useContext, useState, useEffect } from 'react'
import { SocketContext } from "../../contextApi/Socket"
import { IoCall } from "react-icons/io5";
import { MdCallEnd } from "react-icons/md";
import Reactplayer from "react-player"
import { FaVideo, FaMicrophone, FaVideoSlash } from "react-icons/fa"; 
import { IoMdSend } from "react-icons/io";
import {message} from "antd"
import Peer from "simple-peer"
import { useNavigate } from 'react-router-dom'


function Enterpage() {

  const navigate=useNavigate()

   type newcalltype={

    _id:string
    name:string
    roomid:string
    flag:boolean
    
  }

  const [newcall,setnewcall]=useState<newcalltype[]>([])
   
  const { Socket } = useContext(SocketContext)


const answerCall=(id:string)=>{
   
     
     const finddata:any= newcall.find((obj)=>obj._id===id)

     const {roomid,name,_id}=finddata

     Socket.emit("answercall",{roomid,name,_id})

     navigate('/chattroomdoc',{state:{name,roomid}})

     
    
    
    }

    const handil_new_call=(data:any)=>{

            setnewcall(data.data)

       
    }


    // socket useefect

    useEffect(()=>{

      Socket.on("new_call_sent_doctor",handil_new_call)


    },[Socket])


    useEffect(()=>{

      Socket.emit("doc_login",{name:"doctor"})


    },[])


  
  

  return (
   
   <div>

     

      <Navbar_mang />
      <hr/>
      

      <div className='enterroom-main'>

        <Sidebar />

        <div>

           
        </div>


       <div className='enterpage-sid-main'>

        <p className='enterpage-title'> New Calls </p>

        {
          newcall.map((obj)=>(

             obj.flag ?

             <div className='enterpage-call-box'>

          <p className='enterpage-call-name'> {obj.name}   </p>

          <MdCallEnd className='enterpage-call-des-icon' />

          <IoCall onClick={()=>{answerCall(obj._id)}}  className='enterpage-call-ans-icon' />

          </div>

          : null
          

          ))
        }

        
          

        

         
       </div>

      

       







      </div>


     







    </div>
  )
}

export default Enterpage
