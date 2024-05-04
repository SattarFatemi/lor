const { Command } = require('commander');

class CLI {
    constructor(traderApp) {
        this.app = traderApp;
        this.program = new Command();
        this.setupCommands();
    }

    setupCommands() {
        this.program
            .version('1.0.0')
            .description('LoR is up!')
            .parse(process.argv);
    }

    handleCommand(command, args) {
        switch(command) {
            case 'info':
                this.app.printTradersInfo();
                break;
            case 'create-coin':
                this.app.createCoin(...args);
                break;
            case 'exit':
                process.exit();
                break;
            default:
                console.error('Invalid command.');
        }
    }
}

module.exports = CLI;
