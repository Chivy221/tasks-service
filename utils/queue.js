const amqp = require('amqplib');

async function publishTask(message) {
try {
const conn = await amqp.connect(process.env.RABBITMQ_URL);
const ch = await conn.createChannel();
await ch.assertQueue(process.env.TASK_QUEUE, { durable: true });
ch.sendToQueue(process.env.TASK_QUEUE, Buffer.from(JSON.stringify(message)));
setTimeout(() => conn.close(), 500);
} catch (e) {
console.error('Task publish error:', e.message);
}
}

module.exports = { publishTask };
