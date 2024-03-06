import mongoose from "mongoose";
 const Details =new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    empid:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        unique:true,
    },
    cpassword:{
        type:String,
        required:true,
        unique:true,
    },
    phoneno:{
        type:String,
        required:true,
        unique:true,
    },
    
});
// mongoose.model('add',Details);
const Add =mongoose.model("Add",Details)
export default Add;
