// https://reactnative.dev/docs/pressable
// https://reactnative.dev/docs/safeareaview
// https://reactnative.dev/docs/image#static-image-resources
// https://reactnative.dev/docs/platform#platformselect
// https://expo.github.io/router/docs
// https://reactnative.dev/docs/accessibility#accessibility-hints-and-label
// https://docs.expo.dev/router/introduction/
// https://reactnavigation.org/docs/drawer-navigator/
// Irish Media Agency (Blarney Castle web team)


import React, { useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet, Pressable, StatusBar, Platform, Image } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../../constants/colors";
import SlideMenu from "../../../components/slidemenu";
import { router, type Href } from "expo-router";
import * as Location from "expo-location";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Svg, { Polyline } from "react-native-svg";


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

/**
 * FASTEST ROUTE (Entrance to Castle) - DONE BY IMAGE PIXELS
 */
const FASTEST_ROUTE_PX: Px[] = [
  { x: 3676, y: 851 },  // Entrance
  { x: 3351, y: 1068 }, // Bridge lower half 1
  { x: 3368, y: 1093 }, // Bridge lower half middle
  { x: 3379, y: 1127 }, // Bridge lower half 2
  { x: 3290, y: 1221 }, // Cherry walk 1
  { x: 3239, y: 1347 }, // Along cherry walk
  { x: 3173, y: 1539 }, // Castle bridge
  { x: 3173, y: 1605 }, // Castle bridge 2
  { x: 3308, y: 1630 }, // Castle path 3
  { x: 3317, y: 1667 }, // Castle path 4
  { x: 3340, y: 1709 }, // Castle path 5
  { x: 3360, y: 1743 }, // Castle path 6
  { x: 3328, y: 1756 }, // Castle path 7
  { x: 3237, y: 1743 }, // Castle path 8
  { x: 3237, y: 1720 }, // Castle entrance
];

const ACCESSIBLE_ROUTE_PX: Px[] = [
  { x: 3676, y: 851 },  // Entrance
  { x: 3351, y: 1068 }, // Bridge lower half 1
  { x: 3368, y: 1093 }, // Bridge lower half middle
  { x: 3379, y: 1127 }, // Bridge lower half 2
  { x: 3364, y: 1140 }, // Path corner
  { x: 3549, y: 1240 }, // Path 1
  { x: 3777, y: 1389 }, // Path 2
  { x: 3736, y: 1484 }, // Path 3
  { x: 3655, y: 1673 }, // Path 4
  { x: 3621, y: 1768 }, // Path 5
  { x: 3550, y: 1784 }, // Path 6
  { x: 3518, y: 1791 }, // Path 7
  { x: 3421, y: 1786 }, // Path 8
  { x: 3343, y: 1799 }, // Path 9
  { x: 3226, y: 1763 }, // Path 10
  { x: 3243, y: 1723 }, // Castle entrance
];

const THIRTY_MIN_ROUTE_PX: Px[] = [
  { x: 3676, y: 851 },  // Entrance
  { x: 3351, y: 1068 },
  { x: 3368, y: 1093 },
  { x: 3379, y: 1127 },
  { x: 3290, y: 1221 },
  { x: 3239, y: 1347 },
  { x: 3173, y: 1539 },
  { x: 3173, y: 1605 },
  { x: 3098, y: 1619 },
  { x: 3008, y: 1627 },
  { x: 2957, y: 1623 },
  { x: 2896, y: 1632 },
  { x: 2847, y: 1641 },
  { x: 2782, y: 1662 },
  { x: 2701, y: 1671 },
  { x: 2580, y: 1683 },
  { x: 2517, y: 1716 },
  { x: 2472, y: 1711 },
  { x: 2403, y: 1716 },
  { x: 2344, y: 1732 },
  { x: 2284, y: 1731 },
  { x: 2160, y: 1725 },
  { x: 2063, y: 1715 },
  { x: 1982, y: 1738 },
  { x: 1908, y: 1768 },
  { x: 1858, y: 1809 },
  { x: 1874, y: 1897 },
  { x: 1883, y: 1942 },
  { x: 1907, y: 1984 },
  { x: 1931, y: 2056 },
  { x: 1942, y: 2118 },
  { x: 1998, y: 2163 },
  { x: 2050, y: 2212 },
  { x: 2122, y: 2169 },
  { x: 2181, y: 2222 },
  { x: 2279, y: 2307 },
  { x: 2349, y: 2351 },
  { x: 2478, y: 2362 },
  { x: 2556, y: 2387 },
  { x: 2683, y: 2348 },
  { x: 2733, y: 2328 },
  { x: 2826, y: 2359 },
  { x: 2894, y: 2271 },
  { x: 2950, y: 2255 },
  { x: 3075, y: 2253 },
  { x: 3170, y: 2246 },
  { x: 3219, y: 2225 },
  { x: 3305, y: 2161 },
  { x: 3381, y: 2118 },
  { x: 3458, y: 2092 },
  { x: 3545, y: 2086 },
  { x: 3636, y: 2087 },
  { x: 3681, y: 2092 },
  { x: 3668, y: 1984 },
  { x: 3657, y: 1860 },
  { x: 3620, y: 1768 },
  { x: 3646, y: 1687 },
  { x: 3677, y: 1621 },
  { x: 3714, y: 1519 },
  { x: 3778, y: 1390 },
  { x: 3808, y: 1334 },
  { x: 3748, y: 1299 },
  { x: 3682, y: 1261 },
  { x: 3615, y: 1222 },
  { x: 3526, y: 1170 },
  { x: 3458, y: 1128 },
  { x: 3413, y: 1111 },
  { x: 3399, y: 1110 },
  { x: 3379, y: 1127 }, // End back near bridge
];

