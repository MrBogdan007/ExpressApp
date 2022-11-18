import { Router } from "express";

const homeRoute = Router()

homeRoute.get("", (req,res)=>{
   res.send("Home route - get method")
})
homeRoute.get("/name", (req,res)=>{
   res.send("Home route - path name - get method")
})



export default homeRoute;