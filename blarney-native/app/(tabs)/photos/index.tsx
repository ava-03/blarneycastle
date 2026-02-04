// app/(tabs)/photos/index.tsx
// https://reactnative.dev/docs/pressable
// https://reactnative.dev/docs/safeareaview
// https://reactnative.dev/docs/image#static-image-resources
// https://reactnative.dev/docs/platform#platformselect
// https://expo.github.io/router/docs
// https://reactnative.dev/docs/accessibility#accessibility-hints-and-label
// https://docs.expo.dev/router/introduction/

import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Pressable,
  StatusBar,
  Platform,
  Image,
  ScrollView,
  Linking,
  Alert,
} from "react-native";
import { colors } from "../../../constants/colors";
import SlideMenu from "../../../components/slidemenu";
import { router, type Href } from "expo-router";

// -- Cross platform serif choice - web includes CSS fallback list.
// -- Platform.select is the way to branch styles per platform
const serif = Platform.select({
  ios: "Times New Roman",
  android: "serif",
  web: "Times New Roman, serif",
});

// website link
const DIGITAL_PHOTO_URL = "https://www.snaphappysystems.com/blarney/digicopy-form.php";

export default function PhotosScreen() {
  // -- Local UI state - whether slide out menu is visible
  const [menuOpen, setMenuOpen] = useState(false);
  const HEADER_HEIGHT = 88;

  const openDigitalWebsite = async () => {
    try {
      const supported = await Linking.canOpenURL(DIGITAL_PHOTO_URL);
      if (!supported) {
        Alert.alert("Unable to open link", "Please try again later.");
        return;
      }
      await Linking.openURL(DIGITAL_PHOTO_URL);
    } catch {
      Alert.alert("Something went wrong", "Please try again.");
    }
  };

  return (
    // -- SafeAreaView ensures header isn't obscured by system UI
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.brand }}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={[s.header, { height: HEADER_HEIGHT }]}>
        <Pressable
          onPress={() => setMenuOpen(true)}
          style={s.headerSide}
          accessibilityLabel="Open menu"
          accessibilityHint="Opens the navigation menu"
        >
          <View style={s.burger}>
            <View style={s.line} />
            <View style={s.line} />
            <View style={s.line} />
          </View>
        </Pressable>

        <Text style={s.headerText}>PHOTOS</Text>

        <View style={s.headerSide}>
          <Image
            source={require("../../../assets/images/blarney-logo2.png")}
            style={s.logo}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Content */}
      <View style={s.body}>
        <ScrollView
          contentContainerStyle={s.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Images (add these to assets) */}
          <View style={s.imageBlock}>
            <Image
              source={require("../../../assets/images/topshop.jpeg")}
              style={s.photo}
              resizeMode="cover"
              accessibilityLabel="Top Shop exterior"
            />
          </View>

          {/* Info card */}
          <View style={s.card}>
            <Text style={s.cardTitle}>Collect your Blarney Stone photo</Text>

            <Text style={s.cardText}>
              If you took a photo while kissing the Blarney Stone, the photo kiosk is the ONLY place to view and
              purchase it. The kiosk is attached to the castle which is located at number 2 on the map.
            </Text>

            <View style={{ marginTop: 10 }}>
              <Text style={s.subTitle}>What to do:</Text>
              <Text style={s.bullet}>• After kissing the Blarney Stone, photography staff will give you a docket slip</Text>
              <Text style={s.bullet}>
                • Show the docket at the photo kiosk counter to view your photo
              </Text>
              <Text style={s.bullet}>
                • You can choose to buy a physical print by itself, or with a digital copy
              </Text>
              <Text style={s.bullet}>
                • If you purchase a digital print, you will receive a DigiCopy receipt with a code and pin. Click the tab below to enter your details and download your print
              </Text>
            </View>
          </View>

          {/* Button */}
          <Pressable
            style={s.button}
            onPress={openDigitalWebsite}
            accessibilityLabel="Open digital photo website"
            accessibilityHint="Opens the website to download your digital photo in your browser"
          >
            <Text style={s.buttonText}>OPEN DIGITAL PHOTO WEBSITE</Text>
          </Pressable>

          <Text style={s.smallNote}>
            Note: Digital downloads require the code and pin printed on your
            DigiCopy receipt you received at purchase.
          </Text>
        </ScrollView>
      </View>

      {/* Slide-out menu */}
      <SlideMenu
        visible={menuOpen}
        onClose={() => setMenuOpen(false)}
        onSelect={(label: string) => {
          const path: Record<string, Href> = {
            HOME: "/" as Href,
            NAVIGATION: "../navigation" as Href,
            INFO: "../info" as Href,
            NATURE: "../nature" as Href,
            "AUDIO TOUR": "../audio" as Href,
            PHOTOS: "../photos" as Href,
          };

          router.push(path[label] ?? ("/" as Href));
          setMenuOpen(false);
        }}
      />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  header: {
    backgroundColor: colors.brand,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 35,
  },
  headerSide: {
    width: 40,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    color: colors.textLight,
    fontSize: 28,
    fontWeight: "800",
    fontFamily: serif,
    flex: 1,
    textAlign: "center",
  },
  burger: { width: 34, height: 24, alignItems: "center", justifyContent: "space-between" },
  line: { width: 26, height: 3, backgroundColor: colors.textLight, borderRadius: 2 },
  logo: {
    width: Platform.select({ web: 62, default: 74 }),
    height: Platform.select({ web: 62, default: 74 }),
  },

  // Body area under header
  body: {
    flex: 1,
    backgroundColor: "#F6F2EA", // warm parchment-ish tone; change if you want
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 28,
    gap: 14,
  },

  imageBlock: {
    gap: 12,
  },
  photo: {
    width: "100%",
    height: 220,
    borderRadius: 18,
  },

  card: {
    backgroundColor: "white",
    borderRadius: 18,
    padding: 16,
  },
  cardTitle: {
    fontFamily: serif,
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 8,
    color: "#1A1A1A",
  },
  cardText: {
    fontSize: 15,
    lineHeight: 21,
    color: "#1A1A1A",
  },
  subTitle: {
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 8,
    color: "#1A1A1A",
  },
  bullet: {
    fontSize: 15,
    lineHeight: 21,
    color: "#1A1A1A",
    marginBottom: 4,
  },
  bold: {
    fontWeight: "900",
  },

  button: {
    backgroundColor: colors.brand,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: colors.textLight,
    fontSize: 16,
    fontWeight: "900",
    fontFamily: serif,
    letterSpacing: 0.5,
  },
  smallNote: {
    fontSize: 13,
    lineHeight: 18,
    opacity: 0.75,
    color: "#1A1A1A",
  },
});