export default function NavigationScreen() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showFastestRoute, setShowFastestRoute] = useState(false);
  const [showAccessibleRoute, setShowAccessibleRoute] = useState(false);
  const [showThirtyMinRoute, setShowThirtyMinRoute] = useState(false);
  const [routesOpen, setRoutesOpen] = useState(false);


  const insets = useSafeAreaInsets();
  const HEADER_HEIGHT = 88;
  const HEADER_TOTAL_HEIGHT = HEADER_HEIGHT + insets.top;

  return (
  <SafeAreaView style={s.screen} edges={["top", "left", "right"]}>
    <StatusBar barStyle="light-content" />

    {/* MAP ROUTES */}
    <View style={[s.content, { paddingTop: HEADER_TOTAL_HEIGHT }]}>
      <NavigationMap
        showFastestRoute={showFastestRoute}
        showAccessibleRoute={showAccessibleRoute}
        showThirtyMinRoute={showThirtyMinRoute}
      />
    </View>

    {/* MENU */}
    <SlideMenu
      visible={menuOpen}
      onClose={() => setMenuOpen(false)}
      onSelect={(label: string) => {
        const path: Record<string, Href> = {
          HOME: "/" as Href,
          MAP: "../navigation" as Href,
          INFO: "../info" as Href,
          NATURE: "../nature" as Href,
          "AUDIO TOUR": "../audio" as Href,
          PHOTOS: "../photos" as Href,
        };

        router.push(path[label] ?? ("/" as Href));
        setMenuOpen(false);
      }}
    />

    {/* HEADER */}
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

      <Text style={s.headerText}>MAP</Text>

      <View style={s.headerSide}>
        <Image
          source={require("../../../assets/images/blarney-logo2.png")}
          style={s.logo}
          resizeMode="contain"
        />
      </View>
    </View>

    {/* ROUTES DROPDOWN */}
    <View style={s.routesUi} pointerEvents="box-none">
      <Pressable
        style={s.routesBtn}
        onPress={() => setRoutesOpen(v => !v)}
        accessibilityLabel="Open route options"
        hitSlop={12}
      >
        <Text style={s.routesBtnText}>{routesOpen ? "ROUTES ▲" : "ROUTES ▼"}</Text>
      </Pressable>

      {routesOpen && (
        <View style={s.routesPanel}>
          <Pressable
            style={s.routeRow}
            onPress={() => setShowFastestRoute(v => !v)}
          >
            <Text style={s.routeLabel}>Fastest to Castle</Text>
            <Text style={s.routeValue}>{showFastestRoute ? "ON" : "OFF"}</Text>
          </Pressable>

          <Pressable
            style={s.routeRow}
            onPress={() => setShowAccessibleRoute(v => !v)}
          >
            <Text style={s.routeLabel}>Accessible Route</Text>
            <Text style={s.routeValue}>{showAccessibleRoute ? "ON" : "OFF"}</Text>
          </Pressable>

          <Pressable
            style={[s.routeRow, { borderBottomWidth: 0 }]}
            onPress={() => setShowThirtyMinRoute(v => !v)}
          >
            <Text style={s.routeLabel}>30-Minute Loop</Text>
            <Text style={s.routeValue}>{showThirtyMinRoute ? "ON" : "OFF"}</Text>
          </Pressable>
        </View>
      )}
    </View>
  </SafeAreaView>
);
}

