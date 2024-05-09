const {Kafka} = require('kafkajs');
const kafkaConfig = require('../config/kafkaConfig');

let instance;

class KafkaService {
    static getInstance() {
        if (!instance) {
            instance = new KafkaService();
            instance.kafka = new Kafka({
                clientId: kafkaConfig.CLIENT_ID,
                brokers: kafkaConfig.BROKERS,
            });
            instance.consumerGroupId = `group-${Math.random().toString(36).substr(2, 9)}`;
            instance.consumer = instance.kafka.consumer({groupId: instance.consumerGroupId});
            instance.producer = instance.kafka.producer();
        }
        return instance;
    }

    async connect() {
        await instance.consumer.connect();
        await instance.producer.connect();
    }

    async sendMessage(topic, key, value) {
        try {
            await instance.producer.send({
                topic,
                messages: [{key, value}]
            });
            console.log(`Sent message to ${topic}`);
        } catch (error) {
            console.error(`Error sending message to ${topic}:`, error);
        }
    }

    async sendMessageToTrader(traderId, message) {
        try {
            await instance.sendMessage(traderId, 'trader_message', message);
            console.log(`Sent message to trader with ID ${traderId}`);
        } catch (error) {
            console.error(`Error sending message to trader with ID ${traderId}:`, error);
        }
    }

    async listen(listenList) {
        for (const topic of listenList.map(obj => obj.topic)) {
            await instance.consumer.subscribe({topic});
        }
        await instance.consumer.run({
            eachMessage: async ({topic, partition, message}) => {
                const key = message.key.toString();
                const value = message.value.toString();
                for (const obj of listenList) {
                    if (obj.topic === topic) {
                        obj.callback(value);
                    }
                }
            }
        });
    }

    async listenForMessages(traderId, callback) {
        await instance.consumer.subscribe({topic: 'messages'});
        await instance.consumer.run({
            eachMessage: async ({topic, partition, message}) => {
                const key = message.key.toString();
                const value = message.value.toString();
                if (key === traderId) {
                    // Message is for instance trader
                    callback(value);
                }
            }
        });
    }
}

module.exports = KafkaService;
