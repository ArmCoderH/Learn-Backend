//agar password save karne ke thodik just pehle password ko encrypt karde uske liye mongoose ke kuchha hook ka use kiya jata hai esi liye


import mongoose  from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';



const userSchema = new mongoose.Schema(
    {
        username : {
            type : String,
            required : true,
            unique : true,
            index : true,
            lowercase : true,
            trim : true
        },
        email : {
            type : String,
            required : true,
            unique : true,
            lowercase : true,
            trim : true
        },        
        fullname : {
            type : String,
            required : true,
            trim : true,
            index : true,
        },        
        avatar : {
            type : String, //cloudinary url
            required : true,
        },        
        coverImage : {
            type : String, //cloudinary url
        },
        watchHistory : 
        [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'Video'
            },
        ],
        password : {
            type : String,
            required : [true,'Pasword are required'],
            select : false,
        },
        refershToken : {
            type : String
        },
      
        
    },
    {
        timestamps : true
    }
);

//encrype the password using bcrypt
userSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        return next();
    } 
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAceessToken = function(){
    jwt.sign(
        {
            id : this._id,
            username : this.username,
            email : this.email,
            fullname : this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    jwt.sign(
        {
            id : this._id,
            username : this.username,
            email : this.email,
            fullname : this.fullname,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model('User', userSchema);