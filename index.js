const CLI = require('./presentation/cli');
const UI = require('./presentation/ui');
const TraderApp = require('./domain/trader');

const trader = new TraderApp();
const cli = new CLI(trader);
const ui = new UI(cli);
ui.start();
