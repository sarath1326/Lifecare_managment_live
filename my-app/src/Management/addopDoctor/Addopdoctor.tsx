


import React from 'react'
import "./Addopdoctor.css"
import Navbar_mang from '../Navbar/Navbar_mang'
import Sidebar from '../Sidebar/Sidebar'
import axios from "../../Constant/Axiospage"
import { useState, useEffect } from 'react';
import { message } from "antd"

function Addopdoctor() {

    type getdatatype = {

        _id: string
        department: string
    }

    const [getdata, setgetdata] = useState<getdatatype[]>([])
    const [doctor, setdoctor] = useState<string[]>([])
    const [flag, setflag] = useState<boolean>(false)
    const [name,setname]=useState<string>('')
    const [depoid,setdepoid]=useState<string>('')

    useEffect(() => {


        axios("/manage/alldepa").then((respo) => {

            const result = respo.data

            if (result.flag) {

                setgetdata(result.data)
            } else {


                message.error("server err")
            }
        }).catch(err => {

            message.error("somthing worng! check connection ")
        })

    }, [])

    const show_doctors = (id: string) => {

             
         setdepoid(id)

        const res: any = getdata.find((obj) => obj._id === id)

        setdoctor(res.doctors)
    }


    const add_doctor=()=>{

           setdoctor([...doctor,name])

         const data={

            doctoeName:name,
            depo:depoid

                }

    axios.post("/manage/add_op_doctor",{data}).then((respo)=>{

                
               const result=respo.data

               if(result.flag){

                     setflag(false)
               }else{

                 message.error("server err")
               }
    }).catch(err=>{

             message.error("somthing worng")
    })


                

           
    }







    return (
        <div>

            <Navbar_mang />
            <hr />

            <div className='adddoc-main'  >


                <Sidebar />


                <div className='adddoc-drop-box' >

                    <select onChange={(e) => { show_doctors(e.target.value) }} className='adddoc-selet'  >



                        <option> Select Department  </option>

                        {

                            getdata.map((obj) => (

                                <option value={obj._id} > {obj.department} </option>

                            ))


                        }





                    </select>

                    <button className='adddoc-btn' onClick={()=>{setflag(true)}}  > Add Doctor  </button>

                    <div className='doctor-name-div'  >


                        {

                            doctor.map((obj, index) => (

                                <p> {index + 1} ) {obj}  </p>
                            ))



                        }





                    </div>

                    {

                        flag ?

                            <div className='add-form-box'  >

                                <input
                                    placeholder='Enter Doctor Name'
                                    type='text'
                                    onChange={(e)=>{setname(e.target.value)}}

                                />

                                < button className='docop-add-btn' onClick={add_doctor}  > Add  </button>


                            </div>

                            : null




                    }








                </div>










            </div>










        </div>
    )
}

export default Addopdoctor

