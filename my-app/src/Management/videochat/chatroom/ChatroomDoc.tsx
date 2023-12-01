

import React from 'react'
import "./ChatroomDoc.css"
import { IoMdSend } from "react-icons/io";
import { FaVideo, FaMicrophone, FaVideoSlash } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useContext } from 'react'
import { SocketContext } from "../../contextApi/Socket"
import Peer from "simple-peer"
import Reactplayer from "react-player"
import { message } from "antd"
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';


function ChatroomDoc() {

  type msgtype = {


    name: string
    msg: string


  }


  const [usermsg, setusermsg] = useState<string[]>([])
  const [msg, setmsg] = useState<string>('')
  const [mymsg, setmymsg] = useState<string[]>([])
  const [mystream, setmystream] = useState<any>(null)
  const [userstream, setuserstream] = useState<any>(null)
  const [reqbtn, setreqbtn] = useState<boolean>(true)

  const [msglist, setmsglist] = useState<msgtype[]>([])

  const connectionRef: any = useRef();


  const location = useLocation()
  const navigate=useNavigate()

  const { name, roomid } = location.state

  const { Socket , setflag } = useContext(SocketContext)





  const session_req = () => {

    setreqbtn(false)



    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: mystream
    })


    peer.on("signal", (data) => {

      Socket.emit("call_user", {
        roomid: roomid,
        signalData: data,

      })

      message.success("sesseion request sent to patient")
    })

    peer.on("stream", (stream) => {

      console.log("user stream", stream)
      setuserstream(stream)

    })

    Socket.on("user_signal_reseve", (data: any) => {

      console.log("user session accepted", data.signal)

      peer.signal(data.signal)

    })

    connectionRef.current = peer;

  }

  const reseve_msg = (data: any) => {

    console.log("usermsg", data.msg)



    const data_use = {

      name: "use",
      msg: data.msg
    }

    setmsglist([...msglist, data_use])

    console.log(usermsg)


  }


  const leve_req_resev = (data: any) => {
    
      setflag(true)
    console.log(" user leve request ")
   
    setuserstream(null)

    navigate("/levepage")
  
  
  }








  useEffect(() => {

    Socket.on("doctor_msg_receve", reseve_msg)
    Socket.on("leve_req_user",leve_req_resev)

  }, [msglist])



  useEffect(() => {

    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((res) => {

      setmystream(res)
    })

    


  }, [])


  const sent_msg = () => {

    const data = {

      name: "my",
      msg: msg
    }

    setmsglist([...msglist, data])

    Socket.emit("send_msg_to_user", { msg: msg, to: roomid })

    setmsg('')

  }


  const call_leve_req_sent=()=>{

          setmystream(null)
          setflag(true)

          Socket.emit("doctor_sent_leve_req",{to:roomid})

          navigate("/levepage")
 
 
        }








  return (
    <div>

      <div className='chtroom-main'>


        <h3 className='chtroom-title' > Consulting Room  </h3>



        <p className='chtroom-text-1' > Your Room ID :<span className='chtroom-id' > {roomid}  </span>  </p>

        <p className='chtroom-con-name' > Your Connected To <span className='chtroom-con-data' >  {name}  </span>  </p>

        {
          reqbtn ?

            <button onClick={session_req} className='chtroom-session_btn'  > Start Session  </button>

            : null

        }


        <div className='chtroom-video-main'>

          <div className='chatroom-my-main'>

            <div className='chtromm-my-box' >


              <Reactplayer width={200} height={200} url={mystream} playing muted />






            </div>

            <div className='chatroom-my-control'>

              <button className='chatroom-end-call'  onClick={call_leve_req_sent}    > End Call </button>



              <FaVideo className='chatroom-video-icon' />

              <FaMicrophone className='chatroom-mic-icon' />




            </div>


          </div>



          <div className='chtromm-doctor-box'>


            <Reactplayer width={400} height={300} url={userstream} playing muted />



          </div>


          <div className='chatroom-chatbox'>

            <p className='chtroom-chatbox-title' > Chat Box  </p>
            <hr />

            <div className='chtbox-main' >


              {

                msglist.map((obj) => (

                  <div id={obj.name === "my" ? "myid-doc" : "use"}  >

                    <p className='msg' > {obj.msg}  </p>

                  </div>




                ))

              }



            </div>

            <div className='chat-box-msg-input-div'>

              <hr />

              <input
                className='chatbox-input'
                type='text'
                placeholder='Send Some Mesages'
                onChange={(e) => { setmsg(e.target.value) }}
                value={msg}


              />

              <IoMdSend className='chatbox-send-icon' onClick={sent_msg} />


            </div>







          </div>





        </div>


      </div>








    </div>
  )
}

export default ChatroomDoc
