// https://reactnative.dev/docs/pressable
// https://reactnative.dev/docs/refreshcontrol
// https://reactnative.dev/docs/safeareaview
// https://reactnative.dev/docs/linking#openurl
// https://reactnative.dev/docs/image#static-image-resources
// https://reactnative.dev/docs/image
// https://reactnative.dev/docs/platform#platformselect
// https://reactnative.dev/docs/statusbar
// https://reactnative.dev/docs/scrollview
// https://docs.expo.dev/router/introduction/
// https://axios-http.com/docs/api_intro
// https://react.dev/learn/synchronizing-with-effects#effects-with-cleanup - for initial load + 30s background refresh + cleanup
// https://reactnative.dev/docs/linking#canopenurl
// https://reactnative.dev/docs/accessibility#accessibility-hints-and-label
// https://react.dev/reference/react
// https://icons.expo.fyi/Index
// https://docs.expo.dev/router/basics/navigation/
// https://reactnative.dev/docs/activityindicator - loading spinner
// https://reactnative.dev/docs/flexbox
// https://reactnative.dev/docs/shadow-props
// https://www.bing.com/videos/riverview/relatedvideo?&q=Expo+Router+Tutorial&&mid=6F3CBEE362D2A2DB1EA86F3CBEE362D2A2DB1EA8&&FORM=VRDGAR
// https://www.bing.com/videos/riverview/relatedvideo?&q=Using+Axios+in+React+Native+(Expo)&&mid=4A19FA7B5182691D26F64A19FA7B5182691D26F6&&FORM=VRDGAR
// https://www.youtube.com/watch?v=vsO4TLtAZzk
// https://www.youtube.com/watch?v=czhLCGuu_AU
// https://www.bing.com/videos/riverview/relatedvideo?q=React+Native+%2f+Expo+app+tutorial&&mid=EDF96FB854573B3FE736EDF96FB854573B3FE736&FORM=VCGVRP
// https://www.youtube.com/watch?v=Ts3kTbdQ_4U
// https://www.youtube.com/watch?v=22uJhH1S8fU
// https://www.youtube.com/watch?v=RIO5YFxH_ik
// https://reactnative.dev/docs/imagebackground
// https://www.bing.com/videos/riverview/relatedvideo?q=setting+an+image+as+a+background+on+react+native+with+expo&&mid=DB861F2C03D1A6B6B2D7DB861F2C03D1A6B6B2D7&churl=https%3a%2f%2fwww.youtube.com%2fchannel%2fUCwJWXcI12lhcorzG7Vrf2zw&mmscn=mtsc&aps=28&FORM=VMSOVR
// https://www.youtube.com/watch?v=czhLCGuu_AU&t=323s
// https://www.bing.com/videos/riverview/relatedvideo?q=adding+loading+spinners+into+a+pill+for+expo+react+native&mid=39063DC2801CBCF88B6439063DC2801CBCF88B64&FORM=VIRE
// https://www.bing.com/videos/riverview/relatedvideo?q=adding%20loading%20spinners%20into%20a%20pill%20for%20expo%20react%20native&mid=7FE8BB8FC4A57EB351B47FE8BB8FC4A57EB351B4&ajaxhist=0

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
  ImageBackground,
} from "react-native";

import { fetchHomeStatus, ping, HomeStatus } from "../../lib/api";
import { colors } from "../../constants/colors";
import SlideMenu from "../../components/slidemenu";
import { router, type Href } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";

const SHOW_DEV_STATUS = false;

