import Link from 'next/link'
import { GithubIcon } from '../icons/github-icon'
import { Button } from '../ui/button'

export function HomeHero() {
  return (
    <div className="flex flex-col gap-8 ">
      <div className="flex flex-col gap-8 text-center max-w-7xl mx-auto pt-12 px-4 sm:pt-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold sm:text-5xl sm:tracking-tight lg:text-6xl" data-testid="hero-title">
          <span className="block bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
            SuperEffective
          </span>
          <span className="block text-3xl font-bold sm:text-4xl sm:tracking-tight lg:text-5xl">Dataset Viewer</span>
        </h1>
        <p className="max-w-lg mx-auto text-xl sm:max-w-3xl">
          Preview the Pokémon JSON dataset for the{' '}
          <a className="underline" href="https://supereffective.gg?ref=dataset-viewer" target="_blank" rel="noreferrer">
            SuperEffective.gg
          </a>{' '}
          project in a beautiful and interactive way, and easily contribute to it.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-16">
        <Button size="xl" variant="outline" asChild className="text-md">
          <a href="https://github.com/itsjavi/supereffective-sdk" target="_blank" rel="noreferrer">
            Source Code <GithubIcon className="ml-2 h-8 w-8" />
          </a>
        </Button>
        <Button size="xl" variant="default" asChild className="text-md">
          <Link href="/pokemon">View Pokémon</Link>
        </Button>
      </div>
      <div className="flex flex-row gap-4 items-center justify-center text-center">
        <p className="text-muted-foreground text-sm flex flex-col gap-3">
          <span>
            Built with <span className="text-pink-400">♥</span> by{' '}
            <a className="underline" href="https://twitter.com/itsjavidotcom" target="_blank" rel="noreferrer">
              @itsjavi
            </a>
          </span>
        </p>
      </div>
    </div>
  )
}
