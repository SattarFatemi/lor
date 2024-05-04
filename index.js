const CLI = require('./presentation/cli');
const UI = require('./presentation/ui');
const TraderApp = require('./domain/traderApp');

const traderApp = new TraderApp();
const cli = new CLI(traderApp);
const ui = new UI(cli);
ui.start();
