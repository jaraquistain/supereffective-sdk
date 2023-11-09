# supereffective-sdk

Pokémon main series data source, TS types, zod validators and HTTP client for supereffective.gg

## Development Environment

- PNPM: Package manager
- Turbo: Monorepo manager
- Biome: JS/TS linter and formatter
- tsup: Lib bundler
- Bun: Test and dev-server/script/task runner

### Dataset Viewer

It is a read-only viewer for the dataset, built with:

- Next.js: SSR framework (with App router, Server Components & Server Actions)
- Tailwind: CSS framework
- shacn UI: UI components

The dataset viewer is also hosted on Vercel:
[supereffective-dataset-viewer.vercel.app](https://supereffective-dataset-viewer.vercel.app/) and redeployed
automatically on each commit to `main`.

### Quick Start

To work locally, we will need this repository as well as the one containing all the images.

Running the following, will clone the required repos, install dependencies and start the dev servers:

```sh
git clone https://github.com/itsjavi/supereffective-sdk.git && \
git clone https://github.com/itsjavi/supereffective-assets.git && \
cd supereffective-sdk && \
cp ./packages/dataset/.env.example ./packages/dataset/.env && \
cp ./packages/dataset-viewer/.env.example ./packages/dataset-viewer/.env && \
pnpm install

# If you need so, you can edit the `.env` files and then run the following to start the servers and watchers:
pnpm dev
```

By default the servers are available at:

- [localhost:3009](http://localhost:3009): Dataset viewer (Next.js app)
- [localhost:4455](http://localhost:4455): Dev server for static files (serves dataset and images)

After running `pnpm dev` each time the JSON files from `/packages/dataset/data` are modified, they will be automatically
rebuilt under `/packages/dataset/dist`. The same will happen with any JS or TS code.

The files ignored in `packages/dataset/.gitignore`, should not be modified manually, as they are generated by the
scripts. The same applies to the files in `packages/dataset/dist`.
