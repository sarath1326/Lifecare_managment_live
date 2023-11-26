


import React from 'react'
import "./Doctors.css"
import Navbar_mang from '../Navbar/Navbar_mang'
import Sidebar from '../Sidebar/Sidebar'
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import { IoCloseCircleOutline } from "react-icons/io5";
import axios from "../../Constant/Axiospage"
import {message} from "antd"


const Doctors = () => {


  type doctorDatatype={

        name:string
        reno:string
        depart:string
        con:string
        pin:string
  }

  const [form, setform] = useState<boolean>(false)
  const [reno, setreno] = useState<string>("")
  const [name, setname] = useState<string>("")
  const [depart, setdepart] = useState<string>("")
  const [con, setcon] = useState<string>("")
  const [doctor,setdoctor]=useState<doctorDatatype[]>([])





  useEffect(()=>{

        
        
      axios("/manage/getdoctordata").then((respo)=>{


        const result=respo.data

        if(result.flag){

            setdoctor(result.data)
        
          }else{
         
             message.error("Server err")

        }

                    
            


      }).catch(err=>{

             
      })

     
  },[])




  const form_submit = () => {


    const data = {
      reno,
      name,
      depart,
      con
    }

    axios.post("/manage/doctor_add", { data: data }).then((respo) => {

            const result=respo.data



             if(result.flag){

              alert(result.pin)

                    
             }


    }).catch(err => {


    })


  }



  return (
    <div>

      <Navbar_mang />
      <hr />

      <div className='doc-main' >

        <Sidebar />

        <div className='doc-data-main'>

          <button className='doc-add-btn' onClick={() => { setform(true) }} > Add doctor  </button>

          <div className='doc-data-tabil' >

            <Table className='table' striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>RG NO</th>
                  <th>Doctor Name</th>
                  <th>Department</th>
                  <th> Contact  </th>

                </tr>
              </thead>
              <tbody>

                {
                  doctor.map((obj)=>(

                    <tr>
                    <td>{obj.reno}</td>
                    <td>{obj.name}</td>
                    <td>{obj.depart}</td>
                    <td> {obj.con} </td>
                    
                     </tr>



                  ))
                }

               

              </tbody>
            </Table>



          </div>


          {

            form ?

              <div className='doctor-form-main' >

                <IoCloseCircleOutline onClick={() => { setform(false) }} className='doc-form-clos' />


                <form action="" className='doc-form'>

                  <input
                    placeholder='Enter Doctor Name'
                    type='text'
                    onChange={(e) => { setname(e.target.value) }}




                  /><br /><br />

                  <input
                    placeholder='Enter Doctor RG NO'
                    type='text'
                    onChange={(e) => { setreno(e.target.value) }}

                  /><br /><br />

                  <input
                    placeholder='Enter Doctor Department'
                    type='text'
                    onChange={(e) => { setdepart(e.target.value) }}

                  /><br /><br />

                  <input
                    placeholder='Enter Doctor Contact'
                    type='text'
                    onChange={(e) => { setcon(e.target.value) }}

                  /><br />

                </form>

                <button className='doc-sub-btn' onClick={form_submit} > Submit   </button>


              </div>

              : null






          }














        </div>



























      </div>








    </div>
  )
}

export default Doctors
