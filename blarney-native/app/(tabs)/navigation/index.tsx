// https://reactnative.dev/docs/pressable
// https://reactnative.dev/docs/image#static-image-resources
// https://reactnative.dev/docs/platform#platformselect
// https://expo.github.io/router/docs
// https://reactnative.dev/docs/accessibility#accessibility-hints-and-label
// https://docs.expo.dev/router/introduction/

import React, { useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet, Pressable, StatusBar, Platform, Image } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../../constants/colors";
import SlideMenu from "../../../components/slidemenu";
import { router, type Href } from "expo-router";
import * as Location from "expo-location";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

// -- Cross platform serif choice - web includes CSS fallback list.
const serif = Platform.select({
  ios: "Times New Roman",
  android: "serif",
  web: "Times New Roman, serif",
});

type LatLng = { lat: number; lng: number };
type Px = { x: number; y: number };

function latLngToPixel({ lat, lng }: LatLng): Px {
  const x = 11871.506 * lat + 228327.322 * lng + 1343629.618;
  const y = -336097.945 * lat - 17265.565 * lng + 17306950.4;
  return { x, y };
}

export default function NavigationScreen() {
  const [menuOpen, setMenuOpen] = useState(false);

  const insets = useSafeAreaInsets();

  // Your designed header height (without safe-area)
  const HEADER_HEIGHT = 88;
  const HEADER_TOTAL_HEIGHT = HEADER_HEIGHT + insets.top;

  return (
    <SafeAreaView style={s.screen} edges={["top", "left", "right"]}>
      <StatusBar barStyle="light-content" />

      {/* Content area (map) - pushed down so header never blocks/gets blocked */}
      <View style={[s.content, { paddingTop: HEADER_TOTAL_HEIGHT }]}>
        <NavigationMap />
      </View>

      {/* Slide-out menu MUST be after map so it overlays it */}
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

      {/* Header overlay (always clickable) */}
      <View style={[s.headerOverlay, { height: HEADER_TOTAL_HEIGHT, paddingTop: insets.top }]}>
        <Pressable
          onPress={() => setMenuOpen(true)}
          style={s.headerSide}
          accessibilityLabel="Open menu"
          hitSlop={16}
        >
          <View style={s.burger}>
            <View style={s.line} />
            <View style={s.line} />
            <View style={s.line} />
          </View>
        </Pressable>

        <Text style={s.headerText}>NAVIGATION</Text>

        <View style={s.headerSide}>
          <Image
            source={require("../../../assets/images/blarney-logo2.png")}
            style={s.logo}
            resizeMode="contain"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

function NavigationMap() {
  const mapSource = require("../../../assets/images/bc-map.jpg");

  // Exact image size
  const imgW = 5140;
  const imgH = 5054;

  const [viewport, setViewport] = useState({ w: 0, h: 0 });
  const [userLatLng, setUserLatLng] = useState<LatLng | null>(null);

  // Extra zoom on top of the base "fit" scale
  const zoom = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const startZoom = useSharedValue(1);
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);

  const base = useMemo(() => {
    if (!viewport.w || !viewport.h) {
      return { baseScale: 1, renderW: imgW, renderH: imgH, centerX: 0, centerY: 0 };
    }

    const baseScale = Math.min(viewport.w / imgW, viewport.h / imgH);
    const renderW = imgW * baseScale;
    const renderH = imgH * baseScale;

    return {
      baseScale,
      renderW,
      renderH,
      centerX: (viewport.w - renderW) / 2,
      centerY: (viewport.h - renderH) / 2,
    };
  }, [viewport.w, viewport.h]);

  useEffect(() => {
    if (!viewport.w || !viewport.h) return;

    zoom.value = 1;
    translateX.value = base.centerX;
    translateY.value = base.centerY;
  }, [viewport.w, viewport.h, base.centerX, base.centerY, zoom, translateX, translateY]);

  const pan = Gesture.Pan()
    .onBegin(() => {
      startX.value = translateX.value;
      startY.value = translateY.value;
    })
    .onUpdate((e) => {
      translateX.value = startX.value + e.translationX;
      translateY.value = startY.value + e.translationY;
    });

  const pinch = Gesture.Pinch()
    .onBegin(() => {
      startZoom.value = zoom.value;
    })
    .onUpdate((e) => {
      const next = startZoom.value * e.scale;
      zoom.value = Math.max(0.8, Math.min(next, 6));
    });

  const composed = Gesture.Simultaneous(pan, pinch);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: zoom.value },
    ],
  }));

  useEffect(() => {
    let sub: Location.LocationSubscription | null = null;

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      sub = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Highest,
          distanceInterval: 2,
          timeInterval: 1500,
        },
        (pos) => {
          setUserLatLng({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        }
      );
    })();

    return () => {
      sub?.remove();
      sub = null;
    };
  }, []);

  const userPx = userLatLng ? latLngToPixel(userLatLng) : null;

