const CLI = require('./presentation/cli');
const UI = require('./presentation/ui');
const TraderApp = require('./domain/trader');
const TraderRepository = require('./repository/trader');
const KafkaService = require('./data-access/kafkaService');
const MongoService = require('./data-access/mongodbService');


async function connectToKafka() {
    const kafkaService = KafkaService.getInstance();
    try {
        await kafkaService.connect();
        console.log('Connected to Kafka');
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function connectToMongo(traderId) {
    const databaseName = `trader_db_${traderId}`;
    try {
        await MongoService.connect(databaseName, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log('Connected to Mongo');
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function main() {
    await connectToKafka();
    const traderId = TraderApp.getTraderId();
    const trader = new TraderApp(traderId);
    TraderRepository.broadcastNewTrader(trader);
    TraderRepository.startListening();
    await connectToMongo(traderId);
    const cli = new CLI(trader);
    const ui = new UI(cli);
    await ui.start();
}

main();
