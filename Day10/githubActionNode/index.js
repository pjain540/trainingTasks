//imported express
const express = require('express')
//create express app
const app = express()

//create an route
app.get('/',(req,res)=>{
    res.send("Hello CI/CD")
})

//server listen
app.listen(3000,()=> console.log("Server is started on port:3000"))

