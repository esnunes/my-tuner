const mic = require('mic');

function createMic (rate) {
  const m = mic({
    rate,
    channel: 1,
    bitwidth: 16,
    encoding: 'signed-integer',
  })

  const input = m.getAudioStream()

  return {
    start: () => m.start(),
    stop: () => m.stop(),
    resume: () => m.resume(),
    on: (...args) => input.on(...args),
  }
}

module.exports = {
  createMic,
}
