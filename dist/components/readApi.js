import nReadlines from 'n-readlines';


export function readApi(path, WORD) {
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
      avgWordSpeed0 += performance.now();
      for (let i = 0; i <= lineString.length; i++) {
        
        if (lineString[i] === WORD) {
          totalWordCount++;
          success = true;
        }
      }
      if (success) {
        totalLineWordCount++;
        success = false;
      }
      avgWordSpeed1 += performance.now();    
    }
/*     console.log('avg line speed:', Math.round((avgLineSpeed0 - avgLineSpeed1)/totalLineCount * 100) / 100 + 'ms');
    console.log('avg word speed:', Math.round((avgWordSpeed1 - avgWordSpeed0)/totalWordCount * 10000) / 10000 + 'ms');
    console.log('Number of words found', totalWordCount);
    console.log('Number of lines with a word found', totalLineWordCount); */
    return [totalWordCount, totalLineCount, avgLineSpeed1 - avgLineSpeed0, avgWordSpeed1 - avgWordSpeed0];
    }