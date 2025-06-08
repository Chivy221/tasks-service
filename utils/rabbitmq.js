const amqp = require('amqplib');
const queue = 'task_created';

async function sendTaskCreated(task) {
try {
const conn = await amqp.connect(process.env.RABBITMQ_URL);
const ch = await conn.createChannel();
await ch.assertQueue(queue, { durable: false });
ch.sendToQueue(queue, Buffer.from(JSON.stringify(task)));
await ch.close();
await conn.close();
} catch (e) {
console.error('RabbitMQ error:', e);
}
}

module.exports = { sendTaskCreated };
