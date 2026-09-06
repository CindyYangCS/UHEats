import { useState } from "react";
import { View, StyleSheet, Platform, Text, Pressable } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

interface PlaceCardProps {
    name: string;
    // hours: DiningHours[];
    cardWidth: number;
    showLocation?: boolean;
}

export default function PlaceCard({ name, cardWidth, showLocation }: PlaceCardProps) {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [hovered, setHovered] = useState(false);
    const hours = 'Open until 6:00 PM';

    // return (
    //     <View style={styles.placeCard}>
    //         <View style={styles.thumb} />
    //         <Text style={styles.name}>{name}</Text> 
    //         <Text style={styles.hours}>{hours}</Text>
    //     </View>
    // )
    return (
        <Pressable
        style={[styles.placeCard, { width: cardWidth }]}
        onHoverIn={() => setHovered(true)}
        onHoverOut={() => setHovered(false)}
        >
        <LinearGradient
            colors={['#4a3728', '#2b1e15']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.thumb, hovered && styles.thumbHovered]}
        >
            <View style={[styles.statusPill, true && styles.statusPillClosed]}>
            <View style={[styles.dot, true && styles.dotClosed]} />
            <Text style={[styles.statusPillText, true && { color: 'gray' }]}>
                {true ? 'Open · 6am–6pm' : 'Closed'}
            </Text>
            </View>
        </LinearGradient>
        <Text style={styles.placeName}>{'Moody Towers'}</Text>
        <Text style={styles.placeHours}>
            {'Open until 6:00 PM'}
            {showLocation && true ? ` · ${'SC South'}` : ''}
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
    backgroundColor: 'green',
  },
  dotClosed: {
    backgroundColor: 'red',
  },
  statusPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: 'black',
  },
  placeCard: {
    // width is set inline per-card via cardWidth
  },
  placeName: {
    fontSize: 15.5,
    fontWeight: '700',
    textAlign: 'center',
    color: 'black',
  },
  placeHours: {
    fontSize: 12.5,
    color: 'gray',
    textAlign: 'center',
    marginTop: 2,
  },
});