// — Platform-specific serif fallback
const serif = Platform.select({
  ios: "Times New Roman",
  android: "serif",
  web: "Times New Roman, serif",
});

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState<HomeStatus | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const [hasEverSucceeded, setHasEverSucceeded] = useState(false);

  const retryIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const mountedRef = useRef(true);

  const openTicketLink = async (url: string) => {
    const ok = await Linking.canOpenURL(url);
    if (ok) await Linking.openURL(url);
  };

  const load = async () => {
    try {
      await ping();
      const res = await fetchHomeStatus();

      if (!mountedRef.current) return;
      setData(res);
      setHasEverSucceeded(true); 
    } catch {
      // silent fail while server wakes
      // pills keep spinning until success
    }
  };

  const bgModule = require("../../assets/images/castle_background.png");
  const bgUri = Asset.fromModule(bgModule).uri;

  useEffect(() => {
    mountedRef.current = true;

    
    load();

    //  Retry every 30 seconds
    retryIntervalRef.current = setInterval(load, 30_000);

    return () => {
      mountedRef.current = false;
      if (retryIntervalRef.current) clearInterval(retryIntervalRef.current);
    };
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  };

  const ticketsUrl =
    data?.tickets_url ??
    "https://blarneycastle.retailint-tickets.com/Event/GENERALADM";

  //  Pill values:
  // - Before first success: spinner
  // - After success: shows value if available, otherwise "—"
  const queue = !hasEverSucceeded
    ? "loading"
    : data && typeof data.castle_queue_wait_mins === "number"
    ? `${data.castle_queue_wait_mins} minutes`
    : "—";

  const carpark = !hasEverSucceeded ? "loading" : data?.car_park_status ?? "—";
  const closing = !hasEverSucceeded ? "loading" : data?.closing_time ?? "—";
  const last = !hasEverSucceeded ? "loading" : data?.last_admission ?? "—";

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
        pressed && onPress ? { opacity: 0.92, transform: [{ scale: 0.99 }] } : null,
      ]}
      accessibilityRole={onPress ? "button" : undefined}
      accessibilityLabel={title}
    >
      <Text style={styles.pillTitle}>{title}</Text>
      {value === "loading" ? (
        <ActivityIndicator size="small" color="#111" />
      ) : value ? (
        <Text style={styles.pillValue}>{value}</Text>
      ) : null}
    </Pressable>
  );

  const bgResizeMode = Platform.OS === "web" ? "contain" : "cover";

  return (
    <SafeAreaView style={styles.container}>
      {/* White top area - dark icons/text in status bar */}
      <StatusBar barStyle="dark-content" />

      {/* Top white header */}
      <View style={styles.topBar}>
        <Pressable
          accessibilityLabel="Open menu"
          onPress={() => setMenuOpen(true)}
          style={styles.menuButton}
        >
          <Ionicons name="menu" size={36} color={colors.brand} />
        </Pressable>

        <View pointerEvents="none" style={styles.logoWrap}>
          <Image
            source={require("../../assets/images/logo-white.png")}
            style={styles.officialLogo}
            resizeMode="contain"
            accessibilityLabel="Blarney Castle and Gardens logo"
          />
        </View>

        {/* right spacer to keep logo centered */}
        <View style={styles.rightSpacer} />
      </View>

      {SHOW_DEV_STATUS ? (
        <Text style={styles.devStatus}>
          {hasEverSucceeded ? "Backend: connected" : "Backend: waking…"}
        </Text>
      ) : null}

      {/* Background image section */}
      {Platform.OS === "web" ? (
        <View
          style={[
            styles.webBg,
            ({ backgroundImage: `url("${bgUri}")` } as any),
          ]}
        >
          <View style={styles.bgTint}>
            <ScrollView
              style={styles.scroll}
              contentContainerStyle={styles.content}
              refreshControl={
                <RefreshControl
                  tintColor={colors.textLight}
                  colors={[colors.textLight]}
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
              showsVerticalScrollIndicator={false}
            >
              {/* Map + Info cards */}
              <View style={styles.quickLinksRow}>
                <Pressable
                  style={styles.quickLinkButton}
                  onPress={() => router.push("/navigation" as Href)}
                  accessibilityLabel="Open map and navigation"
                >
                  <Ionicons name="location-outline" size={34} color={colors.brand} />
                  <Text style={styles.quickLinkLabel}>Map</Text>
                </Pressable>

                <Pressable
                  style={styles.quickLinkButton}
                  onPress={() => router.push("/info" as Href)}
                  accessibilityLabel="Open information page"
                >
                  <Ionicons
                    name="information-circle-outline"
                    size={34}
                    color={colors.brand}
                  />
                  <Text style={styles.quickLinkLabel}>Info</Text>
                </Pressable>
              </View>

              <Pressable
                style={styles.ticketCta}
                onPress={() => openTicketLink(ticketsUrl)}
                accessibilityLabel="Get tickets"
              >
                <Text style={styles.ticketCtaText}>Get Tickets Here</Text>
              </Pressable>

              <Pill title="CASTLE QUEUE TIME" value={queue} />
              <Pill title="CAR PARK STATUS" value={carpark} />
              <Pill title="CLOSING TIME" value={closing} />
              <Pill title="LAST ADMISSION" value={last} />

              <View style={styles.refreshNote}>
                <Ionicons
                  name="arrow-down-outline"
                  size={14}
                  color= "white"
                />
                <Text style={styles.refreshNoteText}>
                  Pull down to refresh live information
                </Text>
              </View>
            </ScrollView>
          </View>
        </View>
      ) : (
        <ImageBackground source={bgModule} style={styles.bg} resizeMode="cover">
          <View style={styles.bgTint}>
            <ScrollView
              style={styles.scroll}
              contentContainerStyle={styles.content}
              refreshControl={
                <RefreshControl
                  tintColor={colors.textLight}
                  colors={[colors.textLight]}
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
              showsVerticalScrollIndicator={false}
            >
              {/* Map + Info cards */}
              <View style={styles.quickLinksRow}>
                <Pressable
                  style={styles.quickLinkButton}
                  onPress={() => router.push("/navigation" as Href)}
                  accessibilityLabel="Open map and navigation"
                >
                  <Ionicons name="location-outline" size={34} color={colors.brand} />
                  <Text style={styles.quickLinkLabel}>Map</Text>
                </Pressable>

                <Pressable
                  style={styles.quickLinkButton}
                  onPress={() => router.push("/info" as Href)}
                  accessibilityLabel="Open information page"
                >
                  <Ionicons
                    name="information-circle-outline"
                    size={34}
                    color={colors.brand}
                  />
                  <Text style={styles.quickLinkLabel}>Info</Text>
                </Pressable>
              </View>

              <Pressable
                style={styles.ticketCta}
                onPress={() => openTicketLink(ticketsUrl)}
                accessibilityLabel="Get tickets"
              >
                <Text style={styles.ticketCtaText}>Get Tickets Here</Text>
              </Pressable>

              <Pill title="CASTLE QUEUE TIME" value={queue} />
              <Pill title="CAR PARK STATUS" value={carpark} />
              <Pill title="CLOSING TIME" value={closing} />
              <Pill title="LAST ADMISSION" value={last} />

              <View style={styles.refreshNote}>
                <Ionicons
                  name="arrow-down-outline"
                  size={14}
                  color="rgba(0,0,0,0.55)"
                />
                <Text style={styles.refreshNoteText}>
                  Pull down to refresh live information
                </Text>
              </View>
            </ScrollView>
          </View>
        </ImageBackground>
      )}

      <SlideMenu
        visible={menuOpen}
        onClose={() => setMenuOpen(false)}
        onSelect={(label: string) => {
          const path: Record<string, Href> = {
            HOME: "/" as Href,
            NAVIGATION: "/navigation" as Href,
            INFO: "/info" as Href,
            NATURE: "/nature" as Href,
            "AUDIO TOUR": "/audio" as Href,
            PHOTOS: "/photos" as Href,
          };

          if (label === "INFO") {
            router.replace("/info");
          } else {
            router.push(path[label] ?? ("/" as Href));
          }
          setMenuOpen(false);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },

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

  scroll: {
    flex: 1,
  },

  devStatus: {
    color: "#1A1A1A",
    backgroundColor: "white",
    textAlign: "center",
    paddingBottom: 6,
    opacity: 0.6,
  },

  // Background area
  bg: {
    flex: 1,
  },
  bgTint: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.00)",
  },

  // Scroll content padding
  content: {
    paddingTop: 28,
    paddingBottom: 36,
    flexGrow: 1,
  },

  // Map/Info cards
  quickLinksRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 14,
  },
  quickLinkButton: {
    backgroundColor: "rgba(255,255,255,0.92)",
    borderRadius: 22,
    paddingVertical: 18,
    paddingHorizontal: 22,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 115,
    minHeight: 105,
    marginHorizontal: 10,

    // iOS shadow
    shadowColor: "#000",
    shadowOpacity: 0.16,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },

    // Android shadow
    elevation: 5,

    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.06)",
  },
  quickLinkLabel: {
    marginTop: 8,
    color: colors.brand,
    fontSize: 30,
    fontFamily: serif,
  },

  // Green Tickets
  ticketCta: {
    alignSelf: "center",
    width: "66%",
    backgroundColor: colors.brand,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 70,

    shadowColor: "#000",
    shadowOpacity: 0.16,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  ticketCtaText: {
    color: "white",
    fontSize: 25,
    fontFamily: serif,
    letterSpacing: 0.2,
  },

  // White pills
  pill: {
    alignSelf: "center",
    width: "82%",
    backgroundColor: "rgba(255,255,255,0.92)",
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 14,

    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  pillTitle: {
    color: "#111",
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 4,
  },
  pillValue: {
    color: "#111",
    fontSize: 16,
  },

  webBg: {
    flex: 1,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundColor: "white",
  },
  refreshNote: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
    marginBottom: 10,
    opacity: 0.75,
  },

  refreshNoteText: {
    marginLeft: 6,
    fontSize: 13,
    color: "white",
  },
});