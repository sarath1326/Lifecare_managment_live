
import React from 'react'
import "./Sidebar.css"
import { useNavigate } from 'react-router-dom'

function Sidebar() {
    const navigate=useNavigate()
    return (
        <div>

            <div className='mang-side-main'>

                <div className='mang-side-opt-box'  onClick={()=>{navigate("/homemange")}}  >

                    <p className='mang-side-opt-text'> Home   </p>



                </div>


                <div className='mang-side-opt-box' onClick={()=>{navigate("/opmange")}}  >

                    <p className='mang-side-opt-text'> OP Booking </p>

                </div>

                <div className='mang-side-opt-box' >

                    <p className='mang-side-opt-text'>    </p>



                </div>


                <div className='mang-side-opt-box'>

                    <p className='mang-side-opt-text'> OP Booking Managment    </p>



                </div>


                <div className='mang-side-opt-box'>

                </div>


                <div className='mang-side-opt-box'>

                </div>

                <div className='mang-side-opt-box'>

                <p className='mang-side-opt-text' onClick={()=>{navigate("/enterpage")}} >  Video Consulting </p>

                </div>










            </div>



        </div>
    )
}

export default Sidebar
