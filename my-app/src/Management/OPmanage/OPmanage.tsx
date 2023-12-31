

import React from 'react'
import "./OPmanage.css"
import Navbar_mang from '../Navbar/Navbar_mang'
import Sidebar from "../Sidebar/Sidebar"
import Dropdown from 'react-bootstrap/Dropdown';
import New_dep from './New_dep';
import { useState, useEffect } from 'react';
import { FiRefreshCcw } from "react-icons/fi";
import { AiOutlineCheck } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import axios from "../../Constant/Axiospage";
import { Oval } from 'react-loader-spinner'
import { AiOutlineCloseCircle } from "react-icons/ai";
import { message } from "antd"
import { useNavigate } from 'react-router-dom';
import { FaRegClock } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";






function OPmanage() {

    type fetchdataType = {

        user: String
        department: String
        patientname: String
        address: String
        age: String
        bystandername: String
        date: String
        doctername: String
        email: String
        mobile: any
        pyment: String
        gender: String
        fees: String
        marking: Boolean
        bookingid: number
        paystatus: string
        cancel: boolean
        reschedule: boolean
        new: boolean



    }


    const navigate = useNavigate()


    const [pop, setpop] = useState<boolean>(false);
    const [addDoctor, setaddDoctor] = useState<boolean>(false);
    const [getdata, setgetdata] = useState<fetchdataType[]>([])
    const [spinner, setspinner] = useState<boolean>(true)
    const [empty, setempty] = useState<boolean>(false)
    const [viewbox, setviewbox] = useState<boolean>(false)
    const [single, setsingle] = useState<fetchdataType>()
    const [input, setinput] = useState<any>("")
    const [color, setcolor] = useState<string>("1px solid red")
    const [searchflag,setsearchflag]=useState<boolean>(true)
  



    const fetchData = () => {

        setspinner(true)

        axios("/manage/getbooking").then((respo) => {

            const result = respo.data

            if (result.flag) {

                const resData = result.data


                if (resData.length === 0) {

                    setspinner(false)
                    setempty(true)



                } else {

                    setgetdata(result.data)
                    setspinner(false)
                    console.log(result.data)

                }


            } else {

                console.log("errr")
            }
        }).catch(err => {

            console.log("server err ")


        })

    }


    useEffect(() => {

        fetchData()


    }, [])


    const refresh = () => {

        fetchData();
    }


    const bokking_view = (id: number) => {



        const res = getdata.find((obj) => obj.bookingid === id)

        setsingle(res)

        setviewbox(true)


    }

    const searchbtn = () => {

      if(input){

        setsearchflag(false)
        const res = getdata.find((obj) => obj.bookingid === input || obj.mobile.includes(input))

        if (res) {

            setsingle(res)
            setviewbox(true)

            console.log(res.mobile)

        } else {

            message.error("No Result Found ")

        }
     
    
    }else{

    message.error("input is empty !")

     }

       
          
    }

    // user marking 

    const marking = (id: number, index: number) => {


        axios.post("/manage/opmarking", { data: id }).then((respo) => {

            const result = respo.data

            if (result.flag) {

                getdata.splice(index, 1)
                setgetdata([...getdata])


            } else {

                message.error("server err")
            }


        }).catch(err => {

            message.error("somthing worng...try again ")
        })







    }

    const booking_cancel = (id: number, index: number) => {


        axios.post("/manage/bookingcancel", { id }).then((respo) => {

            const result = respo.data

            if (result.flag) {

                message.success("this booking canceld")

                getdata.splice(index, 1)

                setgetdata([...getdata])


            } else {

                message.error("server err")
            }

        }).catch(err => {




        })


    }

    const resudule_update=(id: number, index: number)=>{


           axios.post("/manage/resudule_update",{id:id}).then((respo)=>{

            const result=respo.data

              if(result.flag){

                   message.success("Booking resuduled")

                   getdata.splice(index,1)
                   setgetdata([...getdata])
              
                }else{

                    message.error("server err")


              }

                
           }).catch(err=>{

            message.error("somthing worng ")

               
           })

          
    }

   

    return (
        <div>

            <Navbar_mang />

            <hr />


            <div className='mang-home-main'>

                <Sidebar />

                <div className='mang-home-iner-main'>

                    <Dropdown className='mang-op-drop'>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Settings
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1" onClick={() => { navigate("/newdep") }}  > Add new Department </Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Edit data</Dropdown.Item>
                            <Dropdown.Item href="#/action-3" onClick={() => { navigate("/addopdoctor") }}    >Add Doctor</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>


                    <div className='mang-op-refr-main' onClick={refresh}   >

                        <span className='mang-op-refr-text'> Refresh</span>

                        <FiRefreshCcw className='mang-op-refr-icon' />

                    </div>



                    <div className='mang-op-search-main'>


                        <input className='mang-op-search-input'

                            placeholder='Booking ID  or Mobile Number Enter and Search '

                            type='text'
                            onChange={(
                                ev: React.ChangeEvent<HTMLInputElement>,
                            ): void => {
                                setinput(
                                    parseInt(ev.target.value, 10),
                                );
                            }}

                            // onChange={(e:any)=>{setinput(e.target.value)}}
                            
                            value={input}

                          

                        />

                        {

                            searchflag ?

                            <button onClick={searchbtn} className='mang-op-serch-btn'>   <BsSearch />    </button>

                            :

                            <button onClick={()=>{ setinput("") ; setsearchflag(true)    }} className='mang-op-serch-btn'>   <RxCross1 />     </button>



                        }

                       



                    </div>


                    <div className='mang-op-newbox-main'>

                        <p className='mang-op-new-title'> New Booking  </p>

                        {

                            spinner ?

                                <div className='mang-spinner' >

                                    <Oval
                                        height={40}
                                        width={40}
                                        color="#004225"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                        visible={true}
                                        ariaLabel='oval-loading'
                                        secondaryColor="#FFFBF5"
                                        strokeWidth={2}
                                        strokeWidthSecondary={2}


                                    />

                                </div>



                                :

                                empty ?

                                    <p className='mang-op-empty'> No Data Found</p>

                                    :






                                    getdata.map((obj, index) => (



                                        obj.marking ?

                                            <div className='mang-op-data-box'>

                                                <span onClick={() => { bokking_view(obj.bookingid) }} className='mange-op-ptname'> {obj.patientname} </span><br />

                                                <span onClick={() => { bokking_view(obj.bookingid) }} className='mange-op-ptname'> {obj.bookingid} </span>

                                                  {
                                                     
                                                     obj.new ?

                                                     <AiOutlineCheck onClick={() => { marking(obj.bookingid, index) }} className='mange-mark-icon' />

                                                     : null


                                                  }




                                                {
                                                    obj.cancel ? <ImCross onClick={() => { booking_cancel(obj.bookingid, index) }} className='mange-de-icon' />

                                                        : null
                                                }

                                                {

                                                    obj.reschedule ?

                                                        <FaRegClock className='mange-res-icon' onClick={()=>{resudule_update(obj.bookingid, index)}}     />

                                                        : null
                                                        
                                                 }





                                            </div>

                                            : null









                                    ))



                        }











                    </div>


                    {

                        viewbox ?


                            <div className='mange-op-view'>

                                <p className='mange-op-view-title'> Patient Details  </p>

                                <AiOutlineCloseCircle onClick={() => { setviewbox(false) }} className='mange-op-close-icon' />


                                <div className='op-view-mainbox'>


                                    <div className='op-view-hed-box'>

                                        <span> Booking ID :    </span><br />

                                        <span className='pyment-span' > Patient Name :    </span><br />

                                        <span> Age :    </span><br />

                                        <span> Address:    </span><br /><br />

                                        <span> Mobile NO:    </span><br />

                                        <span> Date: </span><br />

                                        <span> Doctor Name:    </span><br />

                                        <span> Department  :    </span><br />

                                        <span className='pyment-span'>  Pyment </span><br />

                                        <span className='pyment-span'> Pyment Status    </span>








                                    </div>

                                    <div className='op-view-res-box'>

                                        <span> {single?.bookingid}  </span><br />

                                        <span className='pyment-span'> {single?.patientname} </span><br />

                                        <span> {single?.age} </span><br />

                                        <span> {single?.address} </span><br /><br />

                                        <span> {single?.mobile} </span><br />

                                        <span> {single?.date} </span><br />

                                        <span>{single?.doctername} </span><br />

                                        <span>  {single?.department} </span><br />

                                        <span className='pyment-span'  > {single?.pyment} </span><br />

                                        <span className='pyment-span' > {single?.paystatus}  </span>






                                    </div>












                                </div>




                            </div>

                            : null


                    }



                </div>






            </div>





        </div>


    )
}

export default OPmanage

