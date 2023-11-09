import { pokemonTypes } from '@supeffective/dataset'
import { TypeIcon, TypeIconCvaParams } from '@supeffective/icons'

export default function Page() {
  const variants: Record<keyof TypeIconCvaParams, Array<TypeIconCvaParams[keyof TypeIconCvaParams]>> = {
    typeId: pokemonTypes.map((t) => t.id),
    // size: ['xs', 'sm', 'md', 'lg', 'xl'],
    size: ['xl'],
    terastal: [true, false],
    colored: [true, false],
    filled: [true, false],
    rounded: [true, false],
    theme: ['light', 'dark'],
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
    <div className="flex-1 flex flex-col w-full text-left gap-4">
      <h1 className="text-4xl font-extrabold tracking-tighter">Types</h1>
      <h2 className="text-2xl font-bold tracking-tighter">Icon components</h2>
      <p>Here are all combinations (hover to see the props values):</p>
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-4">
        {allVariantCombinations.map((props, i) => (
          <span
            title={JSON.stringify(props, null, 2)}
            key={`tv-${i}-${props.typeId}`}
            className="inline-flex flex-col gap-1 items-center justify-center text-center p-1 py-2 border"
          >
            <TypeIcon {...props} title={JSON.stringify(props, null, 2)} />
            <span className="capitalize text-xs text-muted-foreground">
              {props.terastal && 'Tera '}
              {props.typeId}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
