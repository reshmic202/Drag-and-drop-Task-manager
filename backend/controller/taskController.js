import Task from '../model/taskModel.js'

export const createNewTask = async (req, res) => {
    try {
        const data = req.body;
        const newTask = new Task(data);
        await newTask.save();
        res.status(201).json(newTask)
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: "Server Error" })
    }
}

export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({
            addedBy: req.params.id
        }).sort({ dueDate: 1 });

        const todo = tasks.filter((item) => item.status === 'TO-DO');
        const inProgress = tasks.filter((item) => item.status === 'In-Progress');
        const completed = tasks.filter((item) => item.status === 'Completed');
        res.json({ todo, inProgress, completed })
        // res.json(tasks)
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: "Server Error" })
    }
}

export const editCurrentTask = async (req, res) => {
    try {
        const taskId=req.params.taskId
        const updatedFields  = req.body; 

        // Find and update the task by ID
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { $set: updatedFields },
            { new: true } 
        );

        if (!updatedTask) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.status(200).json({
            message: "Task updated successfully",
        });
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: "Server Error" })
    }
}

export const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const deletedTask = await Task.findByIdAndDelete(taskId);
        if (!deletedTask) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.status(200).json({
            message: "Task deleted successfully",
        });
        
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: "Server Error" })
    
    }
}

export const updateTheTaskStatus=async(req,res)=>{
    try{
        const taskId=req.params.taskId
        const updatedFields  = req.body;
        
        // Find and update the task by ID
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { $set: updatedFields },
            { new: true } 
        );
        
        if (!updatedTask) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.status(200).json({
            message: "Task status updated successfully",
        });
        
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: "Server Error" })
    
    }
}



export const getTaskBasedOnDescending=async(req,res)=>{
    try{
        const tasks = await Task.find({
            addedBy: req.params.id
        }).sort({ dueDate: -1 });
        const todo = tasks.filter((item) => item.status === 'TO-DO');
        const inProgress = tasks.filter((item) => item.status === 'In-Progress');
        const completed = tasks.filter((item) => item.status === 'Completed');
        res.json({ todo, inProgress, completed })
    }
    catch (e) {
        console.error(e)
        res.status(500).json({ error: "Server Error" })
    }
}
export const getTaskBasedOnFilter = async (req, res) => {
    // console.log('req:', req.body);
    try {
        // Build the query object dynamically based on provided filters
        let query = { addedBy: req.body.addedBy };  // Always filter by addedBy (user)
        
        // Only add filters to the query if they are non-empty
        if (req.body.category) {
            query.category = req.body.category;
        }

        if (req.body.dueDate) {
            query.dueDate = req.body.dueDate;
        }

        if (req.body.name) {
            query.name=req.body.name;
        }

        console.log("Uqeu",query)
        const tasks = await Task.find(query).sort({ dueDate: 1 });

        // Separate tasks based on status
        const todo = tasks.filter((item) => item.status === 'TO-DO');
        const inProgress = tasks.filter((item) => item.status === 'In-Progress');
        const completed = tasks.filter((item) => item.status === 'Completed');

        // Return the categorized tasks
        res.json({ todo, inProgress, completed });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Server Error" });
    }
};

