/**
 * app/index.tsx
 * ------------------------------------------------------------
 * Blarney Castle Visitor App - Home Screen
 * ------------------------------------------------------------
 * Displays visitor information from the backend:
 *  - Tickets link
 *  - Castle queue wait
 *  - Car park status
 *  - Closing time
 *  - Last admission
 *
 * Uses Axios helper functions from lib/api.ts to fetch data.
 * Designed to match the color scheme and branding you provided.
 * ------------------------------------------------------------
 */

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Linking,
  Image,
  ActivityIndicator,
  StatusBar,
} from "react-native";

// Import API helpers (these talk to your FastAPI backend)
import { fetchHomeStatus, ping, HomeStatus } from "../../lib/api";

// Import shared color palette
import { colors } from "../../constants/colors";

// ------------------------------------------------------------
// MAIN COMPONENT
// ------------------------------------------------------------
export default function HomeScreen() {
  // --- State variables for app logic ---
  const [loading, setLoading] = useState(true); // spinner while loading
  const [backendStatus, setBackendStatus] = useState("checking..."); // shows 'connected' or 'offline'
  const [data, setData] = useState<HomeStatus | null>(null); // stores data from backend

  // ------------------------------------------------------------
  // Load data once when the screen first opens
  // ------------------------------------------------------------
  useEffect(() => {
    (async () => {
      try {
        // 1️⃣ Check if backend is reachable
        const pingResponse = await ping();
        if (pingResponse.status === "ok") {
          setBackendStatus("connected");
        }

        // 2️⃣ Fetch the home page data (queue times etc.)
        const homeData = await fetchHomeStatus();
        setData(homeData);
      } catch (error) {
        console.error("Backend not reachable:", error);
        setBackendStatus("offline");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ------------------------------------------------------------
  // Helper: open the ticket link in browser
  // ------------------------------------------------------------
  const openTicketLink = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) await Linking.openURL(url);
  };

  // ------------------------------------------------------------
  // Show spinner while loading
  // ------------------------------------------------------------
  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={colors.textLight} />
        <Text style={{ marginTop: 10, color: colors.textLight }}>Loading...</Text>
      </View>
    );
  }

  // ------------------------------------------------------------
  // Safe fallback values if backend is offline
  // ------------------------------------------------------------
  const ticketsUrl = data?.tickets_url ?? "https://blarneycastle.ie";
  const queue = data ? `${data.castle_queue_wait_mins} mins` : "N/A";
  const carpark = data?.car_park_status ?? "N/A";
  const closing = data?.closing_time ?? "N/A";
  const last = data?.last_admission ?? "N/A";

  // ------------------------------------------------------------
  // Reusable small "info pill" component
  // ------------------------------------------------------------
  const Pill = ({ title, value, onPress }: any) => (
    <Pressable
      style={({ pressed }) => [
        styles.pill,
        pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] },
      ]}
      onPress={onPress}
      disabled={!onPress}
    >
      <Text style={styles.pillTitle}>{title}</Text>
      <Text style={styles.pillValue}>{value}</Text>
    </Pressable>
  );

  // ------------------------------------------------------------
  // Actual screen layout
  // ------------------------------------------------------------
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        {/* Placeholder logo - replace with your actual castle logo later */}
        <Image
          source={{ uri: "https://via.placeholder.com/120x60?text=Blarney" }}
          style={styles.logo}
        />
        <Text style={styles.headerText}>HOME</Text>
      </View>

      {/* Connection status text */}
      <Text style={styles.connection}>Backend: {backendStatus}</Text>

      {/* MAIN CONTENT */}
      <ScrollView contentContainerStyle={styles.content}>
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
    </View>
  );
}

// ------------------------------------------------------------
// STYLES
// ------------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.brand,
    paddingTop: 40,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  logo: {
    width: 120,
    height: 60,
    resizeMode: "contain",
  },
  headerText: {
    color: colors.textLight,
    fontSize: 24,
    fontWeight: "bold",
  },
  connection: {
    color: colors.textLight,
    textAlign: "center",
    marginBottom: 10,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  pill: {
    backgroundColor: colors.pill,
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  pillTitle: {
    color: colors.textDark,
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: 14,
  },
  pillValue: {
    color: colors.textDark,
    fontSize: 16,
  },
});
