

import React from 'react'
import "./New_dep.css"
import { AiOutlineClose } from "react-icons/ai";
import { useFormik } from 'formik';
import axios from "../../Constant/Axiospage";
import Navbar_mang from '../Navbar/Navbar_mang';
import Sidebar from '../Sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';
import { message } from "antd"
import { Oval } from 'react-loader-spinner'
import { useState } from 'react';




function New_dep() {



    type inputvalues = {

        department: string
        doctorname: string
        avilabelday: string
        time: string
        fees: string
    }

    const navigate = useNavigate()

    const [loding,setloding]=useState<boolean>(false)

    const initialValues: inputvalues = {

        avilabelday: "",
        department: "",
        doctorname: "",
        time: "",
        fees: ""
    }


    const { values, errors, handleChange, handleSubmit } = useFormik({

        initialValues: initialValues,

        onSubmit: (values) => {

            setloding(true)

            axios.post("/manage/opnewdata", values).then(() => {

                navigate("/opmange")

            }).catch(err => {

                message.error("somthing worng !")

            })



        }




    })








    return (
        <div>

            <Navbar_mang />
            <hr />

            <div className='pop-main' >

                <Sidebar />


                <div className='pop-new-dep'>



                    <h4 className='pop-new-dep-title'> Add New Department</h4>

                    <form onSubmit={handleSubmit} className='pop-new-dep-form'>

                        <input

                            placeholder='Department Name'
                            type='text'
                            name='department'
                            onChange={handleChange}
                            value={values.department}



                        /><br /><br />

                        <input

                            placeholder='Doctor Name '
                            type='text'
                            name='doctorname'
                            onChange={handleChange}
                            value={values.doctorname}




                        /><br /><br />

                        <input

                            placeholder='availabel days'
                            type='text'
                            name='avilabelday'
                            onChange={handleChange}
                            value={values.avilabelday}



                        /><br /><br />

                        <input

                            placeholder='Time'
                            type='text'
                            name='time'
                            onChange={handleChange}
                            value={values.time}






                        /><br /><br />

                        <input
                            placeholder='enter consultation fees'
                            type='text'
                            name='fees'
                            onChange={handleChange}
                            value={values.fees}



                        />

                        <br /><br />


                        <button type='submit' className='pop-new-dep-subbtn'>

                            {

                                loding ?

                                <div className='new-add-loding' >

                                <Oval
                                    height={30}
                                    width={30}
                                    color="#1A5D1A"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                    visible={true}
                                    ariaLabel='oval-loading'
                                    secondaryColor="#EEF5FF"
                                    strokeWidth={2}
                                    strokeWidthSecondary={2}


                                />


                            </div>

                            : <p> Submit   </p>




                            }

                           


                        </button>



                    </form>










                </div>

            </div>

        </div>
    )
}

export default New_dep
