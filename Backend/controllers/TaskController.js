const Task = require('../models/Task');

// Get all tasks
exports.getAllTasks = async (req, res) => {
    try{
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error getting tasks', error });
    }
};

// Create a task
exports.createTask = async (req, res) => {
    try{
        const { title, description } = req.body;
        const task = await Task.create({ title, description});
        res.status(201).json({ message: 'Task created successful', task });
    } catch (error) {
        res.status(500).json({ message: 'Error creating task', error });
    }
};

// Get a single task
exports.getTasksById = async (req, res) => {
    try{
        const task = await Task.findById(req.params.id);
        if(!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error getting task', error});
    }
};

// Update a task
exports.updateTask = async (req, res) => {
    try{
        const { title, description } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, { title, description }, { new: true });
        if(!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task updated successfully', task: updatedTask });
    } catch (error) {
        res.status(500).json({ message: 'Error updating task', error });
    }
};

// Delete a task
exports.deleteTask = async (req, res) => {
    try{
        const deleteTask = await Task.findByIdAndDelete(req.params.id);
        if(!deletedTask) {
            return res.status(404).json({ message: 'Task deleted successfully', task: deleteTask });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error });
    }
};