const fs = require("fs");
const path = require("path");

const logDir = path.join(__dirname, "../logs");
const logPath = path.join(logDir, "task.log");

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir); // создаёт папку logs, если её нет
}

const sendLog = (message) => {
  const logEntry = `[${new Date().toISOString()}] ${message}\n`;
  fs.appendFile(logPath, logEntry, (err) => {
    if (err) console.error("Failed to write log:", err);
  });
};

module.exports = { sendLog };
