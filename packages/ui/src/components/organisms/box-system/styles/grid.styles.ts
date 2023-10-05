import { css } from '@/css'

export default {
  multiBoxGrid: css({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
    gap: '1.5rem',
    width: 'full',
    WebkitTouchCallout: 'none !important',
    // touchAction: 'none',
    '&[data-view-mode="unified"]': {
      display: 'flex',
      flex: 1,
      gap: '0rem',
      gridTemplateColumns: 'none',
    },
  }),
}
