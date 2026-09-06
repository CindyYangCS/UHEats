import { ImageSourcePropType } from 'react-native';

const DINING_IMAGES: Record<string, ImageSourcePropType> = {
  'moody-towers': require('../assets/images/moody-towers.jpg'),
  'cougar-woods': require('../assets/images/cougar-woods.jpg'),
  'chick-fil-a': require('../assets/images/chick-fil-a.jpg'),
  'panda-express': require('../assets/images/panda-express.jpg'),
};

const FALLBACK_IMAGE: ImageSourcePropType = require('../assets/images/fallback.jpg');

// Usage: <Image source={getDiningImage(location.slug)} />
export function getDiningImage(slug: string): ImageSourcePropType {
  return DINING_IMAGES[slug] ?? FALLBACK_IMAGE;
}