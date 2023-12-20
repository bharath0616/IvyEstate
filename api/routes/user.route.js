import express from "express";
import { test, updateUser, deleteUser, getUserListings, getUser } from "../Controllers/user.controller.js";
import {verifyToken} from '../Utils/verifyUser.js';
const router=express.Router();

router.get('/test',test);   
router.post('/update/:id', verifyToken , updateUser);
router.delete('/delete/:id',verifyToken, deleteUser);
router.get('/listings/:id', verifyToken, getUserListings)
router.get('/:id', verifyToken, getUser)
export default router;