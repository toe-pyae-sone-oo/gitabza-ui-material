import stringReplace from 'react-string-replace'

const chordRegex = /([CDEFGAB][b#]?[m]?[(]?(2|5|6|7|9|11|13|6\/9|7-5|7-9|7#5|7#9|7\+5|7\+9|7b5|7b9|7sus2|7sus4|add2|add4|add9|aug|dim|dim7|m\|maj7|m6|m7|m7b5|m9|m11|m13|maj7|maj9|maj11|maj13|mb5|m|sus|sus2|sus4|M7)?(\))?)(?=\s|\.|\)|-|\/)/g
const firstChordRegex = /([CDEFGAB][b#]?(?=\s(?![a-zH-Z])|(?=(2|5|6|7|9|11|13|6\/9|7-5|7-9|7#5|7#9|7‌​\+5|7\+9|7b5|7b9|7sus2|7sus4|add2|add4|add9|aug|dim|dim7|m\|maj7|m6|m7|m7b5|m9|m1‌​1|m13|maj7|maj9|maj11|maj13|mb5|m|sus|sus2|sus4|M7|\))(?=(\s|\/)))|(?=\s|\.|\)|-|\/)))/g

export const wrapChords = (input, wrapper) => {
  const wrapped = input.replace(chordRegex, '[$1]')
  return stringReplace(wrapped, /\[([\w\#]+)\]/g, wrapper)
}

const notes = {
  scale: {
    C: 1,
    'C#': 2,
    Db: 2,
    D: 3,
    'D#': 4,
    Eb: 4,
    E: 5,
    Fb: 5,
    F: 6,
    'F#': 7,
    Gb: 7,
    G : 8,
    'G#': 9,
    Ab: 9,
    A : 10,
    'A#': 11,
    Bb: 11,
    B : 12,
    Cb: 12
  },
  normal: [null, 'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'],
}

const transposeChord = (note, types, steps) => {
  if (notes.scale[note]) {
    const ix = notes.scale[note]
    let ixNew = ix + steps
    if (!notes[types][ixNew]) {
      ixNew += ixNew > 0 ? -12 : 12
    }
    return notes[types][ixNew]
  }
  return null
}

export const tranpsoseSong = (song, steps) => {
  steps = steps % 12
  const matches = song.match(chordRegex)
  const chords = [...new Set(matches)]
    .map(chord => {
      if (chord.length > 1 && (chord[1] === 'b' || chord[1] === '#')) {
        return `[${chord.substring(0, 2)}]`
      }
      return `[${chord.substring(0, 1)}]`
    })

  song = song.replace(firstChordRegex, '[$1]')

  const converter = {}

  for (let chord of chords) {
    const c = transposeChord(chord.replace(/\[|\]/g, ''), 'normal', steps)
    c && (converter[chord] = c)
  }

  const regexStr = Object.keys(converter)
    .map(c => {
      c = c.replace(/\[/g, '\\\[')
      c = c.replace(/\]/g, '\\\]')
      return c
    })
    .join('|')
  const regex = new RegExp(regexStr, 'g')

  return song.replace(regex, m => converter[m])
}