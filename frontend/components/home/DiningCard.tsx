import { useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from "../../lib/theme";
import { DiningLocation } from "../../types/dining";
import { getOpenStatus } from "../../lib/openStatus";

interface DiningCardProps {
  diningLocation: DiningLocation;
  cardWidth: number;
}

export default function DiningCard({ diningLocation, cardWidth }: DiningCardProps) {
  const [hovered, setHovered] = useState<boolean>(false);
  const { name, buildingName, category } = diningLocation;
  const showLocation = category !== 'DINING_HALL'
  const { isOpen, openStatusLabel } = getOpenStatus(diningLocation);

  return (
    <Pressable
      style={{ width: cardWidth }}
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
    >
      <LinearGradient
        colors={['#5c0606', '#f01212']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.thumb, hovered && styles.thumbHovered]}
      >
        <View style={[styles.statusPill, !isOpen && styles.statusPillClosed]}>
          <View style={[styles.dot, !isOpen && styles.dotClosed]} />
          <Text style={[styles.statusPillText, { color: COLORS.inkSoft }]}>
            {openStatusLabel}
          </Text>
        </View>
      </LinearGradient>

      <Text style={styles.placeName}>{name}</Text>
      <Text style={styles.placeHours}>
        {showLocation ? `${buildingName}` : ''}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  thumb: {
    height: 150,
    borderRadius: 16,
    marginBottom: 10,
    padding: 12,
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 14,
    elevation: 4,
    transform: [{ translateY: 0 }],
  },
  thumbHovered: {
    transform: [{ translateY: -3 }],
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 8,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.92)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    gap: 5,
  },
  statusPillClosed: {
    backgroundColor: 'rgba(255,255,255,0.92)',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.open,
  },
  dotClosed: {
    backgroundColor: COLORS.closed,
  },
  statusPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.ink,
  },
  placeName: {
    fontSize: 15.5,
    fontWeight: '700',
    textAlign: 'center',
    color: COLORS.ink,
  },
  placeHours: {
    fontSize: 12.5,
    color: COLORS.inkSoft,
    textAlign: 'center',
    marginTop: 2,
  },
});