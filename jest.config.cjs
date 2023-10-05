const coveragePathIgnorePatterns = [
  'types.ts',
  'index.ts',
  'index.tsx',
  '.d.ts',
  '/node_modules/',
  '/.ignore/',
  '/_ignore/',
]

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
module.exports = {
  coverageProvider: 'v8',
  collectCoverageFrom: ['**/src/**/*.{js,jsx,ts,tsx}'],
  projects: [
    {
      displayName: 'DOM',
      // 'types.ts', 'index.ts', 'index.tsx' are supposed to not have any logic, just type definitions and exports
      coveragePathIgnorePatterns,
      testEnvironment: `${__dirname}/packages/testing/jest.env-browser.js`,
      testMatch: ['**/*.test.ts', '**/*.test.tsx'],
      testPathIgnorePatterns: ['/node_modules/', '/.local/', '/.ignore/', '/_ignore/', '/dist/'],
      // setupFilesAfterEnv: ['./testing/jest.setup.js'],
      transform: {
        '^.+\\.(t|j)sx?$': [
          '@swc/jest',
          {
            jsc: {
              transform: {
                react: {
                  runtime: 'automatic',
                },
              },
            },
          },
        ],
      },
      transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$'],
    },
    {
      displayName: 'NodeJS',
      coveragePathIgnorePatterns,
      testEnvironment: 'node',
      testMatch: ['**/*.test.ts'],
      testPathIgnorePatterns: ['/node_modules/', '/.local/', '/.ignore/', '/_ignore/', '/dist/', '.dom.test.ts'],
      transform: {
        '^.+\\.(t|j)s$': ['@swc/jest'],
      },
      transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$'],
    },
  ],
}
