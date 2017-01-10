#!/usr/bin/env node

const readline = require('readline')

const { FrequencyTable, createMic, bufferToFreq } = require('..')

const ft = new FrequencyTable(3, 5)

const rate = 44100

const mic = createMic(rate)

mic.on('error', e => {
  console.error(e)
  process.exit(1)
})

let silence = 0
mic.on('data', b => {
  const hz = bufferToFreq(rate, b)

  silence++
  if (silence >= 5) {
    readline.clearLine(process.stdout)
    readline.cursorTo(process.stdout, 0)
  }

  const note = ft.nearestNote(hz)

  // ignore frequencies too far from given octaves
  if (note.percentage > 100 || note.percentage < -100) return

  silence = 0

  readline.clearLine(process.stdout)
  readline.cursorTo(process.stdout, 0)

  note.note = note.note.length === 1 ? `${note.note} ` : note.note

  if (note.percentage === 0) {
    process.stdout.write(`${' '.repeat(10)} ${note.note} ${' '.repeat(10)}`)
    return
  }
  
  if (note.percentage > 0) {
    const stripes = parseInt(note.percentage / 10, 10)
    const spaces = 10 - stripes
    process.stdout.write(`${' '.repeat(10)} ${note.note} ${'='.repeat(stripes)}${' '.repeat(spaces)}`)
    return
  }

  if (note.percentage < 0) {
    const stripes = parseInt((note.percentage * -1) / 10, 10)
    const spaces = 10 - stripes
    process.stdout.write(`${' '.repeat(spaces)}${'='.repeat(stripes)} ${note.note} ${' '.repeat(10)}`)
    return
  }
})

mic.start()

