/**
 * app/(tabs)/index.tsx
 * ------------------------------------------------------------
 * Blarney Castle Visitor App - Home Screen (Visitor-safe)
 * ------------------------------------------------------------
 * - No developer/error messages shown to visitors.
 * - If backend is unavailable, we silently show safe defaults (N/A).
 * - Background retry every 30s to refresh data when connection returns.
 * - Tapping "GET TICKETS HERE" opens the URL even if offline.
 * ------------------------------------------------------------
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
} from "react-native";
import { fetchHomeStatus, ping, HomeStatus } from "../../lib/api";  
import { colors } from "../../constants/colors";
import SlideMenu from "../../components/slidemenu";           


/** Toggle this to true ONLY while developing if you want to see status text. */
const SHOW_DEV_STATUS = false;

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);              // first load spinner
  const [refreshing, setRefreshing] = useState(false);       // pull-to-refresh spinner
  const [data, setData] = useState<HomeStatus | null>(null); // latest data (or null on failure)
  const [menuOpen, setMenuOpen] = useState(false);           // slide-out menu visibility

  const HEADER_HEIGHT = 88;

  // store an interval id so we can clear it if screen unmounts
  const retryIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // -- Helper: open the tickets URL in the device browser --
  const openTicketLink = async (url: string) => {
    const ok = await Linking.canOpenURL(url);
    if (ok) await Linking.openURL(url);
  };

  // -- Fetch function used by first load, pull-to-refresh, and silent retries --
  const load = async () => {
    try {
      await ping(); // If this throws, we skip updating 'data' and keep previous values
      const res = await fetchHomeStatus();
      setData(res);
    } catch {
      // Intentionally silent: no alerts, no banners, no console noise in production
      // We leave `data` as is; UI will show N/A if null.
    }
  };

  // -- First load + start a quiet background retry every 30s --
  useEffect(() => {
    (async () => {
      await load();
      setLoading(false);
    })();

    // quiet background refresh
    retryIntervalRef.current = setInterval(load, 30_000);

    return () => {
      if (retryIntervalRef.current) clearInterval(retryIntervalRef.current);
    };
  }, []);

  // -- Pull-to-refresh handler (manual refresh by user) --
  const onRefresh = async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  };

  // Safe fallbacks if backend hasn't provided data yet
  const ticketsUrl = data?.tickets_url ?? "https://blarneycastle.ie/gardens/";
  const queue = data ? `${data.castle_queue_wait_mins} mins` : "N/A";
  const carpark = data?.car_park_status ?? "N/A";
  const closing = data?.closing_time ?? "N/A";
  const last = data?.last_admission ?? "N/A";

  // Small reusable "pill" component
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

  // First-load spinner (shows briefly on cold start)
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

    {/* Header band: centered HOME + hamburger on right */}
    <View style={[styles.header, { height: HEADER_HEIGHT }]}>
      {/* left spacer so title stays centered */}
      <View style={{ width: 40, height: 30 }} />
      <Text style={styles.headerText}>HOME</Text>
      <Pressable
        accessibilityLabel="Open menu"
        onPress={() => setMenuOpen(true)}
        style={styles.burger}
      >
        <View style={styles.line} />
        <View style={styles.line} />
        <View style={styles.line} />
      </Pressable>
    </View>

    {/* (Optional) Dev-only connection hint */}
    {SHOW_DEV_STATUS ? (
      <Text style={styles.devStatus}>
        {data ? "Backend: connected" : "Backend: offline"}
      </Text>
    ) : null}

    {/* Content with pull-to-refresh; silent if backend down */}
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

    {/* Slide-out menu overlay */}
    <SlideMenu
      visible={menuOpen}
      onClose={() => setMenuOpen(false)}
      onSelect={(label: string) => {
        console.log("Menu selected:", label);
        setMenuOpen(false);
      }}
    />
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.brand }, // not used as root anymore
  center: { justifyContent: "center", alignItems: "center" },

  header: {
    backgroundColor: colors.brand,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    // height provided inline from HEADER_HEIGHT
  },
  headerText: { color: colors.textLight, fontSize: 28, fontWeight: "800", letterSpacing: 0.5 },

  burger: {
    width: 40,
    height: 30,
    alignItems: "center",
    justifyContent: "space-around",
  },
  line: { width: 26, height: 3, backgroundColor: colors.textLight, borderRadius: 2 },

  devStatus: {
    color: colors.textLight,
    textAlign: "center",
    opacity: 0.7,
    marginBottom: 6,
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  pill: {
    backgroundColor: colors.pill,
    borderRadius: 22,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 18,
  },
  pillTitle: { color: colors.textDark, fontWeight: "bold", marginBottom: 6, fontSize: 15 },
  pillValue: { color: colors.textDark, fontSize: 16 },
});



