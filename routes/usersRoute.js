import express from 'express';
import {
    saveUsersHandler
} from '../handler/users.js';

const router = express.Router();


router.post('/api/users', saveUsersHandler);

export default router;
