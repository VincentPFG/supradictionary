export const data = (search: string) => {
  function add2(
    name: string,
    url,
    fave = false,
    _en = 'en',
    _es = 'es',
    _fr = 'fr'
  ) {
    en.push([name + ' fr', url(_en, _fr), fave])
    en.push([name + ' es', url(_en, _es), fave])
    es.push([name + ' en', url(_es, _en), fave])
    es.push([name + ' fr', url(_es, _fr), fave])
    fr.push([name + ' en', url(_fr, _en), fave])
    fr.push([name + ' es', url(_fr, _es), fave])
  }

  function add1(
    name: string,
    url,
    fave = false,
    _en = 'en',
    _es = 'es',
    _fr = 'fr'
  ) {
    en.push([name, url(_en), fave])
    es.push([name, url(_es), fave])
    fr.push([name, url(_fr), fave])
  }

  const en = [
    [
      'mw',
      `https://www.merriam-webster.com/dictionary/${search}`,
      true,
    ],

    [
      'ox 🇺🇸',
      `https://www.oxfordlearnersdictionaries.com/definition/american_english/${search}`,
      false,
    ],
    [
      'ox',
      `https://www.oxfordlearnersdictionaries.com/definition/english/${search}`,
      false,
    ],

    [
      'cube',
      `http://seas3.elte.hu/cube/index.pl?s=${search}&fullw=on&uni8=on&strut=on&trick=on&t=&syllcount=&maxout=&wfreq=0-9&grammar=`,
      false,
    ],
    [
      'c de',
      `https://dictionary.cambridge.org/dictionary/english-german/${search}`,
      true,
    ],
  ]
  const es = [
    [
      'wr ⇒',
      `https://www.wordreference.com/conj/esverbs.aspx?v=${search}`,
      false,
    ],
  ]
  const fr = [
    [
      'r',
      `https://dictionnaire.lerobert.com/definition/${search}`,
      false,
    ],
  ]
  const de = [
    [
      'c en',
      `https://dictionary.cambridge.org/dictionary/german-english/${search}`,
      true,
    ],
    [
      'w',
      `https://de.wiktionary.org/wiki/${search}`,
      true,
    ],
  ]

  add2(
    'wr',
    (sl, tl) =>
      `https://www.wordreference.com/${sl}${tl}/${search}`,
    true
  )
  add2(
    'dl',
    (sl, tl) =>
      `https://www.deepl.com/${sl}/translator#${sl}/${tl}/${search}`,
    false
  )
  add1(
    'w',
    sl =>
      `https://${sl}.wiktionary.org/wiki/${search}`,
    false
  )
  add1(
    'yg',
    sl =>
      `https://youglish.com/pronounce/${search}/${sl}`,
    false,
    'english',
    'spanish',
    'french'
  )

  return { en, es, fr, de }
}
