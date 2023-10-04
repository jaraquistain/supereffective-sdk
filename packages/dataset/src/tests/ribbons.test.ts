import { z } from 'zod'
import { localDataLoader } from '../admin/loader'
import { validate } from '../admin/validation'
import { ribbonSchema } from '../schemas'

describe('Validate ribbons.json data', () => {
  const recordList = localDataLoader.ribbons()

  it('should be valid', () => {
    const listSchema = z.array(ribbonSchema)
    const validation = validate(listSchema, recordList)

    if (!validation.success) {
      console.error(validation.errorsSummary.join('\n'))
    }

    expect(validation.success).toBe(true)
    expect(validation.errors).toHaveLength(0)
  })
})
