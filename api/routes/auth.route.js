import express from 'express'
import { singup, signin, google, signOut } from '../Controllers/auth.controller.js'

const router=express.Router();

router.post("/signup",singup);
router.post("/signin",signin);
router.post("/google",google);
router.get('/signout',signOut);
export default router;