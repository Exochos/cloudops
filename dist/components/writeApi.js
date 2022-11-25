import readline from 'readline';


export function writeApi() {
    var input = [];
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });
    rl.prompt("Input - press q to quit: ");
    rl.on('line', function (line) {
        if (line === 'q') {
            rl.close();
        } else {
            input.push(line);
            rl.prompt();
        }
    });
    rl.on('close', function () {
        console.log('Input received:');
        console.log(input);
        process.exit(0);
    });
return input;
}