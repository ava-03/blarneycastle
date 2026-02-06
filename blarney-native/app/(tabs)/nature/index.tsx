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
  StyleSheet,
  Pressable,
  StatusBar,
  Platform,
  Image,
} from "react-native";
import { colors } from "../../../constants/colors";
import SlideMenu from "../../../components/slidemenu";
import { router, type Href } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// — Platform-specific serif fallback 
const serif = Platform.select({
  ios: "Times New Roman",
  android: "serif",
  web: "Times New Roman, serif",
});

export default function AudioScreen() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <SafeAreaView style={s.container}>
      {/* White top area */}
      <StatusBar barStyle="dark-content" />

      {/* Top white header  */}
      <View style={s.topBar}>
        <Pressable
          accessibilityLabel="Open menu"
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

      {/* page content  */}
      <View style={s.body} />

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

  body: {
    flex: 1,
    backgroundColor: "white",
  },

  // ---- Header styles  ----
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

  logoWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },

  officialLogo: {
    position: "absolute",
    alignSelf: "center",
    top: 3,
    height: 110,
    width: 410,
  },

  rightSpacer: {
    width: 44,
    height: 44,
  },
});
