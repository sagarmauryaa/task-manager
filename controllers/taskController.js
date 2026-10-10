const {
    getDataService,
    addTaskService,
    updateTaskByIdService,
    deleteTaskByIdService,
} = require('../services/taskService');

const {
    createTaskSchema,
    updateTaskSchema,
    taskQueryFilterSchema,
    taskIdSchema,
    prioritySchema,
} = require('../validator/taskSchema');

const { handleError } = require('../utils/errorHandler');

const addTask = async (req, res) => {
    try {
        const validatedTask = createTaskSchema.parse(req.body);

        const task = await addTaskService(validatedTask);
        return res.status(201).json(task);
    } catch (error) {
        return handleError(error, res);
    }
};

const updateTaskById = async (req, res) => {
    try {
        const id = taskIdSchema.parse(req.params.id);
        const validatedUpdate = updateTaskSchema.parse(req.body);
        const updatedTask = await updateTaskByIdService(id, validatedUpdate);

        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        return res.status(200).json(updatedTask);
    } catch (error) {
        return handleError(error, res);
    }
};

const getAllTasks = async (req, res) => {
    try {
        const params = req.query;
        const validatedParams = taskQueryFilterSchema.parse(params);
        const tasks = await getDataService(validatedParams);
        return res.status(200).json(tasks);
    } catch (error) {
        return handleError(error, res);
    }
};

const getAllTasksByPriority = async (req, res) => {
    try {
        const data = req.params.priority;
        const validatedData = prioritySchema.parse(data);

        const tasks = await getDataService({ priority: validatedData });

        return res.status(200).json(tasks);
    } catch (error) {
        return handleError(error, res);
    }
};


const getTaskById = async (req, res) => {
    try {
        const id = taskIdSchema.parse(req.params.id);

        const task = await getDataService({ id });

        if (task.length === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }

        return res.status(200).json(task[0]);
    } catch (error) {
        return handleError(error, res);
    }
};

const deleteTaskById = async (req, res) => {
    try {
        const id = taskIdSchema.parse(req.params.id);
        const deleted = await deleteTaskByIdService(id);

        if (!deleted) {
            return res.status(404).json({ error: 'Task not found' });
        }

        return res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        return handleError(error, res);
    }
};

module.exports = {
    addTask,
    updateTaskById,
    getAllTasks,
    getAllTasksByPriority,
    getTaskById,
    deleteTaskById,
};
