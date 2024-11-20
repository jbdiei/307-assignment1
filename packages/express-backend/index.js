import express from "express";
import cors from "cors"; 
import userService from "./services/user-service.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const {MONGO_CONNECTION_STRING } = process.env;
mongoose.set("debug", true);
mongoose
.connect(MONGO_CONNECTION_STRING)
.catch((error)=> console.log(error));

const app = express();
const port =8000;





app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

    userService.
    getUsers(name, job)
    .then((users)=>{
        users = {users_list: users};
        res.json(users)
    })
    .catch((error) => {  
      console.log(error); 
     })


});

app.get("/users/:id", (req,res) => {
    const id = req.params["id"];
   
    userService.
    findUserById(id)
    .then((user) =>{
        if(!user){
            res.status(404).send("Resource not found.");
        }
        return res.json(user)
    })
     .catch((error) => {  
      console.log(error); 
     })


});

app.post("/users", (req,res) => {
    const userToAdd = req.body;
    // const result = addUser(userToAdd);
    // if (result === undefined)
    // {
    //     res.status(404).send("Error adding user.");
    
    // }
    // else{
    
    //     res.status(201).send(result);
    // }
    
    userService
    .addUser(userToAdd)
    .then((user)=>{
        if (!user){
            res.status(404).send("Error adding user.");
        }
        else{res.status(201).json(user);}  
    })
    .catch((error) => {  
      console.log(error); 
     })


})

app.delete("/users/:id", (req,res)=>{
    const id = req.params["id"];
    // const result = findUserById(id);
    // if(result === undefined)
    // {
    //     res.status(404).send("Resource not found.");
    // }
    // else{

    //     deleteUserById(result);
    //     res.status(204).send()
    // }
    // // res.send();
    userService
    .findByIdAndDelete(id)
    .then((deletedUser) => {
        if(!deletedUser){
           res.status(404).send("Resource not found"); 
        }
        else{
            res.status(204).json()
        
        }
    
    
    })

});

app.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
    );
});
