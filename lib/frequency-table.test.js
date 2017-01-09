const test = require('ava')

const { FrequencyTable } = require('./frequency-table')

test('frequency table - table', t => {
  const cases = [
    { first: 0, last: 8, len: 108 },
    { first: 3, last: 5, len: 36 },
    { first: 4, len: 12 },
    { len: 108 },
  ]

  cases.forEach(c => {
    const freqs = new FrequencyTable(c.first, c.last)

    t.is(freqs.table.length, c.len)
  })
})

test('frequency table - nearest notes', t => {
  const freqs = new FrequencyTable(4)

  const cases = [
    // border
    { hz: 246.94, note: { note: 'C', hz: 261.63, percentage: -100 } },
    { hz: 259, note: { note: 'C', hz: 261.63, percentage: -33 } },
    { hz: 260, note: { note: 'C', hz: 261.63, percentage: -20 } },
    { hz: 261.63, note: { note: 'C', hz: 261.63, percentage: 0 } },
    { hz: 263, note: { note: 'C', hz: 261.63, percentage: 17 } },
    // middle
    { hz: 435, note: { note: 'A', hz: 440, percentage: -40 } },
    { hz: 440, note: { note: 'A', hz: 440, percentage: 0 } },
    { hz: 445, note: { note: 'A', hz: 440, percentage: 38 } },
    // border
    { hz: 490, note: { note: 'B', hz: 493.88, percentage: -27 } },
    { hz: 493.88, note: { note: 'B', hz: 493.88, percentage: 0 } },
    { hz: 495, note: { note: 'B', hz: 493.88, percentage: 8 } },
    { hz: 600, note: { note: 'B', hz: 493.88, percentage: 100 } },
  ]

  cases.forEach(c => {
    const note = freqs.nearestNote(c.hz)

    t.deepEqual(note, c.note)
  })
})

