//import require things
const express=require('express')
const app=express();
const mongoose=require('mongoose');

app.use(express.json())

//connset moongodb
mongoose.connect('mongodb://localhost:27017/mern-app')
.then(() => {
    console.log('Dbconnected');
}).catch((err) => {
    console.log(err); 
});

// create schema
const todoschema=new mongoose.Schema({
    title:{
        required:true,
        type:String
    },
    description:String
});
//creating model

const todoModel=mongoose.model('Todo',todoschema)

app.post('/todos',async(req,res)=>{
    const {title,description}=req.body;
try {
    const newTodo= new todoModel({title,description})
    await newTodo.save();
    res.status(201).json(newTodo);
} catch (error) {
    console.log(error);
    res.status( 500).json({message:error.message})   
}
})
//get items
app.get('/todos',async(req,res)=>{
    try {
      const todos=  await todoModel.find();
      res.json(todos);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message})  
    }
})
//update
app.put("/todos/:id",async(req,res)=>{
    try {
        const {title,description}=req.body;
        const id=req.params.id;
        const todoupdate= await todoModel.findByIdAndUpdate(
              id,
              {title,description},
            {new:true}
          )
          if(!todoupdate){
              return res.status(404).json({message:"toda id not found"})
          }
          res.json(todoupdate)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message:error.message });  
    }
})

//delte
app.delete('/todos/:id',async(req,res)=>{
    try {
        const id =req.params.id;
        await   todoModel.findByIdAndDelete(id)
        res.status(204).end();
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message});
    }
})

const port=3000 
app.listen(port,()=>{
    console.log(`server is listening ${port}`); 
})