import { useState } from "react";
import { View, StyleSheet, Platform, Text, Pressable } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

interface LocationChipProps {
    label: string;
    active: boolean;
    onPress: () => void;
}

export default function LocationChip({ label, active, onPress }: LocationChipProps) {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [hovered, setHovered] = useState(false);
    const hours = 'Open until 6:00 PM';

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
      <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  chipActive: {
    backgroundColor: '#fff',
    borderColor: 'red',
  },
  chipHovered: {
    backgroundColor: 'light-gray',
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: 'gray',
  },
  chipTextActive: {
    color: 'red',
  },
});