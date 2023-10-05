import type { SLAddonPropsWithoutId, SLAppComponentProps } from '@storylite/storylite'

const config: Partial<SLAppComponentProps> = {
  title: ' ⚡️ Dex Tracker UI',
  defaultStory: 'home-default',
  // defaultStory: 'types-colored',
  useIframeStyles: false,

  // localStorageKey: 'storylite-state', // bugged
  themeAttribute: 'data-theme',
  children: null,

  iframeProps: {
    style: {
      // padding: '10px',
    },
  },
  addons: [
    [
      'my-custom-addon',
      {
        defaultContent: <span>👋</span>,
        stateful: false,
        onClick: (context) => {
          console.log(context)
          alert('You clicked the custom addon!')
        },
      } satisfies SLAddonPropsWithoutId<false>,
    ],
  ],
}

export default config
