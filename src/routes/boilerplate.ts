const express = require('express');
const router = express.Router();

import * as tasksController from '../controllers/boilerplate';

router.get('/tasks/:categoryId', tasksController.getTasks);
router.post('/tasks/add', tasksController.addTask);
router.put('/tasks/update/:taskId', tasksController.updateTask);
router.delete('/tasks/remove/:taskId', tasksController.removeTask);

export default router;
