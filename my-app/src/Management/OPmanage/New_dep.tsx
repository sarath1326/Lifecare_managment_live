

import React from 'react'
import "./New_dep.css"
import { AiOutlineClose } from "react-icons/ai";
import { useFormik } from 'formik';
import axios from "../../Constant/Axiospage" ;


type propstype={
    data:()=>void
}

function New_dep(props:propstype) {

    type inputvalues={

        department:string
        doctorname:string
        avilabelday:string
        time:string
        fees:string
    }

    const  initialValues:inputvalues={
        
        avilabelday:"",
        department:"",
        doctorname:"",
        time:"",
        fees:""
    }


    const {values,errors,handleChange,handleSubmit}=useFormik({

        initialValues:initialValues,

        onSubmit:(values)=>{

               axios.post("/manage/opnewdata",values).then(()=>{

                   

               }).catch(err=>{

                   console.log("err")
               })
           
            props.data()

        }
        

        

    })








  return (
    <div>


       <div className='pop-new-dep'>

        <button  className='pop-new-dep-closbtn' onClick={()=>{props.data()}}>  <AiOutlineClose />  </button>

        <h4 className='pop-new-dep-title'> Add New Department</h4>

            <form  onSubmit={handleSubmit}     className='pop-new-dep-form'>

                <input  

                placeholder='Department Name'
                type='text'
                name='department'
                onChange={handleChange}
                value={values.department}
               
                
                
                /><br/><br/>

                <input 

                placeholder='Doctor Name '
                type='text'
                name='doctorname'
                onChange={handleChange}
                value={values.doctorname}
                
                
                
                
                /><br/><br/>

                <input 

                placeholder='availabel days'
                type='text'
                name='avilabelday'
                onChange={handleChange}
                value={values.avilabelday}
                
                
                
                /><br/><br/>

                <input 

                placeholder='Time'
                type='text'
                name='time'
                onChange={handleChange}
                value={values.time}



                
                
                
                /><br/><br/>

                <input 
                placeholder='enter consultation fees'
                type='text'
                name='fees'
                onChange={handleChange}
                value={values.fees}
                
                
                
                />

                <br/><br/>

                
                <button type='submit'  className='pop-new-dep-subbtn'> submit</button>



            </form>










       </div>

        
      
    </div>
  )
}

export default New_dep
