const fs = require('fs/promises');

class Logger{

    constructor(logAuthor, logFile){

        // Takes Log filename as Input
		this.logFile = logFile;
        this.logAuthor = logAuthor;
	}

    async init(){

        // Create Log prefix
        const date = new Date();
        var logPrefix = '[' + date.toLocaleString() + '][' + this.logAuthor + ']: ';

        try {
            
            // Verify file exists
            await fs.access(this.logFile);

        } catch {

            // Create logfile if it doesn't exist
            await fs.writeFile(this.logFile, logPrefix + 'Logger Initiated, Creating file:' + this.logFile +'\n');
        }       
    }

    async log(logString){

        // Create Log prefix
        const date = new Date();
        var logPrefix = '[' + date.toLocaleString() + '][' + this.logAuthor + ']: ';
        
        // Append Logfile
        await fs.appendFile(this.logFile, logPrefix + logString +'\n');        
    }
}

module.exports = Logger;