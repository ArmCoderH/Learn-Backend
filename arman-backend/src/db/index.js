import mongoose, { connect } from 'mongoose'
import { DB_NAME } from '../constants.js'


//used mendotry async await and try catch 

const connectDB = async () => {
    try {
        const CONNECTION = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST : ${CONNECTION.connection.host}`);
        
    } catch (error) {
        console.log("MONGOOSE CONNECTION ERROR",error);
        process.exit(1);
    }
}

export default connectDB