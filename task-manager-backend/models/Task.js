const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  owner: String // Username
});

module.exports = mongoose.model('Task', taskSchema);
