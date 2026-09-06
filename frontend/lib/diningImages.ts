import { ImageSourcePropType } from 'react-native';

const DINING_IMAGES: Record<string, ImageSourcePropType> = {
  'moody-towers': require('../assets/moody-towers.jpg'),
  'cougar-woods': require('../assets/cougar-woods.jpg'),
  'chick-fil-a': require('../assets/chick-fil-a.png'),
  'burger-joint': require('../assets/burger-joint.jpg'),
  'panda-express': require('../assets/panda-express.jpg'),
  'mcalisters-deli': require('../assets/mcalisters-deli.png')
};

export const BRAND_GRADIENTS: Record<string, [string, string]> = {
  'chick-fil-a': ['#8a021d', '#DD0031'],
  'burger-joint': ['#dd1111', '#d6c0b0'],
  'panda-express': ['#f01010', '#fcfcfc'],
  'mcalisters-deli': ['#115a27', '#b14c05'],
}

const FALLBACK_GRADIENT: [string, string] = ['#ca7e8d', '#942f45'];
const FALLBACK_IMAGE: ImageSourcePropType = require('../assets/icon.png');

export function getDiningImage(slug: string): ImageSourcePropType {
  return DINING_IMAGES[slug] ?? FALLBACK_IMAGE;
}

export function getBrandGradient(slug: string): [string, string] {
  return BRAND_GRADIENTS[slug] ?? FALLBACK_GRADIENT;
}