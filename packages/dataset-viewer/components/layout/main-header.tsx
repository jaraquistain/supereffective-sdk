import Link from 'next/link'
import { ThemeToggle } from '../theme-toggle'

export function Header() {
  return (
    <div className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/89 backdrop-blur-md">
      <div className="container flex py-6 sm:py-2 items-center">
        <div className="flex flex-wrap gap-4 flex-col sm:flex-row">
          <Link href="/" className="mr-4 flex items-center font-extrabold tracking-tighter">
            DATASET VIEWER
          </Link>
          <nav className="flex flex-col sm:flex-row sm:items-center gap-4 flex-wrap text-sm font-medium">
            <Link href="/pokemon">Pokemon</Link>
            <Link href="/games">Games</Link>
            <Link href="/pokedexes">Pokedexes</Link>
            <Link href="/boxpresets">Box Presets</Link>
            <Link href="/boxpresets">Other</Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center space-x-2 justify-end">
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}
