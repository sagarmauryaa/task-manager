const initialData = require('../task.json');

const seedTasks = () => {
    const source = Array.isArray(initialData?.tasks)
        ? initialData.tasks
        : Array.isArray(initialData)
          ? initialData
          : [];

    return source.map((task) => ({ ...task }));
};

let tasks = seedTasks();

const readData = async () => {
    const sortedData = [...tasks].sort(
        (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
    );
    return sortedData;
};

const writeData = async (data) => {
    tasks = Array.isArray(data) ? data : [];
};

module.exports = {
    readData,
    writeData,
};
