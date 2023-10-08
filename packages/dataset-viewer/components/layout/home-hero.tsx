import { GithubIcon } from '../icons/github-icon'
import { Button } from '../ui/button'

export function HomeHero() {
  return (
    <div className="flex flex-col">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl sm:tracking-tight lg:text-6xl" data-testid="hero-title">
            <span className="block bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              SuperEffective
            </span>
            <span className="block text-3xl font-bold sm:text-4xl sm:tracking-tight lg:text-5xl">Dataset Viewer</span>
          </h1>
          <p className="mt-6 max-w-lg mx-auto text-xl sm:max-w-3xl">
            Preview the JSON dataset for the SuperEffective.gg project in a beautiful and interactive way.
          </p>
        </div>
      </div>
      <div className="flex flex-row gap-4 items-center justify-center">
        <Button size="xl" variant="default" asChild className="text-md">
          <a href="https://supereffective.gg?ref=dataset-viewer" target="_blank" rel="noreferrer">
            Website
          </a>
        </Button>
        <Button size="xl" variant="outline" asChild className="text-md">
          <a href="https://github.com/itsjavi/supereffective-sdk" target="_blank" rel="noreferrer">
            Source <GithubIcon className="ml-2 h-8 w-8" />
          </a>
        </Button>
      </div>
    </div>
  )
}
