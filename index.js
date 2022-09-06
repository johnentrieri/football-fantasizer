const puppeteer = require('puppeteer');
const ESPNApi = require('./api');
const SETTINGS = require('./settings');
const fs = require('fs/promises');
const Logger = require('./logger');

(async () => {


  // Initiate Logging
  const logger = new Logger('MAIN', SETTINGS.LOGFILE_NAME);
  await logger.init();

  // Get today's date
  var date = new Date();
  var lastlogin = null;
  var preventLogin = true;

  // Check last login time
  try {

    // Store last login time as Date object
    await fs.access('./lastlogin.txt');
    var lastloginString =  await fs.readFile('./lastlogin.txt', { encoding: 'utf8' });
    lastlogin = new Date(lastloginString);

  } catch {

    // Create login time file if it doesn't exist
    await fs.writeFile('./lastlogin.txt',date.toString());
    lastlogin = date;
    preventLogin = false;

  }

  logger.log("Current Time: " + date.toString() );
  logger.log("Last Login: " + lastlogin.toString() );

  while(preventLogin) {

    if (date - lastlogin < SETTINGS.LOGIN_DELAY) { 

      // If last login was too recent, wait then check again
      await new Promise(r => setTimeout(r, 3000));
      date = Date.now();
      continue; 
    }

    logger.log("Sufficent Time Elapsed. Logging in at: " + date.toString());
    await fs.writeFile('./lastlogin.txt',date.toString());
    var lastlogin = date;
    preventLogin = false;
  }

  const espn = new ESPNApi(SETTINGS.SECRETS.EMAIL,SETTINGS.SECRETS.PASSWORD,SETTINGS.LEAGUE_ID,SETTINGS.TEAM_ID); 
  await espn.login();
  //await espn.teamRoster.Print();
  await espn.teamRoster.Optimize();

})();