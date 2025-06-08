const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
title: String,
description: String,
assignedTo: String,
status: { type: String, default: 'pending' },
createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Task', taskSchema);
