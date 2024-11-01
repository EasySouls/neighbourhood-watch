import { config } from '@tamagui/config/v3';
import { createAnimations } from '@tamagui/animations-moti';
import { createTamagui, styled, YStack } from 'tamagui';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const animations = createAnimations({
  bouncy: {
    type: 'spring',
    damping: 10,
    mass: 0.9,
    stiffness: 100,
  },
  lazy: {
    type: 'spring',
    damping: 20,
    stiffness: 80,
  },
  quick: {
    type: 'spring',
    damping: 20,
    mass: 1.2,
    stiffness: 250,
  },
});

export const Container = styled(YStack, {
  flex: 1,
  padding: 24,
});

// Maybe create a custom Tamagui configuration later

// const tamaguiConfig = createTamagui({
//   ...config,
//   reactNative: true,
// });

const tamaguiConfig = createTamagui(config);

export type Conf = typeof tamaguiConfig;

declare module 'tamagui' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface TamaguiCustomConfig extends Conf {}
}

export default tamaguiConfig;
