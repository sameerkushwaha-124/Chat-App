import express from "express";
import dotenv from "dotenv";
import {connectDB} from "./config/db.js";
import cookieParser from 'cookie-parser';
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";


dotenv.config();
const app = express();

app.use(cookieParser());
app.use(express.json()); // Agar tum ise nahi lagate, to req.body undefined rehta hai — jiske wajas se server crash ho sakta hai ya response bhejne se pehle hi connection reset ho jata hai
app.use(express.urlencoded({extended:true})); // Form data ko parse karne ke liye
app.use(express.static("public")); // Static files ko serve karne ke liye
app.use(cors()); // Agar tum ise nahi lagate, to CORS error aata hai jab tum frontend se request bhejte ho   


app.use('/api/auth', authRoutes);
app.use('api/message', messageRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server is running on : ${PORT}`);
    connectDB();
})