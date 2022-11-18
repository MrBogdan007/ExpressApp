import users, { deleteUser } from "@src/data/users";
import { Router } from "express";

const usersRoute = Router()

usersRoute.get("", (req, res) => {
   const {limit,offset} = req.query
   let data = users
   if(limit) {
      if(offset) {
         data= data.slice(Number(offset), Number(limit)+ Number(offset))
      }else{
         data = users.slice(0, Number(limit))
      }
      
   }
   res.json(data)
})

usersRoute.get("/:id", (req,res)=> {
   const id = req.params.id
   let data
   if(id){
      data = users.find(user=> user.id === Number(id))
   }
   return data ? res.status(200).json(data) : res.status(404).json({
      message: "user is no found"
   })
})

usersRoute.post("", (req, res) => {
   const { name } = req.body
   if (!name) {
      return res.status(400).json({
         message: "name cannot be empty"
      })
   }
   const newUser = {
      id: users[users.length-1].id + 1,
      name,
      title: "customer"
   }
   users.push(newUser)
   return res.status(201).json(newUser);
})

usersRoute.delete("/:id", (req, res)=> {
   const id = req.params.id
   // returns only once new array without deleted one
   //  deleteUser(Number(id))
   //  res.json(deleteUser(Number(id)))
   const foundUser = users.findIndex(user=>user.id === Number(id))
   console.log(foundUser);
   
   if(foundUser < 0) {
      return res.status(404).json({
         message: 'User not found'
      })
   }
   users.splice(foundUser, 1)
   return res.status(202).json(foundUser);
})

export default usersRoute