// If you're not on-site, the math will put you off the image.
// This is a clean way to detect that.
const isOffsite =
  !!userPx && (userPx.x < 0 || userPx.y < 0 || userPx.x > imgW || userPx.y > imgH);

const userOnMap = !isOffsite && userPx
  ? { x: userPx.x * base.baseScale, y: userPx.y * base.baseScale }
  : null;

  const [followMe, setFollowMe] = useState(true);
const lastCenterRef = React.useRef(0);

function clampTranslate(tx: number, ty: number, z: number) {
  const contentW = base.renderW * z;
  const contentH = base.renderH * z;

  const clampedX =
    contentW <= viewport.w
      ? (viewport.w - contentW) / 2
      : Math.max(viewport.w - contentW, Math.min(0, tx));

  const clampedY =
    contentH <= viewport.h
      ? (viewport.h - contentH) / 2
      : Math.max(viewport.h - contentH, Math.min(0, ty));

  return { x: clampedX, y: clampedY };
}

function centerOn(point: { x: number; y: number }, targetZoom = 1.8) {
  if (!viewport.w || !viewport.h) return;

  const tx = viewport.w / 2 - point.x * targetZoom;
  const ty = viewport.h / 2 - point.y * targetZoom;

  const clamped = clampTranslate(tx, ty, targetZoom);

  zoom.value = withTiming(targetZoom, { duration: 250 });
  translateX.value = withTiming(clamped.x, { duration: 250 });
  translateY.value = withTiming(clamped.y, { duration: 250 });
}

// Follow-me behaviour (recenters every ~1.2s while walking)
useEffect(() => {
  if (!followMe) return;
  if (!userOnMap) return;
  if (!viewport.w || !viewport.h) return;

  const now = Date.now();
  if (now - lastCenterRef.current < 1200) return;

  lastCenterRef.current = now;
  centerOn(userOnMap, 1.8);
}, [followMe, userOnMap, viewport.w, viewport.h]);


  return (
  <View
    style={s.mapCanvas}
    onLayout={(e) =>
      setViewport({
        w: e.nativeEvent.layout.width,
        h: e.nativeEvent.layout.height,
      })
    }
  >
    <GestureDetector gesture={composed}>
      <View style={{ flex: 1 }}>
        <Animated.View
          style={[
            s.mapContent,
            { width: base.renderW, height: base.renderH },
            animatedStyle,
          ]}
        >
          <Image
            source={mapSource}
            style={{ width: "100%", height: "100%" }}
            resizeMode="contain"
          />

          {userOnMap && (
            <View style={[s.userDot, { left: userOnMap.x - 7, top: userOnMap.y - 7 }]} />
          )}
        </Animated.View>
      </View>
    </GestureDetector>

    {/* Floating buttons */}
    <Pressable
      style={[s.centerButton, !userOnMap && { opacity: 0.35 }]}
      onPress={() => userOnMap && centerOn(userOnMap, 1.8)}
      accessibilityLabel="Recenter map on my location"
      hitSlop={12}
    >
      <Text style={s.centerIcon}>◎</Text>
    </Pressable>
  </View>
);
}

const s = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.brand,
  },

  // Content area under the header
  content: {
    flex: 1,
    backgroundColor: colors.brand,
  },

  // Header overlay (always on top)
  headerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,

    backgroundColor: colors.brand,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 35,

    zIndex: 999999,
    elevation: 999999,
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

  burger: {
    width: 34,
    height: 24,
    alignItems: "center",
    justifyContent: "space-between",
  },

  line: {
    width: 26,
    height: 3,
    backgroundColor: colors.textLight,
    borderRadius: 2,
  },

  logo: {
    width: Platform.select({ web: 62, default: 74 }),
    height: Platform.select({ web: 62, default: 74 }),
  },

  // MAP
  mapCanvas: {
    flex: 1,
    backgroundColor: colors.brand,
    position: "relative",
    overflow: "hidden",
  },

  mapContent: {
    position: "absolute",
    left: 0,
    top: 0,

    pointerEvents: "box-only",
  },

  // USER DOT
  userDot: {
    position: "absolute",
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#2ea8ff",
    borderWidth: 2,
    borderColor: "#fff",
  },
  // Recenter button
centerButton: {
  position: "absolute",
  bottom: 24,
  right: 20,
  width: 56,
  height: 56,
  borderRadius: 28,
  backgroundColor: "#EA9627",
  alignItems: "center",
  justifyContent: "center",


  pointerEvents: "auto",

  zIndex: 9999,
  elevation: 9999,
},

centerIcon: {
  color: "#fff",
  fontSize: 24,
  fontWeight: "700",
},
});
