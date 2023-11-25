

import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import {Routes,Route} from "react-router-dom"
import Home_mang from './Management/Home/Home_mang';
import OPmanage from './Management/OPmanage/OPmanage';
import Enterpage from './Management/videochat/enterpage/Enterpage';
import ChatroomDoc from './Management/videochat/chatroom/ChatroomDoc';







function App() {
  return (
    <div>

   

    <Routes>

      

     <Route element={<Home_mang />} path='/'/>

      <Route element={<OPmanage />}  path='/opmange'    />

      <Route element={<Enterpage />} path='/enterpage' />

      <Route element={<ChatroomDoc />} path='/chattroomdoc' />






    </Routes>



      







      
    </div>
  )
}

export default App



