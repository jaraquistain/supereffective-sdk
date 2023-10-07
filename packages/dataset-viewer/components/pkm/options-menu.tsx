import { PKM_LATEST_GENERATION } from '@supeffective/dataset'

export const OptionsMenu = ({ value }: { value: number }) => {
  const gens = Array(PKM_LATEST_GENERATION)
    .fill(0)
    .map((_, i) => i + 1)

  return (
    <div>
      {gens.map((gen) => {
        const isActive = gen === value
        const className = `px-2 py-1 rounded-md text-sm font-bold cursor-pointer ${
          isActive ? 'bg-primary-foreground text-primary-background' : 'bg-primary-background text-primary-foreground'
        }`
        return (
          <span key={gen} className={className}>
            {gen}
          </span>
        )
      })}
    </div>
  )
}
