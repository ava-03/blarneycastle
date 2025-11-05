// app/(tabs)/photos/index.tsx
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Pressable,
  StatusBar,
} from "react-native";
import { colors } from "../../../constants/colors";
import SlideMenu from "../../../components/slidemenu";
import { router, type Href } from "expo-router";

export default function PhotosScreen() {
  const [menuOpen, setMenuOpen] = useState(false);
  const HEADER_HEIGHT = 88;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.brand }}>
      <StatusBar barStyle="light-content" />

      {/* Header: title + hamburger */}
      <View style={[s.header, { height: HEADER_HEIGHT }]}>
        <View style={{ width: 40, height: 30 }} />
        <Text style={s.headerText}>PHOTOS</Text>
        <Pressable
          accessibilityLabel="Open menu"
          onPress={() => setMenuOpen(true)}
          style={s.burger}
        >
          <View style={s.line} />
          <View style={s.line} />
          <View style={s.line} />
        </Pressable>
      </View>

      {/* TODO: page content goes here */}

      {/* Slide-out menu */}
      <SlideMenu
        visible={menuOpen}
        onClose={() => setMenuOpen(false)}
        onSelect={(label: string) => {
          const path: Record<string, Href> = {
            HOME: "/",
            NAVIGATION: "../navigation",
            INFO: "../info",
            NATURE: "../nature",
            "AUDIO TOUR": "../audio",
            PHOTOS: "../photos",
          };
          const dest: Href = path[label] ?? "/";
          router.push(dest);
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
  headerText: { color: colors.textLight, fontSize: 28, fontWeight: "800" },
  burger: {
    width: 40,
    height: 30,
    alignItems: "center",
    justifyContent: "space-around",
  },
  line: { width: 26, height: 3, backgroundColor: colors.textLight, borderRadius: 2 },
});
