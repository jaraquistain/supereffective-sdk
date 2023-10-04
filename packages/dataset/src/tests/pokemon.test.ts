import { z } from 'zod'
import { getPokemonList } from '../admin/queries'
import { validate } from '../admin/validation'
import { pokemonSchema } from '../schemas'

describe('Validate pokemon/*.json data', () => {
  const recordList = getPokemonList()

  it('should be valid', () => {
    const listSchema = z.array(pokemonSchema)
    const validation = validate(listSchema, recordList)

    if (!validation.success) {
      console.error(validation.errorsSummary.join('\n'))
    }

    expect(validation.success).toBe(true)
    expect(validation.errors).toHaveLength(0)
  })
})
