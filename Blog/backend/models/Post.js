const mongoose=require('mongoose')

const PostSchema=new mongoose.Schema({
    title:{type: String, required:true},
    content:{type:String,required:true},
    category:{type:String,required:true},
    author:{type:String},
    image:{type:String},
    createdAt:{type:Date,default:Date.now},
    updatedAt:{type:Date,default:Date.now}
})

module.exports=mongoose.model('Post',PostSchema)