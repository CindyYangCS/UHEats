import { useState } from "react";
import { View, StyleSheet, Text, Pressable, Image, ImageBackground } from "react-native";
import { COLORS } from "../../lib/theme";
import { DiningLocation } from "../../types/dining";
import { getOpenStatus } from "../../lib/openStatus";
import { getBrandGradient, getDiningImage } from "../../lib/diningImages";
import { LinearGradient } from "expo-linear-gradient";

interface DiningCardProps {
  diningLocation: DiningLocation;
  cardWidth: number;
}

interface CardBackgroundProps {
  diningLocation: DiningLocation;
  style: any;
  children: React.ReactNode;
}

function CardBackground({ diningLocation, style, children }: CardBackgroundProps) {
  const { slug, category } = diningLocation;

  if (category === 'DINING_HALL') {
    return (
      <ImageBackground
        source={getDiningImage(slug)}
        resizeMode="cover"
        imageStyle={{ borderRadius: 16 }}
        style={style}
      >
        {children}
      </ImageBackground>
    );
  }

  return (
    <View style={[style, styles.gradientClip]}>
      <LinearGradient
        colors={getBrandGradient(slug)}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[StyleSheet.absoluteFill, styles.gradientContent]}
      >
        {children}
        <View style={styles.logoWrap}>
          <Image source={getDiningImage(slug)} resizeMode="contain" style={styles.logo} />
        </View>
      </LinearGradient>
    </View>
  )
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
      <CardBackground
        diningLocation={diningLocation}
        style={[styles.thumb, hovered && styles.thumbHovered]}
      >
        <View style={[styles.statusPill, !isOpen && styles.statusPillClosed]}>
          <View style={[styles.dot, !isOpen && styles.dotClosed]} />
          <Text style={[styles.statusPillText, { color: COLORS.inkSoft }]}>{openStatusLabel}</Text>
        </View>
      </CardBackground>

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
    overflow: 'hidden',
    boxShadow: '0px 6px 14px rgba(0, 0, 0, 0.1)',
    transform: [{ translateY: 0 }],
  },
  thumbHovered: {
    transform: [{ translateY: -3 }],
    boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.18)',
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
  logoWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: 90,
    height: 90
  },
  gradientClip: {
    overflow: 'hidden',
    borderRadius: 16,
  },
  gradientContent: {
    padding: 12,
    justifyContent: 'flex-start',
},
});