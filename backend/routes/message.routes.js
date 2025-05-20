import express from 'express';
import { protectRoute } from '../middlewares/auth.middleware.js';
import { getMessages, getUsersForSidebar, sendMessage}  from '../controller/message.controller.js';
const router = express.Router();

router.get('/user', protectRoute, getUsersForSidebar); 
router.get("/:id", protectRoute, getMessages); 
router.post('/send/:id', protectRoute, sendMessage);

export default router;