const { notes } = require('./notes')

const FrequencyTable = function (fo, lo) {
  if (typeof fo === 'undefined') fo = 0
  if (typeof lo === 'undefined') lo = fo === 0 ? 8 : fo

  this.table = generateTable(fo, lo)
}

FrequencyTable.prototype.nearestNote = function (hz) {
  const pos = this.table.findIndex(v => hz <= v.hz)

  if (pos === 0) {
    const note = this.table[pos]
    const next = this.table[pos + 1]

    const percentage = howFar(hz, note, next) * -1

    return Object.assign({ percentage }, note)
  }

  if (pos === -1) {
    const note = this.table[this.table.length - 1]
    const prev = this.table[this.table.length - 2]

    const percentage = howFar(hz, note, prev)

    return Object.assign({ percentage }, note)
  }

  const a = this.table[pos - 1];
  const b = this.table[pos];

  const aFar = howFar(hz, a, b)
  const bFar = howFar(hz, b, a)

  const node = aFar <= bFar ? a : b
  const percentage = aFar <= bFar ? aFar : bFar * -1

  return Object.assign({ percentage }, node)
}

function generateTable (fo, lo) {
  const a = Math.pow(2, 1/12)

  const result = []

  const firstOctave = (fo * 12 - 57)
  const lastOctave = (lo * 12 - 57)

  for (let i = firstOctave; i <= lastOctave; i += notes.length) {
    for (let j = 0; j < notes.length; j++) {
      const hz = parseFloat((440*Math.pow(a, i + j)).toFixed(2))
      const note = notes[j]
      result.push({ hz, note })
    }
  }

  return result
}

function howFar (hz, a, b) {
  const total = Math.abs(a.hz - b.hz) / 2
  const distance = Math.abs(hz - a.hz)
  return parseInt((distance / total) * 100, 10)
}

module.exports = {
  FrequencyTable,
}