function NavigationMap({
  showFastestRoute,
  showAccessibleRoute,
  showThirtyMinRoute,
}: {
  showFastestRoute: boolean;
  showAccessibleRoute: boolean;
  showThirtyMinRoute: boolean;
}) {

  const mapSource = require("../../../assets/images/bc-map.jpg");

  // IMAGE SIZE
  const imgW = 5140;
  const imgH = 5054;

  const [viewport, setViewport] = useState({ w: 0, h: 0 });
  const [userLatLng, setUserLatLng] = useState<LatLng | null>(null);

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
      { scale: zoom.value },
      { translateX: translateX.value },
      { translateY: translateY.value },
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

  const isOffsite =
    !!userPx && (userPx.x < 0 || userPx.y < 0 || userPx.x > imgW || userPx.y > imgH);

  const userOnMap = !isOffsite && userPx
    ? { x: userPx.x * base.baseScale, y: userPx.y * base.baseScale }
    : null;

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

  // Build the SVG polyline points string in SCALED pixel space
  const fastestRoutePoints = useMemo(() => {
    const pts = FASTEST_ROUTE_PX
      .map(p => `${p.x * base.baseScale},${p.y * base.baseScale}`)
      .join(" ");
    return pts;
  }, [base.baseScale]);
  
  const accessibleRoutePoints = useMemo(() => {
  return ACCESSIBLE_ROUTE_PX
    .map(p => `${p.x * base.baseScale},${p.y * base.baseScale}`)
    .join(" ");
}, [base.baseScale]);

  const thirtyMinRoutePoints = useMemo(() => {
  return THIRTY_MIN_ROUTE_PX
    .map(p => `${p.x * base.baseScale},${p.y * base.baseScale}`)
    .join(" ");
}, [base.baseScale]);



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

            {/* ROUTE OVERLAY */}
            {showFastestRoute && (
              <Svg
                width="100%"
                height="100%"
                viewBox={`0 0 ${base.renderW} ${base.renderH}`}
                style={s.svgOverlay}
                pointerEvents="none"
              >
                <Polyline
                  points={fastestRoutePoints}
                  fill="none"
                  stroke="#E53935"
                  strokeWidth={1.5}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </Svg>
            )}
            {showAccessibleRoute && (
              <Svg
                width="100%"
                height="100%"
                viewBox={`0 0 ${base.renderW} ${base.renderH}`}
                style={s.svgOverlay}
                pointerEvents="none"
              >
                <Polyline
                  points={accessibleRoutePoints}
                  fill="none"
                  stroke="#2E7D32"          
                  strokeWidth={1.5}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </Svg>
            )}
            {showThirtyMinRoute && (
              <Svg
                width="100%"
                height="100%"
                viewBox={`0 0 ${base.renderW} ${base.renderH}`}
                style={s.svgOverlay}
                pointerEvents="none"
              >
                <Polyline
                  points={thirtyMinRoutePoints}
                  fill="none"
                  stroke="#3F51B5"        
                  strokeWidth={1.5}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </Svg>
            )}


            {/* GPS DOT - USER LIVE LOCATION */}
            {userOnMap && (
              <View style={[s.userDot, { left: userOnMap.x - 5, top: userOnMap.y - 5 }]} />
            )}
          </Animated.View>
        </View>
      </GestureDetector>

      {/* BUTTONS - FIXED ON SCREEN */}
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

  content: {
    flex: 1,
    backgroundColor: colors.brand,
  },

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
  },

  svgOverlay: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },

  userDot: {
    position: "absolute",
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#2ea8ff",
    borderWidth: 2,
    borderColor: "#fff",
  },

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
    zIndex: 9999,
    elevation: 9999,
  },

  centerIcon: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
  },

routesUi: {
  position: "absolute",
  left: 20,
  bottom: 24,
  zIndex: 10000,
  elevation: 10000,
},

routesBtn: {
  height: 44,
  borderRadius: 22,
  paddingHorizontal: 14,
  backgroundColor: "rgba(0,0,0,0.55)",
  alignItems: "center",
  justifyContent: "center",
},

routesBtnText: {
  color: "#fff",
  fontWeight: "800",
  fontSize: 12,
  letterSpacing: 0.5,
},

routesPanel: {
  marginTop: 10,
  borderRadius: 14,
  backgroundColor: "rgba(0,0,0,0.55)",
  overflow: "hidden",
  minWidth: 220,
},

routeRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingHorizontal: 14,
  paddingVertical: 12,
  borderBottomWidth: StyleSheet.hairlineWidth,
  borderBottomColor: "rgba(255,255,255,0.2)",
},

routeLabel: {
  color: "#fff",
  fontWeight: "700",
  fontSize: 13,
},

routeValue: {
  color: "#fff",
  fontWeight: "900",
  fontSize: 13,
},
});
