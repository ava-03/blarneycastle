import React, { useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, Pressable, StatusBar, Platform } from "react-native";
import { colors } from "../../../constants/colors";
import SlideMenu from "../../../components/slidemenu";
import { router, type Href } from "expo-router";

const serif = Platform.select({
  ios: "Times New Roman",
  android: "serif",
  web: "Times New Roman, serif",
});

export default function NavigationScreen() {
  const [menuOpen, setMenuOpen] = useState(false);
  const HEADER_HEIGHT = 88;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.brand }}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={[s.header, { height: HEADER_HEIGHT }]}>
        <View style={{ width: 40, height: 30 }} />
        <Text style={s.headerText}>NAVIGATION</Text>
        <Pressable onPress={() => setMenuOpen(true)} style={s.burger}>
          <View style={s.line} />
          <View style={s.line} />
          <View style={s.line} />
        </Pressable>
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
    paddingHorizontal: 20,
  },
  headerText: { color: colors.textLight, fontSize: 28, fontWeight: "800", fontFamily: serif, },
  burger: { width: 40, height: 30, alignItems: "center", justifyContent: "space-around" },
  line: { width: 26, height: 3, backgroundColor: colors.textLight, borderRadius: 2 },
});
