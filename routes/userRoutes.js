import express from 'express';
import { getUsers,deleteUser,updateUser,createUser,getUserById } from '../controllers/userController.js';

const router = express.Router();
router.route('/').get(getUsers).post(createUser);
router.route('/:id').delete(deleteUser).get(getUserById).put(updateUser);

export default router;