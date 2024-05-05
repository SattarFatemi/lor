const CLI = require('./presentation/cli');
const UI = require('./presentation/ui');
const TraderApp = require('./domain/trader');
const KafkaService = require('./data-access/kafkaService');


async function main() {
    const kafkaService = KafkaService.getInstance();
    try {
        await kafkaService.connect();
        console.log('Connected to Kafka');
    } catch(error) {
        console.log(error);
        throw error;
    }

    const traderId = await TraderApp.getTraderId();
    const trader = new TraderApp(traderId);
    const cli = new CLI(trader);
    const ui = new UI(cli);
    ui.start();
}

main();
