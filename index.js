const CLI = require('./presentation/cli');
const UI = require('./presentation/ui');
const TraderApp = require('./domain/trader');
const KafkaService = require('./data-access/kafkaService');

const kafkaService = KafkaService.getInstance();
try {
    await kafkaService.connect();
    console.log('Connected to Kafka');
} catch(error) {
    console.log(error);
    throw error;
}

const trader = new TraderApp();
const cli = new CLI(trader);
const ui = new UI(cli);
ui.start();
