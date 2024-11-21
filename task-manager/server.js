const express = require('express');
const path = require('path');
const { addTasks, getTasks } = require('./db/mongo');

const app = express();
const PORT = 8080;
const tasks = [];
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/task-form', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'task-form.html'))
});

app.post('/create-task', async (req, res) => {
    const {taskName, taskDesc} = req.body;
    await addTasks(taskName, taskDesc);
    res.redirect('/task-list');
});

app.get('/tasks', async (req, res) => {
    const tasks = await getTasks();
    res.json(tasks);
});

app.get('/task-list', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'task-list.html'));
});

app.listen(PORT, () => {
    console.log(`app running on http://localhost:${PORT}`);
});