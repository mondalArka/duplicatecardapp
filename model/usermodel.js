let mongoose=require('mongoose')
let Schema=mongoose.Schema

let userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    user_type:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    status:{
        type:Number
    }
})

let userModel=mongoose.model("userdatabase",userSchema)
module.exports=userModel;