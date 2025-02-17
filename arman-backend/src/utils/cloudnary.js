import {v2 as cloud} from 'cloudinary'
import fs from 'fs'

import { v2 as cloudinary } from 'cloudinary';


    cloudinary.config({ 
        cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
        api_key:process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });
        

    const uploadFile = async (filePath) => {
        try {
            if (!filePath) return null;
            const response =  await cloudinary.uploader.upload(filePath, {
                resource_type : 'auto'
            })

            //file has been successfully

            // console.log("Uploading file",response.url);
            fs.unlinkSync(filePath)
            return response
            
        } catch (error) {
            fs.unlinkSync(filePath)

            return null
        }
    }


   export {uploadFile}