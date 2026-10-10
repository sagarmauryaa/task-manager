const { readData, writeData } = require("../utils/fileUtils");

const getDataService = async (params = {}) => {
    const { completed, search, sort, order, priority, id } = params;

    const data = await readData();

    let filteredData = data;

    if (id) {
        filteredData = filteredData.filter(task => task.id === id);
    }

    if (completed !== undefined) {
        filteredData = data.filter(task => task.completed === completed);
    }

    if (search) {
        filteredData = filteredData.filter(task => task.title.toLowerCase().includes(search));
    }

    if (priority) {
        filteredData = filteredData.filter(task => task.priority === priority);
    }

    const sortedData = filteredData.sort((a, b) => {
        if (sort === 'createdDate') {
            return order === 'asc' ? new Date(a.createdDate) - new Date(b.createdDate) : new Date(b.createdDate) - new Date(a.createdDate);
        }
        if (sort === 'updatedDate') {
            return order === 'asc' ? new Date(a.updatedDate) - new Date(b.updatedDate) : new Date(b.updatedDate) - new Date(a.updatedDate);
        }
        return 0;
    });

    return sortedData;
};

const addTaskService = async (newTask) => {
    const data = await readData();
    const nextId =
        data.length === 0 ? 1 : Math.max(...data.map(t => t.id)) + 1;

    const createdDate = new Date();

    const newTaskWithId = {
        id: nextId,
        createdDate,
        ...newTask,
    };
    data.push(newTaskWithId);
    await writeData(data);
    return newTaskWithId;
};

const updateTaskByIdService = async (id, updatedTask) => {
    const data = await readData();
    const index = data.findIndex(task => task.id === id);
    const updatedDate = new Date();


    if (index === -1) {
        return null;
    }

    data[index] = {
        id: data[index].id,
        updatedDate,
        ...data[index],
        ...updatedTask,
    };
    await writeData(data);
    return data[index];
};

const deleteTaskByIdService = async (id) => {
    const data = await readData();
    const filteredData = data.filter(task => task.id !== id);

    if (filteredData.length === data.length) {
        return false;
    }

    await writeData(filteredData);
    return true;
};

module.exports = {
    getDataService,
    addTaskService,
    updateTaskByIdService,
    deleteTaskByIdService,
};
