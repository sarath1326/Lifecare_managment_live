

import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import {Routes,Route} from "react-router-dom"
import Home_mang from './Management/Home/Home_mang';
import OPmanage from './Management/OPmanage/OPmanage';
import Enterpage from './Management/videochat/enterpage/Enterpage';
import ChatroomDoc from './Management/videochat/chatroom/ChatroomDoc';
import New_dep from './Management/OPmanage/New_dep';
import Adddoctor from "./Management/Doctors/Doctors"
import Doctors from './Management/Doctors/Doctors';
import Addopdoctor from './Management/addopDoctor/Addopdoctor';
import Levepage from './Management/videochat/levepage/Levepage';







function App() {
  return (
    <div>

   

    <Routes>

      

     <Route element={<Home_mang />} path='/'/>

      <Route element={<OPmanage />}  path='/opmange'    />

      <Route element={<Enterpage />} path='/enterpage' />

      <Route element={<ChatroomDoc />} path='/chattroomdoc' />

      <Route element={<New_dep />} path='/newdep' />

      <Route element={<Adddoctor />} path='/addDoctor' />

      <Route element={<Doctors />} path='/doctors' />

      <Route element={<Addopdoctor />} path='/addopdoctor' />

      <Route element={<Levepage />} path='/levepage' />








    </Routes>



      







      
    </div>
  )
}

export default App



