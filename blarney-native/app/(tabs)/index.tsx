/**
 * app/(tabs)/index.tsx
 * Home (visitor-safe)
 */

import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Linking,
  ActivityIndicator,
  StatusBar,
  RefreshControl,
  Image,
  Platform,
} from "react-native";
import { fetchHomeStatus, ping, HomeStatus } from "../../lib/api";
import { colors } from "../../constants/colors";
import SlideMenu from "../../components/slidemenu";
import { router, type Href } from "expo-router";

const SHOW_DEV_STATUS = false;

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState<HomeStatus | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const HEADER_HEIGHT = 104;
  const retryIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const openTicketLink = async (url: string) => {
    const ok = await Linking.canOpenURL(url);
    if (ok) await Linking.openURL(url);
  };

  const load = async () => {
    try {
      await ping();
      const res = await fetchHomeStatus();
      setData(res);
    } catch {
      // silent (visitor-safe)
    }
  };

  useEffect(() => {
    (async () => {
      await load();
      setLoading(false);
    })();
    retryIntervalRef.current = setInterval(load, 30_000);
    return () => {
      if (retryIntervalRef.current) clearInterval(retryIntervalRef.current);
    };
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  };

  // ---- values for UI (safe fallbacks) ----
  const ticketsUrl =
    data?.tickets_url ??
    "https://blarneycastle.retailint-tickets.com/Event/GENERALADM";
  const queue = data && typeof data.castle_queue_wait_mins === "number" ? `${data.castle_queue_wait_mins} mins` : "N/A";
  const carpark = data?.car_park_status ?? "N/A";
  const closing = data?.closing_time ?? "N/A";
  const last = data?.last_admission ?? "N/A";

  // small pill component
  const Pill = ({
    title,
    value,
    onPress,
  }: {
    title: string;
    value?: string;
    onPress?: () => void;
  }) => (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => [
        styles.pill,
        pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] },
      ]}
      accessibilityRole={onPress ? "button" : undefined}
      accessibilityLabel={title}
    >
      <Text style={styles.pillTitle}>{title}</Text>
      {value ? <Text style={styles.pillValue}>{value}</Text> : null}
    </Pressable>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <StatusBar barStyle="light-content" />
        <ActivityIndicator size="large" color={colors.textLight} />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.brand }}>
      <StatusBar barStyle="light-content" />

      {/* Header: logo (left) + two-line title (center) + hamburger (right) */}
      <View style={[styles.header, { height: HEADER_HEIGHT }]}>
  <Pressable
    accessibilityLabel="Open menu"
    onPress={() => setMenuOpen(true)}
    style={styles.headerSide}
  >
    <View style={styles.burger}>
      <View style={styles.line} />
      <View style={styles.line} />
      <View style={styles.line} />
    </View>
  </Pressable>

  <View style={styles.titleContainer}>
    <Text style={styles.headerTitle}>Blarney Castle</Text>
    <Text style={styles.headerSubtitle}>& Gardens</Text>
  </View>

  <View style={styles.headerSide}>
    <Image
      source={require("../../assets/images/blarney-logo2.png")}
      style={styles.logo}
      resizeMode="contain"
    />
  </View>
</View>

      {SHOW_DEV_STATUS ? (
        <Text style={styles.devStatus}>
          {data ? "Backend: connected" : "Backend: offline"}
        </Text>
      ) : null}

      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            tintColor={colors.textLight}
            colors={[colors.textLight]}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <Pill
          title="GET TICKETS HERE:"
          value="Click to Open"
          onPress={() => openTicketLink(ticketsUrl)}
        />
        <Pill title="CASTLE QUEUE WAIT:" value={queue} />
        <Pill title="CAR PARK STATUS:" value={carpark} />
        <Pill title="CLOSING TIME:" value={closing} />
        <Pill title="LAST ADMISSION:" value={last} />
      </ScrollView>

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

const serif = Platform.select({
  ios: "Times New Roman",
  android: "serif",
  web: "Times New Roman, serif", // adds proper serif fallback for browsers
});

const styles = StyleSheet.create({
  // containers
  container: { flex: 1, backgroundColor: colors.brand },
  center: { justifyContent: "center", alignItems: "center" },

  // header
  header: {
    backgroundColor: colors.brand,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    height: Platform.select({ web: 120, default: 88 }), 
  },
  headerSide: {
    width: 66,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    width: Platform.select({ web: 82, default: 74 }),
    height: Platform.select({ web: 82, default: 74 }),
  },

  titleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    color: colors.textLight,
    fontSize: Platform.select({ web: 34, default: 28 }),
    fontWeight: "800",
    textAlign: "center",
    fontFamily: serif,
    lineHeight: Platform.select({ web: 38, default: 30 }),
  },

  headerSubtitle: {
    color: colors.textLight,
    fontSize: Platform.select({ web: 34, default: 28 }),
    fontWeight: "800",
    textAlign: "center",
    fontFamily: serif,
    lineHeight: Platform.select({ web: 38, default: 30 }),
    marginTop: Platform.select({ web: -4, default: -2 }),
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
    borderRadius: 2,
    backgroundColor: colors.textLight,
  },

  devStatus: {
  color: colors.textLight,
  textAlign: "center",
  opacity: 0.7,
  marginBottom: Platform.select({ web: 12, default: 6 }),
},

  // pills
  pill: Platform.select({
    web: {
      backgroundColor: colors.pill,
      borderRadius: 22,
      paddingVertical: 18,
      paddingHorizontal: 20,
      marginBottom: 20,
      shadowColor: "#000",
      shadowOpacity: 0.12,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
    },
    default: {
      backgroundColor: colors.pill,
      borderRadius: 22,
      paddingVertical: 18,
      paddingHorizontal: 20,
      marginBottom: 18,
    },
  }),

  pillTitle: {
  color: colors.textDark,
  fontWeight: "bold",
  marginBottom: 6,
  fontSize: Platform.select({ web: 18, default: 15 }),
},

pillValue: {
  color: colors.textDark,
  fontSize: Platform.select({ web: 18, default: 16 }),
},

  // content area spacing
  content: Platform.select({
    web: {
      maxWidth: 1100,
      width: "100%",
      alignSelf: "center",
      paddingLeft: 24,
      paddingRight: 24,
      paddingBottom: 56,
      paddingTop: 28,
    },
    default: {
      paddingHorizontal: 20,
      paddingBottom: 40,
      paddingTop: 20,
    },
  }),
}); 
