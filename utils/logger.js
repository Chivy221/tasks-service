const fs = require('fs');
const path = require('path');

const logStream = fs.createWriteStream(path.join(__dirname, '../../logs/tasks.log'), { flags: 'a' });

exports.logToFile = msg => logStream.write(msg);
