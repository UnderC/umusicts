const events = require('events')
const Server = require('./server')
class MusicServers extends events.EventEmitter {
  constructor (seoa) {
    super()
    this.servers = new Map()
    this.client = seoa
  }

  new (gID, channel) {
    this.servers.set(gID, new Server(gID, this.client))
    const here = this._(gID)
    this.emit(`${gID}_add`, here)
    if (channel) here._(channel)
    return here
  }

  _ (gID, channel) {
    const res = this.servers.get(gID)
    if (!res) {
      this.new(gID, channel)
      return this._(gID)
    }
    return res
  }

  set (gID, c, channel) {
    if (!c || c.name !== 'Server') return
    this.servers.set(gID, c)
    if (channel) this._(gID).join(channel)
  }
}

module.exports = MusicServers
