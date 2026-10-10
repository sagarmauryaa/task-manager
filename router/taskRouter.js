const express = require('express');
const router = express.Router();

const {
    addTask,
    getAllTasks,
    getAllTasksByPriority,
    getTaskById,
    updateTaskById,
    deleteTaskById,
} = require('../controllers/taskController');

router.get('/', getAllTasks);
router.post('/', addTask);
router.get('/priority/:priority', getAllTasksByPriority);
router.get('/:id', getTaskById);
router.put('/:id', updateTaskById);
router.delete('/:id', deleteTaskById);

module.exports = router;
