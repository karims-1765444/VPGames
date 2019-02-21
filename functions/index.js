const functions = require("firebase-functions");
const admin = require("firebase-admin");
const isEqual = require("lodash.isequal");

var config = {

};

admin.initializeApp(config);


/**
 * calculates performance of every player in every match in every event
 * adds a score field for every player, calculates best player of every
 * team and best player of entire game
 * updated in real time on every database write
 */
exports.calculatePerformance = functions.firestore
  .document("events/{event}")
  .onWrite((change, context) => {

    // fail fast if document is deleted
    if (!change.after.exists) {
      console.log("Document is deleted. Exiting.");
      return null;
    }

    let matches = change.after.data().remark.match_ids;

    // fail fast if our data doesn't exist
    if (matches.length == 0) {
      console.log("No match data to calculate performance. Exiting.");
      return null;
    }

    // stop if our data matches
    // uses imported deep isEqual comparison to compare previous and current match data
    if (change.before.exists) {
      let previousMatches = change.before.data().remark.match_ids;
      if (isEqual(matches, previousMatches)) {
        console.log("Matches information not updated. Exiting.");
        return null;
      }
    }

    // calculate match performance
    for (var i = 0; i < matches.length; i++) {
      if (matches[i].data) {
        matches[i].data.detailed.team1 = playerStats(
          matches[i].data.detailed.team1
        );
        matches[i].data.detailed.team2 = playerStats(
          matches[i].data.detailed.team2
        );
        matches[i].data.detailed.playerOfTheGame = bestPlayer(
          matches[i].data.detailed.team1.bestPlayer,
          matches[i].data.detailed.team2.bestPlayer
        );
      }
    }

    // stop if our data matches to avoid infinite loops
    if (change.before.exists) {
        let previousMatches = change.before.data().remark.match_ids;
        if (isEqual(matches, previousMatches)) {
            console.log("Performance already calculated. Exiting.");
            return null;
        }
    }

    // then return a promise to update the database
    console.log("Match performance updated.")
    return change.after.ref.update(
      {
        remark: { match_ids: matches }
      }
    )
  });

//calculates score of every player and the best player in a team
function playerStats(team) {
  let teamArray = Object.keys(team);
  team.bestPlayer = {score: Number.NEGATIVE_INFINITY}; //initialized with minimum score so first player becomes best player
  for (var playerIndex = 0; playerIndex < teamArray.length; playerIndex++) {
    //used to prevent calculating the score of best player since it takes the already calculated score of a certain player
    if(teamArray[playerIndex]!="bestPlayer"){ 
       team[teamArray[playerIndex]].score = score(team[teamArray[playerIndex]]);
       team.bestPlayer = bestPlayer(team[teamArray[playerIndex]], team.bestPlayer);
    }
  }
  return team;
}

//calculates score of a player based on a basic formula, uses powers of two to speed up arithmetic
function score(player) {
  return Math.round(
    player.kill * 2 +
      player.sup -
      player.death *2 +
      (player.harm - player.harmed) * 0.03125
  )
}

//returns name, logo, and score for the better player of the two
function bestPlayer(playerA, playerB) {
  return playerA.score >= playerB.score
    ? {
        user: {
          name: playerA.user.name,
          logo: playerA.user.logo
        },
        score: playerA.score
      }
    : {
        user: {
          name: playerB.user.name,
          logo: playerB.user.logo
        },
        score: playerB.score
      };
}
