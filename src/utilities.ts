type Language =
  | 'en'
  | 'fr'
  | 'es'
  | 'it'
  | 'pt'
  | 'de'

type Dictionary = {
  name: string
  url: (search: string) => string
  source: Language
  target?: Language
  fave: boolean
}

export const dictionaries = []

const add = (dic: Dictionary) =>
  dictionaries.push(dic)

function add2(
  name: string,
  toUrl,
  fave = false,
  parse = {
    en: 'en',
    es: 'es',
    fr: 'fr',
    de: 'de',
    pt: 'pt',
    it: 'it',
  }
) {
  const entries = Object.entries(parse)
  for (const [keyA, entryA] of entries) {
    for (const [keyB, entryB] of entries) {
      if (keyB === keyA) continue // ⛔ skip self
      add({
        name: name + ' ' + keyB,
        url: toUrl(entryA, entryB),
        source: keyA,
        target: keyB,
        fave,
      })
    }
  }
}

// Merriam-Webster
add({
  name: 'mw',
  url: search =>
    `https://www.merriam-webster.com/dictionary/${search}`,
  source: 'en',
  fave: true,
})
// Oxford
add({
  name: 'ox',

  url: search =>
    `https://www.oxfordlearnersdictionaries.com/definition/english/${search}`,
  source: 'en',
  fave: false,
})
add({
  name: 'ox 🇺🇸',

  url: search =>
    `https://www.oxfordlearnersdictionaries.com/definition/american_english/${search}`,
  source: 'en',
  fave: false,
})
// Cube
add({
  name: 'cube',
  url: search =>
    `http://seas3.elte.hu/cube/index.pl?s=${search}&fullw=on&uni8=on&strut=on&trick=on&t=&syllcount=&maxout=&wfreq=0-9&grammar=`,
  source: 'en',
  fave: false,
})
// Cambrige
add({
  name: 'c de',
  url: search =>
    `https://dictionary.cambridge.org/dictionary/english-german/${search}`,
  source: 'en',
  target: 'de',
  fave: true,
})
add({
  name: 'c en',
  url: search =>
    `https://dictionary.cambridge.org/dictionary/german-english/${search}`,
  source: 'de',
  target: 'en',
  fave: true,
})
// WordReference
add2(
  'wr',
  (sl, tl) => search =>
    `https://www.wordreference.com/${sl}${tl}/${search}`,
  true
)
