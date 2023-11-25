
import React from 'react'
import "./Home_mang.css"
import Navbar_mang from '../Navbar/Navbar_mang'
import Sidebar from "../Sidebar/Sidebar"
import { useState, useEffect } from 'react';



function Home_mang() {


 
  const [date,setdate]=useState<string>('')

  


  const create_date=()=>{

    var now: any = new Date();
  var year: any = now.getFullYear();
  var month: any = now.getMonth() + 1;
  var cuday: any = now.getDate();


  const result= cuday+"/"+month+"/"+year

  setdate(result)

  

}



  useEffect(()=>{

     create_date()
       
  },[])
  

  





     return (
    <div>

        <Navbar_mang />

        <hr/>
        

        <div className='mang-home-main'>

            <Sidebar />

           <div className='mang-home-iner-main'>

            <div className='mang-home-hed' >

             
             <p className='mang-home-title' > Managment Port   </p>

           
             <span className='mang-home-date' > {date} </span>


            </div>


            <div className='mang-home-center'  >

              <div className='mang-home-center-box' >

                <img src='./hospitallogo.jpeg' className='mang-home-img' />

                <span className='mange-home-tag' > WELCOME </span><br/>
               


              </div>



           </div>


           
           
           
           
           
           
           </div>


           











        </div>
       

       

           


            

           

           








       

       







      
    </div>
  )
}

export default Home_mang
