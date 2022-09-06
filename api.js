const puppeteer = require('puppeteer')
const Roster = require('./roster');
const SETTINGS = require('./settings');
const Logger = require('./logger');

class ESPNApi{

	constructor(email, password, leagueId, teamId){
		this.email = email;
		this.password = password;
		this.leagueId = leagueId;
        this.teamId = teamId;
		this.browser = puppeteer.launch({headless:false});
        this.teamRoster = new Roster();
	}

	async goToNewPage(url){
		const browser = await this.browser;
		const page = await browser.newPage();
		await page.goto(url);
		return page;
	}

    async login(){

        // Initiate Logging
        const logger = new Logger('ESPN LOGIN', SETTINGS.LOGFILE_NAME);
        await logger.init();

        // Go to ESPN Fantasy Login page
        const page = await this.goToNewPage('https://www.espn.com/login');
        
        // Get Login iFrame
        await page.waitForSelector('#disneyid-wrapper #disneyid-iframe', {timeout:5000});
        const loginFrameHandler = await page.$('#disneyid-wrapper #disneyid-iframe');
        const loginFrame = await loginFrameHandler.contentFrame();
        
        // Type email
        await loginFrame.waitForSelector('input[type=email]', {visible: true});
        await loginFrame.click('input[type=email]');
        await loginFrame.type('input[type=email]',this.email, {delay : 10});

        // Type password
        await loginFrame.waitForSelector('input[type=password]', {visible: true});
        await loginFrame.click('input[type=password]');
        await loginFrame.type('input[type=password]',this.password, {delay : 10});

        // Submit
        await loginFrame.waitForSelector('.btn-submit', {visible: true});
        await loginFrame.click('.btn-submit');

        // Load Team Roster
        await this.getRoster();

        return true;
    }

    async getRoster(){

        // Initiate Logging
        const logger = new Logger('ESPN GETROSTER', SETTINGS.LOGFILE_NAME);
        await logger.init();

        // Go to Team Page
        const page = await this.goToNewPage('https://fantasy.espn.com/football/team?leagueId='+ this.leagueId +'&teamId=' + this.teamId);

        // Load all roster table rows into an array
        await page.waitForSelector('.Table__TBODY tr', {visible: true});
        const rosterTableRows = await page.$$('.Table__TBODY tr');

        // Loop through each roster entry
        for (let i=0; i < rosterTableRows.length; i++) {

            // Determine if row contains a player or not
            const playerInfo = await rosterTableRows[i].$('.player-column__athlete');
            if (!playerInfo) { continue; }

            // Get lineup slot
            const playerSlot = await rosterTableRows[i].$eval('td div', node => node.innerHTML);
            if (playerSlot == '') { continue; }
            
            // Get Player Name
            const playerName = await rosterTableRows[i].$eval('.player-column__athlete', node => node.title);         

            // Get Player Team
            const playerTeam = await rosterTableRows[i].$eval('.playerinfo__playerteam', node => node.innerHTML);

            // Get Player Position
            const playerPos = await rosterTableRows[i].$eval('.playerinfo__playerpos', node => node.innerHTML);

            // Get Player Projection
            let playerProj = await rosterTableRows[i].$eval('.total span', node => node.innerHTML);
            if (playerProj == '--') { playerProj = '0.0'; }

            // Add player object into Roster
            await this.teamRoster.AddPlayer(playerSlot,playerName,playerPos,playerTeam,playerProj);            
        }

        // Calculate Team Projections after pulling roster
        await this.teamRoster.CalculateRosterProjections();
    }

    async getFreeAgents(){

        // Go to Free Agent Page
        const page = await this.goToNewPage('https://fantasy.espn.com/football/players/add?leagueId='+ this.leagueId);

        //TODO

    }
}

module.exports = ESPNApi;