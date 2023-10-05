// TypedCSV parser types

import type { TypedCSVParserOptions, TypedCSVTypeSpec } from '../parser-tscv/types'
import type { SemverVersion } from '../types'

type LinoDBType = TypedCSVTypeSpec
type LinoDBTableName = Lowercase<string>
type LinoDBColumnName = Lowercase<string>

export type LinoDBColumn = {
  name: LinoDBColumnName
  type: LinoDBType
  unique?: boolean
  nullable?: boolean
  primary?: boolean
  minLength?: number
  maxLength?: number
  enumValues?: string[] | number[]
}

export type LinoDBTableTextIndex = {
  table: LinoDBTableName
  columns: LinoDBColumnName[]
  index: string
}

export type LinoDBTable = {
  name: LinoDBTableName
  columns: LinoDBColumn[]
  textIndices: LinoDBTableTextIndex[]
}

/**
 * LinoDB is a database format that is based on TypedCSV (TSCV).
 *
 * It is a TCSV-based database format that is designed to be human-readable and human-editable.
 * The whole database is stored in a single JSON file, where the records are stored as TSCV strings.
 *
 */
export type LinoDBStore<TMetaData extends Record<string, unknown> = any, TRecord = string> = {
  schema: {
    version: `v${SemverVersion}`
    tables: Record<LinoDBTableName, LinoDBTable>
    parserOptions: TypedCSVParserOptions
  }
  meta: {
    version: `v${SemverVersion}`
    createdAt?: LinoDBColumnName
    updatedAt?: LinoDBColumnName
  } & TMetaData
  records: Record<LinoDBTableName, TRecord[]>
}

export type SerializableLinoDBStore<TMetaData extends Record<string, unknown> = any> = {
  schema: `v${SemverVersion}`
  meta: LinoDBStore<TMetaData, string>['meta']
  records: LinoDBStore<TMetaData, string>['records']
}

export type LinoDBStoreDecoder = (encodedStore: string) => LinoDBStore
export type LinoDBStoreEncoder = (store: LinoDBStore) => string
export type LinoDBStoreParser = {
  decode: LinoDBStoreDecoder
  encode: LinoDBStoreEncoder
  validate: (store: string | LinoDBStore) => boolean
}
