import express from 'express';
import userRoute from './routes/userRoute.js';
import mongoose from 'mongoose';
import taskRoute from './routes/taskRoute.js';
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors());

const users = ['abhay', 'dombi', 'reshmi'];

app.get('/', (req, res) => {
    res.json(users);
});

//user routes
app.use("/api/user", userRoute)

//task routes
app.use("/api/task", taskRoute)

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://reshmic202:reshmic202@cluster0.v56xf.mongodb.net/task-manager?retryWrites=true&w=majority&appName=Cluster0");
        console.log('Database connected successfully');
    } catch (err) {
        console.error('Database connection failed', err);
        process.exit(1);
    }
}

connectDB();

app.listen(8000, (req, res) => {
    console.log('Server is running on port 5000');
})

export default app;