// index.js
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const users = []; // { username, passwordHash, role }
const tasks = []; // { id, title, owner }

const { verifyToken, checkRole } = require('./authMiddleware');


// register

app.post('/register', async (req, res) => {
    const { username, password, role } = req.body;

    const existing = users.find(u => u.username === username);
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = { username, passwordHash, role }; // role: 'user' or 'admin'

    users.push(newUser);
    res.status(201).json({ message: 'User registered successfully' });
});


// login

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
});


// create task

app.post('/tasks', verifyToken, (req, res) => {
    const { title } = req.body;

    const task = {
        id: tasks.length + 1,
        title,
        owner: req.user.username,
    };

    tasks.push(task);
    res.status(201).json(task);
});


// get tasks

app.get('/tasks', verifyToken, (req, res) => {
    if (req.user.role === 'admin') {
        res.json(tasks);
    } else {
        const userTasks = tasks.filter(task => task.owner === req.user.username);
        res.json(userTasks);
    }
});


// server start

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
