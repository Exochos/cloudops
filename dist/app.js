import commandLineArgs from 'command-line-args';
import nReadlines from 'n-readlines';
import { performance } from 'perf_hooks';


const t0 = performance.now();
const WORD = 'imperdiet';
const optionDefinitions = [
    {name: 'loglevel', alias: 'l', type: String, defaultValue: 'trace'},
    {name: 'path', alias: 'p', type: String},
    {name: 'mode', alias: 'm', type: String},
    {name: 'stats', alias: 's', type: Boolean},
  ]
const options = commandLineArgs(optionDefinitions);

const readData = readMode(options.path);
console.log(options);

console.log('Total execution time', Math.round((performance.now() - t0) * 100) / 100 + 'ms');
const used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);



// Read data from file
function readMode(path) {
  let avgLineSpeed0 = 0;
  let avgLineSpeed1 = 0;
  let avgWordSpeed0 = 0;
  const w0 = "marker-a";
  const w1 = "marker-b";
  let avgWordSpeed1 = 0;
  let totalWordCount = 0;
  let totalLineWordCount = 0;
  let totalLineCount = 0; 
  let line;
  let success = false;
  const liner = new nReadlines(path);

  while (true) {

    // Read line by line with metrics
    avgLineSpeed0 += performance.now();
    if (line = liner.next()) {
      totalLineCount++;
      avgLineSpeed1 += performance.now();
    } else {
      break;
    }
    
    // Split the line into words using a regular expression
    let lineString = line.toString().split(/[ ,.]+/).filter(Boolean);

    // Loop and check for the WORD with metrics
    performance.mark(w0);
    avgWordSpeed0 += performance.now();
    for (let i = 0; i <= lineString.length; i++) {
      
      if (lineString[i] === WORD) {
        totalWordCount++;
        success = true;
      }
    }
    performance.mark(w1);
    if (success) {
      totalLineWordCount++;
      success = false;
    }
    avgWordSpeed1 += performance.now();
    
    
  }

  console.log(performance.measure('line', w0, w1));
  console.log('avg line speed:', Math.round((avgLineSpeed0 - avgLineSpeed1)/totalLineCount * 100) / 100 + 'ms');
  console.log('avg word speed:', Math.round((avgWordSpeed1 - avgWordSpeed0)/totalWordCount * 10000) / 10000 + 'ms');
  console.log('Number of words found', totalWordCount);
  console.log('Number of lines with a word found', totalLineWordCount);
  // return [totalWordCount, totalLineCount, avgLineSpeed, avgWordSpeed];
}