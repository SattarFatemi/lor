const CLI = require('./presentation/cli');
const UI = require('./presentation/ui');
const TraderApp = require('./domain/trader');

const id = 123; // TODO
const traderApp = new TraderApp(id);
const cli = new CLI(traderApp);
const ui = new UI(cli);
ui.start();
