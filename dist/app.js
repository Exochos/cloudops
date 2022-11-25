import commandLineArgs from 'command-line-args';
import log4js from 'log4js';
import { readApi } from './components/readApi.js';
import { writeApi } from './components/writeApi.js';
// Begin performance metrics
const t0 = performance.now();

// Define command line options and words to search for
const WORD = 'imperdiet';
const optionDefinitions = [
    {name: 'loglevel', alias: 'l', type: String, defaultValue: 'trace'},
    {name: 'path', alias: 'p', type: String},
    {name: 'mode', alias: 'm', type: String},
    {name: 'stats', alias: 's', type: String},
  ]
const options = commandLineArgs(optionDefinitions);

// Configure logging
var logger = log4js.getLogger();
log4js.configure({
    appenders: {
        out: { type: 'file', filename: 'logs/cloudOps.log' }
    },
    categories: {
        default: { appenders: ['out'], level: options.loglevel }
    }
});

// Check for command line for log level
switch (options.loglevel) {
  case 'critical':
    logger.level = 'critical';
    break;
  case 'error':
    logger.level = 'error';
    break;
  case 'info':
    logger.level = 'info';
    break;
  case 'debug':
    logger.level = 'debug';
    break;
  default:
    logger.level = 'trace';
}

// Check for command line for mode
switch (options.mode) {
    case 'read':
        const readData = readApi(options.path, WORD, logger);
        break;
    case 'write':
        const writeData = writeApi(options.path, logger);
        break;
    default:
        console.log('Please specify a mode: "read" or "write"');
        break;
}

console.log( "\u001b[1;33m" );
console.log('loglevel:', options.loglevel, '\nmode:', options.mode, '\npath:', options.path, '\nstats:', options.stats);
console.log("\u001b[1;32m");
// End performance metrics
console.log('Total execution time', Math.round((performance.now() - t0) * 100) / 100 + 'ms');
const used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
console.log( "\u001b[0m");