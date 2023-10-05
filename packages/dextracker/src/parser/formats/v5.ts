export const dexSchemaV5 = {
  version: 'v5',
  arrayDelimiters: ['(', ')'],
  arraySeparator: ',',
  propertySeparator: ';',
  boxPrefix: '###',
  pokemonPrefix: '-',
  boxProperties: [
    ['title', 'string:text'],
    ['shiny', 'boolean'],
  ],
  pokemonProperties: [
    ['box', 'number:int'],
    ['cell', 'number:int'],
    ['nid', 'string:slug'],
    ['caught', 'boolean'],
    ['ball', 'string:slug'],
    ['day', 'string:date'],
    ['lang', 'string:slug'],
    ['nickname', 'string:text'],
    ['notes', 'string:text'],
    // ['location', 'string:slug'],
    // ['game', 'string:slug'],
    ['shiny', 'boolean'],
    // ['otname', 'string:slug'],
    // ['otid', 'string:slug'],
    // ['otgender', 'string:slug'],
    ['region', 'string:slug'],
    ['originmark', 'string:slug'],
    ['nature', 'string:slug'],
    ['level', 'number:int'],
    // ['pokerus', 'string:slug'],
    // ['dmaxlevel', 'number:int'],
    // ['teratype', 'string:slug'],
    ['item', 'string:slug'],
    ['evs', 'number:int[]'],
    ['ivs', 'number:int[]'],
    ['gender', 'string:slug'],
    ['ability', 'string:slug'],
    ['moves', 'string:slug[]'],
    ['ribbons', 'string:slug[]'],
    ['emblems', 'string:slug[]'],
    ['tags', 'string:slug[]'],
  ],
}

export const dexSchemaConfigV5 = {
  schema: dexSchemaV5,
  migrations: {
    from_v3: (doc: any) => {
      return doc
    },
    from_v4: (doc: any) => {
      return doc
    },
  },
}
