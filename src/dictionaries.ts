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
  fave?: boolean
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
function add1(
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
    add({
      name,
      url: toUrl(entryA),
      source: keyA,
      fave,
    })
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
// add({
//   name: 'ox',

//   url: search =>
//     `https://www.oxfordlearnersdictionaries.com/definition/english/${search}`,
//   source: 'en',
// })
add({
  name: 'ox',

  url: search =>
    `https://www.oxfordlearnersdictionaries.com/definition/american_english/${search}`,
  source: 'en',
})
// Cube
// add({
//   name: 'cube',
//   url: search =>
//     `http://seas3.elte.hu/cube/index.pl?s=${search}&fullw=on&uni8=on&strut=on&trick=on&t=&syllcount=&maxout=&wfreq=0-9&grammar=`,
//   source: 'en',
// })
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
// Robert
add({
  name: 'r',
  url: search =>
    `https://dictionnaire.lerobert.com/definition/${search}`,
  source: 'fr',
})
// Wiktionary
add1(
  'w',
  sl => search =>
    `https://${sl}.wiktionary.org/wiki/${search}`
)
// YouGlish
add1(
  'yg',
  sl => search =>
    `https://youglish.com/pronounce/${search}/${sl}`,
  false,
  {
    en: 'english',
    es: 'spanish',
    fr: 'french',
    de: 'german',
    it: 'italian',
    pt: 'portuguese',
  }
)
// DeepL
add2(
  'dl',
  (sl, tl) => search =>
    `https://www.deepl.com/${sl}/translator#${sl}/${tl}/${search}`
)
