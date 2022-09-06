const SETTINGS = require('./settings');
const Logger = require('./logger');

class Roster{

	constructor(){
        this.players = [];
        this.espnProjection = 0.0;
        this.yahooProjection = 0.0;
        this.fantasyProsProjection = 0.0;
        this.averageProjection = 0.0;
	}

    // Add a Player to this Roster
    async AddPlayer(slot,name,position,team,projection){

        // TODO - Remove projection and instead add LookupPlayer function

        // Create blank object to store player data
        await this.players.push({
            slot : slot,
            name : name,
            position : position,
            team : team,
            espnProjection : parseFloat(projection),
            yahooProjection : 0.0,
            fantasyProsProjection : 0.0,
            averageProjection : 0.0
        });
    }

    async Optimize(){

        // Initiate Logging
        const logger = new Logger('ROSTER OPTIMIZE', SETTINGS.LOGFILE_NAME);
        await logger.init();

        logger.log("Optimizing Roster");

        // Create a copy of the current roster
        const playersCopy = [...this.players];

        const initialProjection = (await this.CalculatePlayerProjections(playersCopy)).espnProjection;
        logger.log("Initial Projection: " + initialProjection);

        // Loop through copied lineup
        for (let i=0; i < playersCopy.length; i++) {

            // Skip benched players
            if (playersCopy[i].slot == 'Bench') { 
                logger.log("Skipping Benched Player: " + playersCopy[i].name);
                continue; 
            }

            // QB Logic
            if (playersCopy[i].slot =='QB') {

                logger.log("Looking for QB Replacement For: " + playersCopy[i].name);

                // Inner Loop through copied lineup
                for (let j=0; j < playersCopy.length; j++) {

                    // Skip active players
                    if (playersCopy[j].slot != 'Bench') { 
                        logger.log("Skipping Active Player: " + playersCopy[j].name);
                        continue;
                    }

                    // Skip Non-QB players
                    if (playersCopy[j].position != 'QB') { 
                        logger.log("Skipping Non-QB Player: " + playersCopy[j].name);
                        continue; 
                    }

                    // Comparison
                    logger.log("Comparing " + playersCopy[i].name + " with " + playersCopy[j].name);

                    // Do not swap if projection is lower
                    if (playersCopy[i].espnProjection >= playersCopy[j].espnProjection) {
                        logger.log(playersCopy[j].name + " is not a worthwhile replacement");
                        continue; 
                    }
                    

                    //Swap if projection is higher
                    logger.log(playersCopy[j].name + " is a worthwhile replacement");
                    playersCopy[j].slot = playersCopy[i].slot;
                    playersCopy[i].slot = 'Bench';                  
                }
            }

            // RB Logic
            if (playersCopy[i].slot =='RB') {

                logger.log("Looking for RB Replacement For: " + playersCopy[i].name);

                // Inner Loop through copied lineup
                for (let j=0; j < playersCopy.length; j++) {

                    // Skip active players
                    if (playersCopy[j].slot != 'Bench') { 
                        logger.log("Skipping Active Player: " + playersCopy[j].name);
                        continue;
                    }

                    // Skip Non-RB players
                    if (playersCopy[j].position != 'RB') { 
                        logger.log("Skipping Non-RB Player: " + playersCopy[j].name);
                        continue; 
                    }

                    // Comparison
                    logger.log("Comparing " + playersCopy[i].name + " with " + playersCopy[j].name);

                    // Do not swap if projection is lower
                    if (playersCopy[i].espnProjection >= playersCopy[j].espnProjection) {
                        logger.log(playersCopy[j].name + " is not a worthwhile replacement");
                        continue; 
                    }
                    

                    //Swap if projection is higher
                    logger.log(playersCopy[j].name + " is a worthwhile replacement");
                    playersCopy[j].slot = playersCopy[i].slot;
                    playersCopy[i].slot = 'Bench';  
                }
            }

            // WR Logic
            if (playersCopy[i].slot =='WR') {

                logger.log("Looking for WR Replacement For: " + playersCopy[i].name);

                // Inner Loop through copied lineup
                for (let j=0; j < playersCopy.length; j++) {

                    // Skip active players
                    if (playersCopy[j].slot != 'Bench') { 
                        logger.log("Skipping Active Player: " + playersCopy[j].name);
                        continue;
                    }

                    // Skip Non-WR players
                    if (playersCopy[j].position != 'WR') { 
                        logger.log("Skipping Non-WR Player: " + playersCopy[j].name);
                        continue; 
                    }

                    // Comparison
                    logger.log("Comparing " + playersCopy[i].name + " with " + playersCopy[j].name);

                    // Do not swap if projection is lower
                    if (playersCopy[i].espnProjection >= playersCopy[j].espnProjection) {
                        logger.log(playersCopy[j].name + " is not a worthwhile replacement");
                        continue; 
                    }
                    

                    //Swap if projection is higher
                    logger.log(playersCopy[j].name + " is a worthwhile replacement");
                    playersCopy[j].slot = playersCopy[i].slot;
                    playersCopy[i].slot = 'Bench';  
                }
            }

            // TE Logic
            if (playersCopy[i].slot =='TE') {

                logger.log("Looking for TE Replacement For: " + playersCopy[i].name);

                // Inner Loop through copied lineup
                for (let j=0; j < playersCopy.length; j++) {

                    // Skip active players
                    if (playersCopy[j].slot != 'Bench') { 
                        logger.log("Skipping Active Player: " + playersCopy[j].name);
                        continue;
                    }

                    // Skip Non-TE players
                    if (playersCopy[j].position != 'TE') { 
                        logger.log("Skipping Non-TE Player: " + playersCopy[j].name);
                        continue; 
                    }

                    // Comparison
                    logger.log("Comparing " + playersCopy[i].name + " with " + playersCopy[j].name);

                    // Do not swap if projection is lower
                    if (playersCopy[i].espnProjection >= playersCopy[j].espnProjection) {
                        logger.log(playersCopy[j].name + " is not a worthwhile replacement");
                        continue; 
                    }
                    

                    //Swap if projection is higher
                    logger.log(playersCopy[j].name + " is a worthwhile replacement");
                    playersCopy[j].slot = playersCopy[i].slot;
                    playersCopy[i].slot = 'Bench';  
                }
            }

            // K Logic
            if (playersCopy[i].slot =='K') {

                logger.log("Looking for RB Replacement For: " + playersCopy[i].name);

                // Inner Loop through copied lineup
                for (let j=0; j < playersCopy.length; j++) {

                    // Skip active players
                    if (playersCopy[j].slot != 'Bench') { 
                        logger.log("Skipping Active Player: " + playersCopy[j].name);
                        continue;
                    }

                    // Skip Non-K players
                    if (playersCopy[j].position != 'K') { 
                        logger.log("Skipping Non-K Player: " + playersCopy[j].name);
                        continue; 
                    }

                    // Comparison
                    logger.log("Comparing " + playersCopy[i].name + " with " + playersCopy[j].name);

                    // Do not swap if projection is lower
                    if (playersCopy[i].espnProjection >= playersCopy[j].espnProjection) {
                        logger.log(playersCopy[j].name + " is not a worthwhile replacement");
                        continue; 
                    }
                    

                    //Swap if projection is higher
                    logger.log(playersCopy[j].name + " is a worthwhile replacement");
                    playersCopy[j].slot = playersCopy[i].slot;
                    playersCopy[i].slot = 'Bench';  
                }
            }

            // D/ST Logic
            if (playersCopy[i].slot =='D/ST ') {

                logger.log("Looking for D/ST Replacement For: " + playersCopy[i].name);

                // Inner Loop through copied lineup
                for (let j=0; j < playersCopy.length; j++) {

                    // Skip active players
                    if (playersCopy[j].slot != 'Bench') { 
                        logger.log("Skipping Active Player: " + playersCopy[j].name);
                        continue;
                    }

                    // Skip Non-D/ST players
                    if (playersCopy[j].position != 'D/ST') { 
                        logger.log("Skipping Non-D/ST Player: " + playersCopy[j].name);
                        continue; 
                    }

                    // Comparison
                    logger.log("Comparing " + playersCopy[i].name + " with " + playersCopy[j].name);

                    // Do not swap if projection is lower
                    if (playersCopy[i].espnProjection >= playersCopy[j].espnProjection) {
                        logger.log(playersCopy[j].name + " is not a worthwhile replacement");
                        continue; 
                    }
                    

                    //Swap if projection is higher
                    logger.log(playersCopy[j].name + " is a worthwhile replacement");
                    playersCopy[j].slot = playersCopy[i].slot;
                    playersCopy[i].slot = 'Bench';  
                }
            }

            // FLEX Logic
            if (playersCopy[i].slot =='FLEX') {

                logger.log("Looking for FLEX Replacement For: " + playersCopy[i].name);

                // Inner Loop through copied lineup
                for (let j=0; j < playersCopy.length; j++) {

                    // Skip active players
                    if (playersCopy[j].slot != 'Bench') { 
                        logger.log("Skipping Active Player: " + playersCopy[j].name);
                        continue;
                    }

                    // Skip Non-Flex players
                    if (playersCopy[j].position == 'QB' || playersCopy[j].position == 'K' || playersCopy[j].position == 'D/ST') { 
                        logger.log("Skipping Non-FLEX Player: " + playersCopy[j].name);
                        continue; 
                    }

                    // Comparison
                    logger.log("Comparing " + playersCopy[i].name + " with " + playersCopy[j].name);

                    // Do not swap if projection is lower
                    if (playersCopy[i].espnProjection >= playersCopy[j].espnProjection) {
                        logger.log(playersCopy[j].name + " is not a worthwhile replacement");
                        continue; 
                    }
                    

                    //Swap if projection is higher
                    logger.log(playersCopy[j].name + " is a worthwhile replacement");
                    playersCopy[j].slot = playersCopy[i].slot;
                    playersCopy[i].slot = 'Bench';  
                }
            }
        }

        const finalProjection = (await this.CalculatePlayerProjections(playersCopy)).espnProjection;
        logger.log("Final Projection: " + finalProjection);
    }

