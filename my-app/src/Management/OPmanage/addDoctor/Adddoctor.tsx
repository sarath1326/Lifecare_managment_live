



import React from 'react'
import "./Adddoctor.css"
import { AiOutlineClose } from "react-icons/ai";
import { useState, useEffect } from 'react';
import axios from "../../../Constant/Axiospage"
import { message } from "antd"


type propstype = {

    func: () => void
}

function Adddoctor(props: propstype) {


    type datatype = [{

        availabel: string
        department: string
        doctors: string[]
        time: string
        _id: string
    }]

    //  type findDoctortype={

    //     availabel:string
    //     department:string
    //     doctors:string
    //     time:string
    //     _id:string

    //  }






    const [data, setdata] = useState<datatype>()
    const [name, setname] = useState<string[]>()
   
    const [btn, setbtn] = useState<boolean>(false)
    const [form, setform] = useState<boolean>(false)
    const [input, setinput] = useState<string>()
    const [findDepo, setfindDepo] = useState<string>()




    useEffect(() => {

        axios("/manage/alldepa").then((respo) => {

            let result = respo.data

            if (result.err) {

                console.log("err")

            } else if (result.flag) {


                setdata(result.data)

            } else {

                console.log("no data found")

            }


        }).catch(err => {

            console.log("server err")
        })

    }, [])


    const findDoctor = (depo: string) => {

        setfindDepo(depo)  // user select depo globel state

        let res = data?.find((obj) => (obj.department === depo))
        
        setname(res?.doctors)
        
        
        setbtn(true)

    }

    const addDoctor = () => {


        let findata = {

            doctoeName: input,
            depo: findDepo
        }

       

        
       

        axios.post("/manage/add_doctor", findata).then((respo) => {


            if (respo.data.err) {

                message.error("server errr");

            } else if (respo.data.flag) {

               let updateData:datatype=respo.data.data
                

                let res = updateData.find((obj) => (obj.department === findDepo));
                
                setname(res?.doctors);

               message.success("data adedd");
            setform(false)
                
             } else {

             message.error("server err");

            }

        }).catch(err => {

            message.error(" somthing worng...check your connection ");


        })
    }






    return (
        <div>


            <div className='pop-new-dep'>

                <button className='pop-new-dep-closbtn' onClick={() => { props.func() }}>  <AiOutlineClose />  </button>


                <h5 className='adddoc-title'> Add Doctor </h5>


                <div className='adddoc-inner-box'>

                    <select className='adddoc-select' onChange={(e) => { findDoctor(e.target.value) }} >

                        <option> Select Department</option>

                        {
                            data?.map((obj) => (

                                <option value={obj.department} > {obj.department}</option>



                            ))

                        }
                    </select><br /><br />


                    <p className='adddoc-sectitle'> Availabel Doctors </p>


                    {

                        name?.map((obj, index) => (

                            <> <span> {index + 1} </span> ) <span> {obj}</span><br /><br />   </>

                        ))
                    }


                    {

                        btn ?

                            <button onClick={() => { setform(true) }} className='adddoc-new-btn'>Add New</button>

                            : null



                    }

                    {

                        form ?

                            <>

                                <div className='adddoc-form-box-main'>

                                    <form>

                                        <label> Doctor Full Name </label><br />

                                        <input onChange={(e) => { setinput(e.target.value) }} type='text' /><br /><br />

                                        <button onClick={addDoctor} className='adddoc-save-btn' > Save </button>


                                    </form>





                                </div>



                            </>

                            : null


                    }













                </div>
















            </div>










        </div>
    )
}

export default Adddoctor
