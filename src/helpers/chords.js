import stringReplace from 'react-string-replace'

const chordRegex = /([CDEFGAB][b#]?[m]?[(]?(2|5|6|7|9|11|13|6\/9|7-5|7-9|7#5|7#9|7\+5|7\+9|7b5|7b9|7sus2|7sus4|add2|add4|add9|aug|dim|dim7|m\|maj7|m6|m7|m7b5|m9|m11|m13|maj7|maj9|maj11|maj13|mb5|m|sus|sus2|sus4|M7)?(\))?)(?=\s|\.|\)|-|\/)/g

export const wrapChords = (input, wrapper) => {
  const wrapped = input.replace(chordRegex, '[$1]')
  return stringReplace(wrapped, /\[(\w+)\]/g, wrapper)
}