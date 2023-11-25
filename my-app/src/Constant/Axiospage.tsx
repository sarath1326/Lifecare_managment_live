

import axios from "axios" ;

// "http://localhost:3001/"
// "https://lifecarebackend-439a.onrender.com"

const baseUrl="http://localhost:3001/"

   const instans=axios.create({

    baseURL:baseUrl

   })



   export default instans;
