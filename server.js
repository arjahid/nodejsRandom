const express = require('express'); // Import express
const app = express();              // Create an instance of express
const port = 3000;                  // Define the server port

app.use(express.json()); // Middleware to parse JSON data

// Dummy task data
let tasks = [
    { id: 1, title: "Learn Node.js", completed: false },
    { id: 2, title: "Build a project", completed: false }
];

// Home route
app.get('/', (req, res) => {
    res.send('Welcome to the Task Manager API!');
});

// Get all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Get a single task by ID
app.get('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);
    if (!task) return res.status(404).json({ message: "Task not found!" });
    res.json(task);
});

// Add a new task
app.post('/tasks', (req, res) => {
    const newTask = {
        id: tasks.length + 1,
        title: req.body.title,
        completed: false
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Update a task
app.put('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);

    if (!task) return res.status(404).json({ message: "Task not found!" });

    task.title = req.body.title || task.title;
    task.completed = req.body.completed !== undefined ? req.body.completed : task.completed;

    res.json(task);
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === id);

    if (taskIndex === -1) return res.status(404).json({ message: "Task not found!" });

    tasks.splice(taskIndex, 1);
    res.json({ message: "Task deleted successfully!" });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
