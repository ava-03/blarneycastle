import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  StatusBar,
  Platform,
} from "react-native";
import { colors } from "../../../constants/colors";
import { router } from "expo-router";

// Same serif choice as the rest of the app
const serif = Platform.select({
  ios: "Times New Roman",
  android: "serif",
  web: "Times New Roman, serif",
});

const experiences = [
  {
    title: "Kiss the Blarney Stone",
    text:
      "Start your Cork adventures at Blarney Castle itself. Climb the historic tower, kiss the famous Stone of Eloquence and wander the gardens that surround it.",
    image: require("../../../assets/images/kiss_stone.jpg"),
  },
  {
    title: "Go whale watching in West Cork",
    text:
      "Head  the wild Atlantic coast where minke, fin and humpback whales are sometimes seen offshore. A boat trip from West Cork is an unforgettable way to experience Ireland’s marine life.",
    image: require("../../../assets/images/whales.jpg"),
  },
  {
    title: "Fill up at The English Market",
    text:
      "In the heart of Cork city, The English Market is a feast of local produce, artisan foods and lively atmosphere. Perfect for grabbing lunch or picking up treats to take home.",
    image: require("../../../assets/images/eng_market.jpg"),
  },
  {
    title: "Soak up seaside charm in Kinsale",
    text:
      "Colourful streets, harbourside walks and excellent restaurants make Kinsale a favourite day trip. Explore the town, then stroll out towards Charles Fort for sweeping sea views.",
    image: require("../../../assets/images/kinsale.jpg"),
  },
  {
    title: "Sip a measure (or two) at the Jameson Distillery",
    text:
      "Visit Midleton, home of the Jameson Distillery, to discover how Ireland’s best-known whiskey is crafted. Guided tours end with a tasting for those who wish to sample a dram.",
    image: require("../../../assets/images/jameson.jpg"),
  },
  {
    title: "Take a magical dip in Lough Hyne",
    text:
      "Lough Hyne, near Skibbereen, is a unique marine lake surrounded by woodland. On calm evenings the water can shimmer with bioluminescence – a truly magical swim or kayak.",
    image: require("../../../assets/images/lough_hyne.jpg"),
  },
  {
    title: "See history come to life at Cork City Gaol",
    text:
      "Once a prison, Cork City Gaol now tells the story of life behind its stone walls. Atmospheric cells and exhibits reveal what life was like for inmates in the 19th and early 20th centuries.",
    image: require("../../../assets/images/gaol.jpg"),
  },
  {
    title: "Ride the cable car to Dursey Island",
    text:
      "Travel by Ireland’s only cable car out to Dursey Island, at the tip of the Beara Peninsula. The crossing and the island walks offer dramatic Atlantic scenery in every direction.",
    image: require("../../../assets/images/dursey.jpg"),
  },
  {
    title: "Find sanctuary at Nano Nagle Place",
    text:
      "A peaceful oasis in Cork city, Nano Nagle Place combines gardens, heritage buildings and a museum that tells the story of education and social justice in the city.",
    image: require("../../../assets/images/nano_nagle.png"),
  },
  {
    title: "Marvel at Mizen Head",
    text:
      "At Ireland’s most south-westerly point, Mizen Head offers cliff-top views, a historic signal station and a dramatic bridge over the Atlantic swell below.",
    image: require("../../../assets/images/mizen_head.jpg"),
  },
];

export default function ExperiencesCorkScreen() {
  const HEADER_HEIGHT = Platform.select({ web: 120, default: 88 });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.brand }}>
      <StatusBar barStyle="light-content" />

      {/* Header – back button + title + logo */}
      <View style={[s.header, { height: HEADER_HEIGHT }]}>
        <Pressable
          style={s.headerSide}
          onPress={() => router.back()}
          accessibilityLabel="Go back to Information"
        >
          <Text style={s.backText}>‹</Text>
        </Pressable>

        <View style={s.titleContainer}>
          <Text style={s.headerTitle}>EXPERIENCES</Text>
          <Text style={s.headerSubtitle}>IN CORK</Text>
        </View>

        <View style={s.headerSide}>
          <Image
            source={require("../../../assets/images/blarney-logo2.png")}
            style={s.logo}
            resizeMode="contain"
          />
        </View>
      </View>

      <ScrollView style={s.body} contentContainerStyle={s.bodyInner}>
        {experiences.map((exp) => (
            <View key={exp.title} style={s.card}>
            <View style={s.cardContent}>
                <Text style={s.cardTitle}>{exp.title}</Text>

                <Image
                source={exp.image}
                style={s.cardImage}
                resizeMode="cover"
                />

                <Text style={s.cardText}>{exp.text}</Text>
            </View>
            </View>
        ))}
        </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  // header (matches home/info style)
  header: {
    backgroundColor: colors.brand,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  headerSide: {
    width: 66,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  backText: {
    color: colors.textLight,
    fontFamily: serif,
    fontSize: 28,
  },
  logo: {
    width: Platform.select({ web: 72, default: 70 }),
    height: Platform.select({ web: 72, default: 74 }),
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: colors.textLight,
    fontSize: Platform.select({ web: 24, default: 20 }),
    fontWeight: "800",
    textAlign: "center",
    fontFamily: serif,
    lineHeight: Platform.select({ web: 30, default: 26 }),
  },
  headerSubtitle: {
    color: colors.textLight,
    fontSize: Platform.select({ web: 24, default: 20 }),
    fontWeight: "800",
    textAlign: "center",
    fontFamily: serif,
    marginTop: Platform.select({ web: -2, default: -2 }),
    letterSpacing: 0.5,
  },

  body: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  bodyInner: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 36,
  },

  card: {
  backgroundColor: "#ffffff",
  borderRadius: 18,
  marginBottom: 18,
  overflow: "hidden",
  shadowColor: "#000",
  shadowOpacity: 0.12,
  shadowRadius: 8,
  shadowOffset: { width: 0, height: 4 },
  elevation: 3,
},
cardContent: {
  padding: 16,
},
cardTitle: {
  fontFamily: serif,
  fontSize: 18,
  fontWeight: "700",
  color: colors.brand,
  marginBottom: 10,
},
cardImage: {
  width: "100%",
  height: 180,
  borderRadius: 12,
  marginBottom: 10,
},
cardText: {
  fontFamily: serif,
  fontSize: 14,
  lineHeight: 20,
  color: "#123",
},
});
