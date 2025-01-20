import express from 'express';
import { createNewAccount } from '../controller/userController.js';

const userRoute = express.Router();

userRoute.post("/create-new-account",createNewAccount);

export default userRoute;