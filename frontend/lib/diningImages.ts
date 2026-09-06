import { ImageSourcePropType } from 'react-native';

const DINING_IMAGES: Record<string, ImageSourcePropType> = {
  // 'moody-towers': require('../assets/moody-towers.jpg'),
  // 'cougar-woods': require('../assets/cougar-woods.jpg'),
};

const FALLBACK_IMAGE: ImageSourcePropType = require('../assets/icon.png');

// Usage: <Image source={getDiningImage(location.slug)} />
export function getDiningImage(slug: string): ImageSourcePropType {
  return DINING_IMAGES[slug] ?? FALLBACK_IMAGE;
}