const {Kafka} = require('kafkajs');

class KafkaService {
    constructor() {
        this.kafka = new Kafka({
            clientId: 'trader_app',
            brokers: ['localhost:9092']
        });
        this.consumer = this.kafka.consumer({groupId: 'trader_group'});
        this.producer = this.kafka.producer;
    }

    async connect() {
        await this.consumer.connect();
        await this.producer.connect();
        console.log('Connected to Kafka');
    }

    async sendMessage(topic, key, value) {
        try {
            await this.producer.send({
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
            await this.sendMessage(traderId, 'trader_message', message);
            console.log(`Sent message to trader with ID ${traderId}`);
        } catch (error) {
            console.error(`Error sending message to trader with ID ${traderId}:`, error);
        }
    }

    async listenForMessages(traderId, callback) {
        await this.consumer.subscribe({topic: 'messages'});
        await this.consumer.run({
            eachMessage: async ({topic, partition, message}) => {
                const key = message.key.toString();
                const value = message.value.toString();
                if (key === traderId) {
                    // Message is for this trader
                    callback(value);
                }
            }
        });
    }
}

module.exports = KafkaService;
