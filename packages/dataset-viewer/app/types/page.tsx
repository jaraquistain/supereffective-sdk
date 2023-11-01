import { pokemonTypes } from '@supeffective/dataset'
import { TypeIcon, TypeIconCvaParams } from '@supeffective/icons'

export default function Page() {
  const variants: Record<keyof TypeIconCvaParams, Array<TypeIconCvaParams[keyof TypeIconCvaParams]>> = {
    colored: [true, false],
    filled: [true, false],
    rounded: [true, false],
    size: ['xs', 'sm', 'md', 'lg', 'xl'],
    terastal: [true, false],
    typeId: pokemonTypes.map((t) => t.id),
  }

  const allVariantCombinations: TypeIconCvaParams[] = Object.entries(variants).reduce(
    (acc, [variantKey, variantValues]) => {
      const variantCombinations = variantValues.map((variantValue) => ({
        [variantKey]: variantValue,
      }))

      return acc.flatMap((accVariant) =>
        variantCombinations.map((variantCombination) => ({
          ...accVariant,
          ...variantCombination,
        })),
      )
    },
    [{} as TypeIconCvaParams],
  )

  return (
    <div className="flex-1 w-full text-left">
      <h1>Types</h1>
      All combinations:
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-4">
        {allVariantCombinations.map((props, i) => (
          <span
            title={JSON.stringify(props, null, 2)}
            key={`tv-${i}-${props.typeId}`}
            className="inline-flex flex-col gap-1 items-center justify-center text-center p-1 py-2 border"
          >
            <TypeIcon {...props} title={JSON.stringify(props, null, 2)} />
            <span className="capitalize text-xs">
              {props.terastal && 'Tera '}
              {props.typeId}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
