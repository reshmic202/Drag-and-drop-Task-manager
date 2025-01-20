import mongoose from "mongoose";

const TaskModel=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        // required:true
    },
    dueDate:{
        type:String,
        required:true,
        // unique:true
    },
    status:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    addedBy:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"User"
    },
},{timestamps:true});

const Task=mongoose.model("Task",TaskModel);

export default Task;