// index.js
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('./models/User');
const Task = require('./models/Task');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// mongoose setup

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));


const users = []; // { username, passwordHash, role }
const tasks = []; // { id, title, owner }

const { verifyToken, checkRole } = require('./authMiddleware');

// register

app.post('/register', async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const user = new User({ username, password, role });
    await user.save();
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user' });
  }
});

// login

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign(
    { username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token });
});



// create task

app.post('/tasks', verifyToken, async (req, res) => {
  const { title } = req.body;
  const task = new Task({ title, owner: req.user.username });
  await task.save();
  res.status(201).json(task);
});


// get tasks

app.get('/tasks', verifyToken, async (req, res) => {
  if (req.user.role === 'admin') {
    const tasks = await Task.find();
    res.json(tasks);
  } else {
    const tasks = await Task.find({ owner: req.user.username });
    res.json(tasks);
  }
});


// DELETE /tasks/:id

app.delete('/tasks/:id', verifyToken, async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Not found' });

  if (req.user.role !== 'admin' && task.owner !== req.user.username) {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  await task.deleteOne();
  res.json({ message: 'Deleted' });
});



// PUT /tasks/:id
app.put('/tasks/:id', verifyToken, async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Not found' });

  if (req.user.role !== 'admin' && task.owner !== req.user.username) {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  task.title = req.body.title || task.title;
  await task.save();
  res.json(task);
});


// server start

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
