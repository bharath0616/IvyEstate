import express from 'express'
import { singup } from '../Controllers/auth.controller.js'

const router=express.Router();

router.post("/signup",singup);

export default router;