import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectionDB = async () => {
    //it returns an async promise
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected ! DB HOST: ${connectionInstance.connection.host}`)

    } catch (error) {
        console.log("MONGODB connection error ", error);
        process.exit(1);
        //error handling using catch block
    }
}

export default connectionDB;
