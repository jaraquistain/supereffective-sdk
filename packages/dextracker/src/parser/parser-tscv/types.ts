// TypedCSV parser types

import type { SemverVersion } from '../types'

export type TypedCSVParserOptions = {
  quoteStrings: boolean
  arrayDelimiters: [string, string]
  arraySeparator: string
  propertySeparator: string
}

export type TypedCSVDocument<Meta extends Record<string, unknown> = any> = {
  schema: {
    version: `v${SemverVersion}`
    parserOptions: TypedCSVParserOptions
  } & Meta
  data: string[]
}
export type TypedCSVDecoder = (tcsv: string) => TypedCSVDocument
export type TypedCSVEncoder = (doc: TypedCSVDocument) => string
export type TypedCSVParser = {
  decode: TypedCSVDecoder
  encode: TypedCSVEncoder
  validate: (tcsv: string | TypedCSVDocument) => boolean
}

export const TYPEDCSV_TYPE_TOKENS = [
  'boolean',
  'number',
  'number[]',
  'number:int',
  'number:int[]',
  'string',
  'string[]',
  'string:keyword',
  'string:keyword[]',
  'string:date', // YYYY-MM-DD
  'string:datetime', // YYYY-MM-DD HH:MM:SS
  'string:text',
] as const

export type TypedCSVTypeToken = typeof TYPEDCSV_TYPE_TOKENS[number]

export type TypedCSVTypeSpec = {
  type: 'boolean' | 'number' | 'string'
  format?: 'int' | 'numeric' | 'text' | 'keyword' | 'date' | 'datetime'
  array?: boolean
}

export type TypedCSVTypeTokenToNative = {
  boolean: boolean
  number: number
  'number:int': number
  'number:int[]': number[]
  string: string
  'string:keyword': string
  'string:keyword[]': string[]
  'string:date': Date
  'string:datetime': Date
  'string:text': string
}
