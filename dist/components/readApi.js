import nReadlines from 'n-readlines';


export function readApi(path, WORD, logger) {
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
    switch (logger.level.levelStr) {
        case 'TRACE':
            logger.trace(`Total word count: ${totalWordCount}`);
            logger.trace(`Total line word count: ${totalLineWordCount}`);
            logger.trace(`Total line count: ${totalLineCount}`);
            logger.trace(`Average line speed: ${(Math.round((avgLineSpeed0 - avgLineSpeed1)/totalLineCount * 100) / 100)} ms`);
            logger.trace(`Average word speed: ${(Math.round(avgWordSpeed1 - avgWordSpeed0)/totalWordCount * 10000) / 10000} ms`);
            break;
        case 'DEBUG':
            logger.debug(`Total word count: ${totalWordCount}`);
            logger.debug(`Total line word count: ${totalLineWordCount}`);
            logger.debug(`Total line count: ${totalLineCount}`);
            logger.debug(`Average line speed: ${(Math.round((avgLineSpeed0 - avgLineSpeed1)/totalLineCount * 100) / 100)} ms`);
            logger.debug(`Average word speed: ${(Math.round(avgWordSpeed1 - avgWordSpeed0)/totalWordCount * 10000) / 10000} ms`);
            break;
        case 'INFO':
            logger.info(`Total word count: ${totalWordCount}`);
            logger.info(`Total line word count: ${totalLineWordCount}`);
            logger.info(`Total line count: ${totalLineCount}`);
            logger.info(`Average line speed: ${(Math.round((avgLineSpeed0 - avgLineSpeed1)/totalLineCount * 100) / 100)} ms`);
            logger.info(`Average word speed: ${(Math.round(avgWordSpeed1 - avgWordSpeed0)/totalWordCount * 10000) / 10000} ms`);
            break;
        case 'WARN':
            logger.warn(`Total word count: ${totalWordCount}`);
            logger.warn(`Total line word count: ${totalLineWordCount}`);
            logger.warn(`Total line count: ${totalLineCount}`);
            logger.warn(`Average line speed: ${(Math.round((avgLineSpeed0 - avgLineSpeed1)/totalLineCount * 100) / 100)} ms`);
            logger.warn(`Average word speed: ${(Math.round(avgWordSpeed1 - avgWordSpeed0)/totalWordCount * 10000) / 10000} ms`);
            break;
        case 'ERROR':
            logger.error(`Total word count: ${totalWordCount}`);
            logger.error(`Total line word count: ${totalLineWordCount}`);
            logger.error(`Total line count: ${totalLineCount}`);
            logger.error(`Average line speed: ${(Math.round((avgLineSpeed0 - avgLineSpeed1)/totalLineCount * 100) / 100)} ms`);
            logger.error(`Average word speed: ${(Math.round(avgWordSpeed1 - avgWordSpeed0)/totalWordCount * 10000) / 10000} ms`);
            break;
        case 'CRITICAL':
            logger.critical(`Total word count: ${totalWordCount}`);
            logger.critical(`Total line word count: ${totalLineWordCount}`);
            logger.critical(`Total line count: ${totalLineCount}`);
            logger.critical(`Average line speed: ${(Math.round((avgLineSpeed0 - avgLineSpeed1)/totalLineCount * 100) / 100)} ms`);
            logger.critical(`Average word speed: ${(Math.round(avgWordSpeed1 - avgWordSpeed0)/totalWordCount * 10000) / 10000} ms`);
        default:
            console.log("No logger level set");
            break;
    }
    return totalWordCount;
    }