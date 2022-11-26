import readline from 'readline';
import events from 'events';


export async function writeApi(logger, WORD) {
    var input = [];

    try {
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false,
            crtlDelay: Infinity
        });
        rl.on('line', function (line) {
            input.push(line);
            if (line === 'q') {
                rl.close();
            }
        });
        await events.once(rl, 'close');
        let [totalWordCount, totalLineWordCount, totalLineCount] = checkForWord(input, WORD);
        switch (logger.level.levelStr) {
            case 'TRACE':
                logger.trace(`Total word count: ${totalWordCount}`);
                logger.trace(`Total line word count: ${totalLineWordCount}`);
                logger.trace(`Total line count: ${totalLineCount}`);
                break;
            case 'DEBUG':
                logger.debug(`Total word count: ${totalWordCount}`);
                logger.debug(`Total line word count: ${totalLineWordCount}`);
                logger.debug(`Total line count: ${totalLineCount}`);
                break;
            case 'INFO':
                logger.info(`Total word count: ${totalWordCount}`);
                logger.info(`Total line word count: ${totalLineWordCount}`);
                logger.info(`Total line count: ${totalLineCount}`);
                break;
            case 'ERROR':
                logger.error(`Total word count: ${totalWordCount}`);
                logger.error(`Total line word count: ${totalLineWordCount}`);
                logger.error(`Total line count: ${totalLineCount}`);
                break;
            case 'CRITICAL':
                logger.critical(`Total word count: ${totalWordCount}`);
                logger.critical(`Total line word count: ${totalLineWordCount}`);
                logger.critical(`Total line count: ${totalLineCount}`);
                break;
            default:
                console.log("No log level specified");
                break;
        }
    } catch (err) {
        console.error(err);

    }
   }
        


function checkForWord(inputData, WORD) {
    let totalWordCount = 0;
    let totalLineWordCount = 0;
    let totalLineCount = inputData.length;
    let success = false;
    for (let i = 0; i < inputData.length; i++) {
        let lineString = inputData[i].split(/[ ,.]+/).filter(Boolean);
        for (let j = 0; j < lineString.length; j++) {
            if (lineString[j] === WORD) {
                totalWordCount++;
                success = true;
            }
        }
        if (success) {
            totalLineWordCount++;
            success = false;
        }
    }
    return [totalWordCount, totalLineWordCount, totalLineCount];

}