    // Calculate Projections for this Roster
    async CalculateRosterProjections(){

        // Reset all projections to zero
        this.espnProjection = 0.0;
        this.yahooProjection = 0.0;
        this.fantasyProsProjection = 0.0;
        this.averageProjection = 0.0;

        // Add all active lineup player projections
        for (let i=0; i < this.players.length; i++) {

            // Skip benched players
            if (this.players[i].slot == 'Bench') { continue; }

            // Add site projetions to team total
            this.espnProjection += this.players[i].espnProjection;
            this.yahooProjection += this.players[i].yahooProjection;
            this.fantasyProsProjection += this.players[i].fantasyProsProjection;
            this.averageProjection += this.players[i].averageProjection;
        }
    }

    // Calculate Projections for a list of players
    async CalculatePlayerProjections(playerList){

        // Reset all projections to zero
        const projResults = {
            espnProjection : 0.0,
            yahooProjection : 0.0,
            fantasyProsProjection : 0.0,
            averageProjection : 0.0
        };

        // Add all active lineup player projections
        for (let i=0; i < playerList.length; i++) {

            // Skip benched players
            if (playerList[i].slot == 'Bench') { continue; }

            // Add site projections to team total
            projResults.espnProjection += playerList[i].espnProjection;
            projResults.yahooProjection += playerList[i].yahooProjection;
            projResults.fantasyProsProjection += playerList[i].fantasyProsProjection;
            projResults.averageProjection += playerList[i].averageProjection;
        }

        return projResults;
    }

    async Print(){
        console.log("ESPN Projection: " + this.espnProjection);
        console.log("Yahoo Projection: " + this.yahooProjection);
        console.log("FantasyPros Projection: " + this.fantasyProsProjection);
        console.log("Average Projection: " + this.averageProjection);
        console.log("Roster: ");
        for (let i=0; i < this.players.length; i++) {
            let printStr = '  - ' + this.players[i].slot + ', ';
            printStr += this.players[i].name + ', ';
            printStr += this.players[i].position + ',';
            printStr += this.players[i].team + ',';
            printStr += this.players[i].espnProjection + ',';
            printStr += this.players[i].yahooProjection + ',';
            printStr += this.players[i].fantasyProsProjection + ',';
            printStr += this.players[i].averageProjection;
            console.log(printStr);
       }
    }
}

module.exports = Roster;