const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const server = express();
const SECRET_KEY = "SECRET_KEY";



const authRouter = require('./routes/Auth');
const agencyRouter = require('./routes/Agency');


// middlewares

const Auth = (req,res, next)=>{
        const token = req.get('Authorizaton').split('Bearer')[1];
        console.log(token);
        try{
            var decoded = jwt.verify(token,SECRET_KEY);
            if(decoded.govtId){
                next();
            }
            else{
                res.sendStatus(401);
            }

        }catch(err){
            res.sendStatus(401);
        }
}
server.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Include cookies if any in the request
  }));


server.use(express.json()); // to parse req.body
server.use('/auth', authRouter.router);
server.use('/agency', agencyRouter.router);







main().catch(err=> console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/RescueConnect');
    console.log('database connected')
}




server.get('/', (req,res)=>{
        res.json({status:"success"});
})


server.listen(8080, ()=>{
    console.log("server started")
})
