const readline = require('readline');

class UI {
    constructor(cli) {
        this.cli = cli;
    }

    async start() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        rl.setPrompt('> ');
        rl.prompt();
        rl.on('line', async (input) => {
            const [command, ...args] = input.trim().split(' ');
            try {
                await this.cli.handleCommand(command, args);
            } catch (error) {
                console.log('ERROR:', error.message);
            }
            rl.prompt();
        }).on('close', () => {
            console.log('Exiting...');
            process.exit(0);
        });
    }
}

module.exports = UI;
