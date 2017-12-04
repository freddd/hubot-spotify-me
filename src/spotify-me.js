// Description:
// Basically "hubot image me <something>" for spotify
// The normal usage is just to write hubot spotify me <something> and hubot will query tracks on spotify
// There is a bonus feature where you type "roulette" and it will get a random word and search for a track
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   hubot spotify me <search string>
//   hubot spotify me roulette
//
// Author:
//   Fredrik Jönsson

module.exports = robot =>
  robot.respond(/spotify( me)? (.*)/i, function(msg) {
    const query = msg.match[2];
    const track = "track";

    if (query === 'roulette') {
      return roulette(msg, response => spotify(robot, msg, response, track, callback));
    } else {
      return spotify(robot, msg, query, track, callback);
    }
  })
;

var roulette = (msg, cb) =>
  msg.http('http://randomword.setgetgo.com/get.php')
  .get()(function(err, res, body) {
      if (err) {
        msg.send(`Heeeeelp, something is going terribly wrong: ${err}`);
        return;
      } else if ((res.statusCode / 100) === 2) {
        return cb(body);
      } else {
        msg.send(`Call for backup, unknown error calling randomword: ${JSON.parse(body).message}`);
        return;
      }
  })
;

var callback = function(query, response, msg) {
        if ((response.tracks.items.length > 0) && (response.tracks.items[0].external_urls !== null)) {
          msg.send(response.tracks.items[0].external_urls.spotify);
          return;
        } else {
          msg.send(`Even I can't find that crappy song called "${query}"! I guess that's for the best.`);
          return;
        }
      };

var spotify = function(robot, msg, query, type, cb) {
  const q = {q: query, type, limit: 1};
  return msg.http("https://api.spotify.com/v1/search")
    .query(q)
    .get()(function(err, res, body) {
      if (err) {
        msg.send(`Heeeeelp, something is going terribly wrong: ${err}`);
        return;
      } else if ((res.statusCode / 100) === 2) {
        return cb(query, JSON.parse(body), msg);
      } else {
        msg.send(`Call for backup, unknown error calling spotify: ${JSON.parse(body).message}`);
        return;
      }
  });
};
