const {Command} = require('commander');

class CLI {
    constructor(traderApp) {
        this.trader = traderApp;
        this.program = new Command();
        this.setupCommands();
    }

    setupCommands() {
        this.program
            .version('1.0.0')
            .description('LoR is up!')
            .parse(process.argv);
    }

    async handleCommand(command, args) {
        switch (command) {
            case 'info':
                await this.trader.printTradersInfo();
                break;
            case 'create-coin':
                await this.trader.createCoin(...args);
                break;
            case 'create-cr':
                await this.trader.createCooperationRing(...args);
                break;
            case 'create-fr':
                await this.trader.createFractalRing(...args);
                break;
            case 'exit':
                console.log('Exiting...');
                process.exit(0);
                break;
            default:
                console.error('Invalid command.');
        }
    }
}

module.exports = CLI;
