// server.js kyun banaya? 
// kyunki ham socket IO user karne wale hain jo http module se use karne easy padta hain express ki bajay.
import dotenv from 'dotenv';
dotenv.config();
import http from 'http';
import app from "./app.js";

const server = http.createServer(app);


const PORT = process.env.PORT || 3000;

server.listen(PORT,(req,res)=>{
    console.log(`Server is running on port ${PORT}`);
});