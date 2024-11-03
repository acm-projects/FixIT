import { createTamagui } from 'tamagui';
import { themes, tokens, shorthands, media } from '@tamagui/config';

const config = createTamagui({
  themes: {
    ...themes,
  },
  tokens: {
    ...tokens,
    size: {
      ...tokens.size,   // Ensure default Tamagui sizes are included
      xs: 4,
      sm: 8,
      md: 16,
      lg: 32,
      xl: 64,
    },
  },
  shorthands: {
    ...shorthands,
    bg: 'backgroundColor',
    txt: 'color',
  },
  media: {
    ...media,
    sm: { maxWidth: 600 },
    md: { maxWidth: 900 },
    lg: { maxWidth: 1200 },
  },
});

export default config;
