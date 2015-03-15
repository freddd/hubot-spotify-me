# hubot-spotify-me

A hubot script that interacts with the Spotify Web API, perfect to use during fridays in the office

See [`src/spotify-me.coffee`](src/spotify-me.coffee) for full documentation.

Published at [`npmjs`](https://www.npmjs.com/package/hubot-spotify-me)

## Installation

In hubot project repo, run:

`npm install hubot-spotify-me --save`

Then add **hubot-spotify-me** to your `external-scripts.json`:

```json
[
  "hubot-spotify-me"
]
```

## Sample Interaction
Using ```hubot spotify me <something>``` will result in a search for a track called <something>

Using ```hubot spotify me roulette``` will result in a search for a track using a random word collected from randomword.setgetgo.com

```
Hubot> hubot spotify me test
Hubot> https://open.spotify.com/track/0yA1MBQ60SoiYt7xqdS3H1
Hubot> hubot spotify me roulette
Hubot> Even I can't find that crappy song called "poststernal"! I guess that's for the best.
```
