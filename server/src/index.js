import express from 'express';
import bodyparser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import schema from '../models/Schema.js';
import {comparepassword,hashpassword} from './Password.js';
import clientRoures from '../routes/Client.js'
import generalRoures from '../routes/general.js';
import salesRoures from '../routes/Sales.js';
import managementRoures from '../routes/Management.js';
const port =process.env.PORT || 3177;
const JWT_secret = "56778sagffdyyetcjgRUTFUVfysnc'pwiy637428376$%^&*()^$#[]{}ggksj'jgkxvnxS:Kjwiuvylkn c,m ";

//data imports
import User from '../models/User.js';
import Product from '../models/Product.js';
import ProductStat from '../models/ProductStat.js';
import Transaction from '../models/Transaction.js';
import OverallStat from '../models/OverallStack.js';
import AffiliateStat from '../models/AffiliateStat.js';
import {dataUser,dataProduct,dataProductStat,dataTransaction,dataOverallStat,dataAffiliateStat} from '../data/index.js';


//CONFIGURATION

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.contentSecurityPolicy({policy:"cross-origin"}));
app.use(morgan("common"));
app.use(bodyparser.json());
app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended:false}));
app.use(express.urlencoded({
    extended:false,
}));
app.use(cors());
const  Model = mongoose.model('Userschema');

app.post('/register',async(req,res)=>{
    const {name,empid,email,password,cpassword,phoneno} = req.body;
    const encryptpassword = await hashpassword(password);
    console.log(req.body)
    try {
        // console.log("kkkkkk")
      const val = await schema.create({
          name,
          empid,
          email,
          password:encryptpassword,
          cpassword,
          phoneno,
      })
    //   console.log("jjjjjj")
      res.send({status:'Values are Posted'})
      
      console.log(val);
      console.log("values are posted")
    } catch (error) {
      res.send({status:"error",message:error})
    }
  });

  
app.post('/login',async(req,res)=>{
    try {
        const {email,password} = req.body;
        console.log(req.body);
        const user = await Model.findOne({ email}).select('+password');
       
        if (!user) {
            console.log("user is not found")
            res.json({status:"user is not found"})
        }

        // Compare passwords
        const match = await comparepassword(password, user.password);

        if (match) {
            // Generate JWT token
            jwt.sign({ email: user.email, id: user._id, name: user.name }, JWT_secret, {expiresIn: "15m"}, (err, token) => {
                if (err) {
                    console.log(err); // Log the error
                    res.json({status:"Token generation failed"})
                    return console.log('Token generation failed')
                }
                // Send the token in the response
                console.log(token)
                res.json({status:"ok",data:token})
                res.cookie("token", token).json({ user, token });
            });
        } else {
            // Password does not match
           console.log('Password does not match')
           res.json({status:'Password does not match'})
        }
    } catch (error) {
        console.log(error); // Log the error
        console.log('Internal Server Error');
        // global.alert('email or password is incorrect');
        res.json({status:'Internal Server Error'});
    }
});
app.post('/home',async(req,res)=>{
    const {token} =req.body
    try {
      const user = jwt.verify(token,JWT_secret,(err,res)=>{
          if(err){
              return "token expired"
          }
          return res;
      });
      console.log(user);
      if(user == "token expired" ){
          return res.send({status:"error",data:"token expired"})
      }
      const useremail =user.email;
      schema.findOne({email:useremail})
      .then((data)=>{
          res.send({status:"ok",data:data})
      })
      .catch((err)=>{
          res.send({status:"error",data:data})
      })
    } catch (error) {
      
    }
  });
//  4  Routes 
app.use("/client" , clientRoures)
app.use("/general" , generalRoures)
app.use("/management" , managementRoures)
app.use("/sales" , salesRoures)

mongoose.connect('mongodb://localhost:27017/dash',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    app.listen(port,()=>console.log(`Searver port : ${port} `));
// only add data one time
// Product.insertMany(dataProduct);
// ProductStat.insertMany(dataProductStat);
    // User.insertMany(dataUser);
    // Tracsaction.insertMany(dataTransaction);
    // OverallStat.insertMany(dataOverallStat);
    // AffiliateStat.insertMany(dataAffiliateStat);
})
.catch((err)=>console.log(`${err} did not connect`));