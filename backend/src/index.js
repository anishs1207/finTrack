import connectionDB from "./db/index.js";
import dotenv from "dotenv";
import { app } from "./app.js"

dotenv.config({
    path: './.env'
});

connectionDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server Running at port:${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log("MONGODB Connection Failed !", err)
    });