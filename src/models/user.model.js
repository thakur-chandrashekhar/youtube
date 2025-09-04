import { lowerCase, trim } from "lodash";
import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
 const userSchema = new Schema(
    {
        username:{
            type:String,
            require:true,
            unique:true,
            lowerCase:true,
            trim: true,
            index:true
        },
        email:{
            type:String,
            require:true,
            unique:true,
            lowerCase:true,
            trim: true
            
        },
        fullname:{
            type:String,
            require:true,
            trim: true,
            index:true
        },
        avatar:{
            type:String, //cloudinary url
            require:true
            
        },
        coverImage:{
            type:String,
            
        },
            watchHistory:[
                {
            type:Schema.Types.ObjectId,
            ref:"Video"
                }
            
            ],
            password:{
            type:String,
            required:[true,'password is reqired']
                
        },
       refreshToken:{
            type:String,
            
        },

        },
        {
            timestamps:true
        }

    
 )
 userSchema.pre("save", async function(next){
    if (!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password,10)
    next()
 })
userSchema.method.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password,this.password)
    
}
userSchema.method.generateAccessToken = function(){
  return  jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullname:this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.method.generateRefreshToken = function(){
    return  jwt.sign(
        {
            _id:this._id,
           
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
 export const User = mongoose.model("User",userSchema)