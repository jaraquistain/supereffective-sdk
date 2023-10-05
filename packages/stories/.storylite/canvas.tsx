// 1. StoryLite UI and iframe styles
import '@storylite/storylite/styles.css'
// 3. Dex Tracker UI styles
import '@supeffective/ui/styles.css'
// 2. Stories base/reset styles
import '../src/base-styles.css'

// import iframe-scope styles here

import { renderStoryLiteApp } from '@storylite/storylite'
import stories from '@storylite/vite-plugin:stories'

import config from './config'

console.log(stories)

const rootElement = document.getElementById('root') as HTMLElement

renderStoryLiteApp(rootElement, stories, config)
