import * as React from 'react'
import type { SVGProps } from 'react'

const SvgIceType = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fillRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit={2}
    clipRule="evenodd"
    viewBox="0 0 77 77"
    {...props}
  >
    <g fillRule="nonzero">
      <path d="m31.398 11.737 6.951-6.951 6.95 6.95-6.95 6.951zM11.49 48.24h9.83v9.83h-9.83zM31.397 64.966l6.951-6.95 6.951 6.95-6.95 6.951zM55.38 18.75v9.77l-17.03-9.83-17.03 9.83v-9.77h-9.83v9.83h9.83v19.6l17.03 9.83 17.03-9.83v-19.6h9.83v-9.83zM31.14 34.32v9.62h-5.11v-12.6h.05l10.86-6.27 2.55 4.42-8.36 4.83zm24.24 13.92h9.83v9.83h-9.83z" />
    </g>
  </svg>
)
export default SvgIceType