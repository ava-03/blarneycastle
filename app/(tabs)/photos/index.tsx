// https://reactnative.dev/docs/pressable
// https://reactnative.dev/docs/safeareaview
// https://reactnative.dev/docs/image#static-image-resources
// https://reactnative.dev/docs/platform#platformselect
// https://expo.github.io/router/docs
// https://reactnative.dev/docs/accessibility#accessibility-hints-and-label
// https://docs.expo.dev/router/introduction/
// https://reactnavigation.org/docs/drawer-navigator/


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
import { Ionicons } from "@expo/vector-icons";

// -- Cross platform serif choice - web includes CSS fallback list.
const serif = Platform.select({
  ios: "Times New Roman",
  android: "serif",
  web: "Times New Roman, serif",
});

// website link
// Opens digital photo website in browser
// Checks if URL is supported before opening
// Shows alert if link fails

const DIGITAL_PHOTO_URL =
  "https://www.snaphappysystems.com/blarney/digicopy-form.php";

export default function PhotosScreen() {
  const [menuOpen, setMenuOpen] = useState(false);

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
    <SafeAreaView style={s.container}>
      <StatusBar barStyle="dark-content" />

      {/* Top white header */}
      <View style={s.topBar}>
        <Pressable
          accessibilityLabel="Open menu"
          accessibilityHint="Opens the navigation menu"
          onPress={() => setMenuOpen(true)}
          style={s.menuButton}
        >
          <Ionicons name="menu" size={36} color={colors.brand} />
        </Pressable>

        <View pointerEvents="none" style={s.logoWrap}>
          <Image
            source={require("../../../assets/images/logo-white.png")}
            style={s.officialLogo}
            resizeMode="contain"
            accessibilityLabel="Blarney Castle and Gardens logo"
          />
        </View>

        {/* right spacer to keep logo centered */}
        <View style={s.rightSpacer} />
      </View>

      {/* Content */}
      <View style={s.body}>
        <ScrollView
          contentContainerStyle={s.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Page title */}
          <Text style={s.pageTitle}>PHOTOS</Text>

          {/* Images */}
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
              If you took a photo while kissing the Blarney Stone, the photo kiosk
              is the ONLY place to view and purchase it. The kiosk is attached to
              the castle which is located at number 2 on the map.
            </Text>

            <View style={{ marginTop: 10 }}>
              <Text style={s.subTitle}>What to do:</Text>
              <Text style={s.bullet}>
                • After kissing the Blarney Stone, photography staff will give you a
                docket slip
              </Text>
              <Text style={s.bullet}>
                • Show the docket at the photo kiosk counter to view your photo
              </Text>
              <Text style={s.bullet}>
                • You can choose to buy a physical print by itself, or with a digital copy
              </Text>
              <Text style={s.bullet}>
                • If you purchase a digital print, you will receive a DigiCopy receipt
                with a code and pin. Click the tab below to enter your details and
                download your print
              </Text>
            </View>

            {/* Prices box */}
            <View style={s.priceBox}>
              <Text style={s.priceBoxTitle}>SOUVENIR PHOTO PRICES</Text>

              <View style={{ marginTop: 10 }}>
                <View style={s.priceRow}>
                  <Text style={s.priceLabel}>One Photo Print</Text>
                  <Text style={s.priceValue}>€10.00</Text>
                </View>

                <View style={s.priceRow}>
                  <Text style={s.priceLabel}>One Photo Print (& Digital Copy)</Text>
                  <Text style={s.priceValue}>€12.00</Text>
                </View>

                <View style={s.priceRow}>
                  <Text style={s.priceLabel}>Two Photo Prints</Text>
                  <Text style={s.priceValue}>€18.00</Text>
                </View>

                <View style={s.priceRow}>
                  <Text style={s.priceLabel}>
                    Two Photo Prints (& Two Digital Copies)
                  </Text>
                  <Text style={s.priceValue}>€22.00</Text>
                </View>
              </View>

              <Text style={s.priceBoxFooter}>
                Each printed photo comes with a commemorative certificate
              </Text>

              <Text style={s.priceBoxNote}>
                Please note: Digital copies of photographs are not sold separately.
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
            Note: Digital downloads require the code and pin printed on your DigiCopy
            receipt you received at purchase.
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
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  // ---- Header styles ----
  topBar: {
    backgroundColor: "white",
    height: 110,
    justifyContent: "center",
    position: "relative",
  },
  menuButton: {
    position: "absolute",
    left: 10,
    top: 20,
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    zIndex: 10,
  },
  officialLogo: {
    position: "absolute",
    alignSelf: "center",
    top: 3,
    height: 110,
    width: 410,
  },
  logoWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  rightSpacer: {
    width: 44,
    height: 44,
  },

  // Body 
  body: {
    flex: 1,
    backgroundColor: "white", 
  },

  scrollContent: {
    padding: 16,
    paddingBottom: 28,
    gap: 14,
  },

  // Page title 
  pageTitle: {
    fontFamily: serif,
    fontSize: 30,
    textAlign: "center",
    marginBottom: 10,
    marginTop: 10,
    color: colors.brand,
    letterSpacing: 1.5,
    fontWeight: "700",
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
    backgroundColor: "#E8F3EC",
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

  priceBox: {
    marginTop: 14,
    backgroundColor: "white",
    borderRadius: 14,
    padding: 14,
  },
  priceBoxTitle: {
    fontFamily: serif,
    color: "black",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 1,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    gap: 12,
  },
  priceLabel: {
    fontFamily: serif,
    fontSize: 14,
    color: "black",
    flex: 1,
  },
  priceValue: {
    fontFamily: serif,
    fontSize: 14,
    fontWeight: "700",
    color: "black",
  },
  priceBoxFooter: {
    marginTop: 12,
    fontFamily: serif,
    fontSize: 14,
    color: "black",
    fontStyle: "italic",
  },
  priceBoxNote: {
    marginTop: 6,
    fontFamily: serif,
    fontSize: 12,
    color: "black",
    opacity: 0.85,
  },
});

