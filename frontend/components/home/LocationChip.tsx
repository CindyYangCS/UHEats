import { useState } from "react";
import { StyleSheet, Text, Pressable } from "react-native";
import { COLORS } from "../../lib/theme";

interface LocationChipProps {
    buildingName: string;
    active: boolean;
    onPress: () => void;
}

export default function LocationChip({ buildingName, active, onPress }: LocationChipProps) {
    const [hovered, setHovered] = useState<boolean>(false);

 return (
    <Pressable
      onPress={onPress}
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      style={[
        styles.chip,
        active && styles.chipActive,
        !active && hovered && styles.chipHovered,
      ]}
    >
      <Text style={[styles.chipText, active && styles.chipTextActive]}>{buildingName}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: COLORS.chipBg,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  chipActive: {
    backgroundColor: '#fff',
    borderColor: COLORS.red,
  },
  chipHovered: {
    backgroundColor: COLORS.chipBgHover,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.inkSoft,
  },
  chipTextActive: {
    color: COLORS.red,
  },
});