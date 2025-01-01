const express = require('express')
const app = express();
const userRouter = require('./routes/user.routes')
const dotenv = require('dotenv')
dotenv.config();
const connectionDb =  require('./config/db');
const cookieParser = require('cookie-parser');
connectionDb();




app.use(express.static('public'))
app.use(cookieParser());
app.set('view engine',"ejs")
app.use(express.json());
app.use(express.urlencoded({extended:true}));





app.use('/user',userRouter);
app.listen(3000,()=>{
    console.log("Server is running on 3000 port✨");
    
})