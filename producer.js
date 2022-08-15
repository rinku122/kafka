const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

const topicName = "saveAge";

const age = process.argv[2];
const processProducer = async () => {
  const producer = kafka.producer();
  await producer.connect();
  await producer.send({
    topic: topicName,
    messages: [{ value: age, partition: age <= 10 ? 0 : 1 }],
  });
};

processProducer().then(() => {
  console.log("done");
  process.exit();
});
