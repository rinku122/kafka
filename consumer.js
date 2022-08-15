const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

const topicName = "saveAge";

const processConsumer = async () => {
  const consumer = kafka.consumer({ groupId: "orders" });

  await consumer.connect();

  await consumer.subscribe({ topic: topicName });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      let Counter = 1;
      logMessage(Counter, topic, partition, message);
      Counter++;
    },
  });
};

const logMessage = (counter, topic, partition, message) => {
  console.log(`received a new message number: ${counter} `, {
    topic,
    partition,
    message: {
      value: message.value.toString(),
    },
  });
};

processConsumer();
