import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Pressable,
  StatusBar,
  Platform,
  Image
} from "react-native";
import { colors } from "../../../constants/colors";
import SlideMenu from "../../../components/slidemenu";
import { router, type Href } from "expo-router";

const serif = Platform.select({
  ios: "Times New Roman",
  android: "serif",
  web: "Times New Roman, serif",
});

export default function InfoScreen() {
  const [menuOpen, setMenuOpen] = useState(false);
  const HEADER_HEIGHT = 88;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.brand }}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={[s.header, { height: HEADER_HEIGHT }]}>
        <Pressable 
          onPress={() => setMenuOpen(true)} 
          style={s.headerSide}
          accessibilityLabel="Open menu"
        >
          <View style={s.burger}>
            <View style={s.line} />
            <View style={s.line} />
            <View style={s.line} />
          </View>
        </Pressable>

        <Text style={s.headerText}>INFORMATION</Text>

        <View style={s.headerSide}>
          <Image
            source={require("../../../assets/images/blarney-logo2.png")}
            style={s.logo}
            resizeMode="contain"
          />
        </View>
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
    paddingHorizontal: 30,
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
});