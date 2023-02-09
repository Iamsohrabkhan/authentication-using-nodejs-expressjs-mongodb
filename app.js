// sohrab
// KSO9CBly0PPg6cRn
// mongodb+srv://sohrab:KSO9CBly0PPg6cRn@mernstackcluster.j0uoaik.mongodb.net/?retryWrites=true&w=majority

const dotenv=require("dotenv");
dotenv.config({path:"./config.env"});
const  express = require("express");
const router=require("./src/routers/router.js");
const app=express();
const connect=require("./src/database/connect");
// const User=require("./src/database/models/userSchema")

connect();
app.use(express.json())
app.use(router);



app.listen(process.env.PORT,()=>{
    console.log(`Connection is Successfully at ${process.env.PORT}`);
})