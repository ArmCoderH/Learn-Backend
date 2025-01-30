import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import {ApiError } from "../utils/ApiError.js";
import {uploadFile} from "../utils/cloudnary.js"
import { ApiResponse } from "../utils/ApiRespons.js";

const registerUser = asyncHandler(async (req,res) => {
    const { fullname, email, password,username } = req.body
    console.log("email: ",email);
    
    if (fullname === "") {
        throw new ApiError(400,"fullname is required");
    }
    if (email === "") {
        throw new ApiError(400,"email is required");
    }
    if (password === "") {
        throw new ApiError(400,"password is required");
    }
    if (username === "") {
        throw new ApiError(400,"username is required");
    }

    const exitUser = User.findOne({
        $or: [
            { email },
            { username },
        ],
    })

    

    if (exitUser) {
        throw new ApiError(400,"User or email is already exist");
    }

    const avatarlocalPath = req.files?.avatar[0]?.path
    const covelocalPath = req.files?.coverImage[0]?.path

    if(!avatarlocalPath){
        throw new ApiError(400,"avatar is required");
    }
    if(!covelocalPath){
        throw new ApiError(400,"cover image is required");
    }

    
   const avatar =  await uploadFile(avatarlocalPath)
   const coverImage =  await uploadFile(covelocalPath)

   if(!avatar){
    throw new ApiError(400,"Failed to upload avatar");
   }

   if(!coverImage){
    throw new ApiError(400,"Failed to upload cover image");
   }

   const user = await User.create({
    fullname,
    email,
    password,
    username : username.toLowerCase(),
    avatar : avatar.url,
    coverImage :coverImage?.url || "",
   })

   const createUser = await User.findById(user._id).select("-password -refershToken")

   if(!cerateUser){
    throw new ApiError(500,"Failed to create user");
   }
   return res.status(201).json(
    new ApiResponse(200,cerateUser,"user created successfully")
   )
})

export {registerUser} 
