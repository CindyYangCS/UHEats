import { useWindowDimensions } from 'react-native';

const GRID_GAP = 16;
const MIN_CARD_WIDTH = 260;
const SECTION_MAX_WIDTH = 1080;
const SECTION_PADDING_X = 20;

// determine width of Dining Card in relation to the user's screen size and number of columns
export function useGridCardWidth(itemCount: number): number {
  const { width } = useWindowDimensions();
  const isWide = width >= 900;
  const containerWidth = Math.min(width, SECTION_MAX_WIDTH) - SECTION_PADDING_X * 2;

  if (!isWide || itemCount === 0) return containerWidth;

  const maxColumns = Math.max(
    1,
    Math.floor((containerWidth + GRID_GAP) / (MIN_CARD_WIDTH + GRID_GAP))
  );
  const numColumns = Math.min(maxColumns, itemCount);
  return (containerWidth - GRID_GAP * (numColumns - 1)) / numColumns;
}