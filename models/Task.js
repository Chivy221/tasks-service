const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
title: String,
description: String,
assignedTo: String,
dueDate: Date
});

module.exports = mongoose.model('Task', taskSchema);
