const readline = require('readline');

class UI {
    constructor(cli) {
        this.cli = cli;
    }

    start() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        rl.setPrompt('> ');
        rl.prompt();
        rl.on('line', (input) => {
            const [command, ...args] = input.trim().split(' ');
            this.cli.handleCommand(command, args);
            rl.prompt();
        }).on('close', () => {
            console.log('Exiting...');
            process.exit(0);
        });
    }
}
module.exports = UI;
