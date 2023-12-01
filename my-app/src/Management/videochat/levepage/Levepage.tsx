


import React from 'react'
import "./Levepage.css"
import Navbar_mang from '../../Navbar/Navbar_mang'
import { useEffect, useContext } from 'react'
import { SocketContext } from "../../contextApi/Socket"
import { BsArrowReturnLeft } from "react-icons/bs";
import Swal from 'sweetalert2'
import { error } from 'console'
import { useNavigate } from 'react-router-dom' 
import axios from "../../../Constant/Axiospage"
import {message} from "antd"


function Levepage() {


    const { flag, setflag } = useContext(SocketContext)
    const navigate=useNavigate()

    useEffect(() => {

        if (flag) {

            window.location.reload()

            setflag(false)
        }

        Swal.fire({
            title: "Call Ended",
            color:"red",
            icon:"error",
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: "Home",
            denyButtonText: `Don't save`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {

                axios.post("/manage/video_call_control").then((respo)=>{

                        const result=respo.data
                        if(result.flag){

                            navigate("/enterpage")

                        }else{

                              message.error("server err")
                        }
                }).catch(err=>{

                    message.error("somthing worng ")

                      
                })
                


               
            
            } else if (result.isDenied) {
               
                Swal.fire("Changes are not saved", "", "info");
            }
        });








    }, [])






    return (
        <div>

            <div className='leve-main'   >

                <Navbar_mang />

                <hr />

                <div className='leve-inner-main'>

                    


                </div>










            </div>





        </div>
    )
}

export default Levepage



