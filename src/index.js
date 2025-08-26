import dotenv from "dotenv"
import mongoose, { connect } from "mongoose";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";

dotenv.config({
    path:"./.env"
    
});

console.log("Loaded ENV →", process.env); 
console.log("PORT:", `"${process.env.PORT}"`);
console.log("MONGO URI:", `"${process.env.MONGODB_URI}"`);

 connectDB().then(() => {
   app.listen(process.env.PORT || 8000,()=>{
  console.log(`📦 Database connection successful! :${process.env.PORT}`);
  })
  })
  .catch((err) =>{
   
    console.log("MONGO db connection failed!!!",err);
  
  }
  )

/*
import express from "express"
import connectDB from "./db";
(async () =>{
    try {
        await mongoose.connect('${process.env.MONGODB_URI}/${ DB_NAME}')
        app.on("error",(error)=>{
            console.log("ERRR:", error);
            throw error
        })
      app.listen(process.env.PORT,() =>{
        console.log('APP is listening on port ${process.env.PORT}');
      })
    } catch (error) {
        console.log("ERROR:", error) 
        throw err
    }
})()
    */