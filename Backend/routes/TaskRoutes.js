const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/TaskController');

router.get('/', TaskController.getAllTasks);
router.post('/', TaskController.createTask);
router.get('/:id', TaskController.getTasksById);
router.put('/:id', TaskController.updateTask);
router.delete('/:id', TaskController.deleteTask);

module.exports = router;