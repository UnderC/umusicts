const path = require('path')
class Song {
  constructor (inf) {
    this.url = inf.video_url
		this.title = inf.title
		this.author = inf.author.name
    this.length = inf.length_seconds
    this.vID = inf.video_id
		this.thumbnail = inf.player_response.videoDetails.thumbnail.thumbnails[3].url
    this.path = path.join(__dirname, `./stream/${this.vID}.mp3`)
  }
}

module.exports = Song