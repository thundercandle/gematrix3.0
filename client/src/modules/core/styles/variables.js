import chroma from 'chroma-js'

export const breakpoints = {
  mobile: 480,
  largeMobile: 740,
  tablet: 839,
  desktop: 1024
}

// Spacing
export const desktopPadding = 75
export const mobilePadding = 30

// Colors
export const PRIMARY_COLOR = "#5304b0"
export const PRIMARY_DARK = chroma(PRIMARY_COLOR).darken().hex()
export const SECONDARY_COLOR = "#1f33b9"
export const BRAND_COLOR = "#7e3bfb"
