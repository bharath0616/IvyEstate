import express from "express";
import { test, updateUser } from "../Controllers/user.controller.js";
import {verifyUser} from '../Utils/verifyUser.js';
const router=express.Router();

router.get('/test',test);   
router.post('/update/:id', verifyUser , updateUser);

export default router;