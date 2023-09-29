import { type SafeParseReturnType, z } from 'zod'

import recordList from '../data/ribbons.json'

import { type Ribbon, ribbonSchema } from '@supeffective/dataset-schemas'

const listSchema = z.array(ribbonSchema)

const validateSchema = () => {
  const errors: string[] = []
  const parsed: SafeParseReturnType<typeof recordList, Ribbon[]> = listSchema.safeParse(recordList)
  const errorMsg = parsed.success ? '' : String(parsed.error)
  if (!parsed.success) {
    errors.push(errorMsg)
  }

  return errors
}

const validateForeignKeys = () => {
  const errors: string[] = []

  return errors
}

const validate = () => {
  const errors: string[] = []

  errors.push(...validateSchema())
  errors.push(...validateForeignKeys())

  return errors
}

console.log('')
console.log('Validating ribbons...')

const errors = validate()

if (errors.length > 0) {
  console.log('')
  console.log('Errors:')
  errors.every((err, i) => {
    console.error(err)
    if (i === 20) {
      console.log('')
      console.log(`  ... and other ${errors.length - i} errors`)
    }

    return i < 20
  })
  console.log('')
  console.log(`❌ Validation failed with ${errors.length} errors`)
  console.log('')
  process.exit(1)
} else {
  console.log('')
  console.log('✅ Validation passed')
  console.log('')
}