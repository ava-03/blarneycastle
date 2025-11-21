// https://reactnative.dev/docs/safeareaview
// https://reactnative.dev/docs/pressable
// https://reactnative.dev/docs/platform
// https://reactnative.dev/docs/scrollview
// https://reactnative.dev/docs/stylesheet
// https://reactnative.dev/docs/image
// https://www.youtube.com/watch?v=Ts3kTbdQ_4U
// https://www.youtube.com/watch?v=RIO5YFxH_ik
// https://www.bing.com/videos/riverview/relatedvideo?&q=Creating+Responsive+Card+Layouts+in+React+Native&&mid=8FAC63E032ED79C2A8808FAC63E032ED79C2A880&&FORM=VRDGAR
// https://blarneycastle.retailint-tickets.com/Home

import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  Platform,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import { router } from "expo-router";
import { colors } from "../../../constants/colors";

const serif = Platform.select({
  ios: "Times New Roman",
  android: "serif",
  web: "Times New Roman, serif",
});
// photos
const castleHero = require("../../../assets/images/castle_photo1.jpg");
const castleInterior = require("../../../assets/images/castle_photo2.jpg");
const castleGardens = require("../../../assets/images/castle_photo3.jpg");

export default function CastleScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.brand }}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={s.header}>
        <Pressable
          style={s.headerSide}
          onPress={() => router.back()}
          accessibilityLabel="Back to Information"
        >
          <Text style={s.backArrow}>‹</Text>
        </Pressable>

        <Text style={s.headerText}>BLARNEY CASTLE</Text>

        <View style={s.headerSide}>
          <Image
            source={require("../../../assets/images/blarney-logo2.png")}
            style={s.logo}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Content */}
      <View style={s.contentWrapper}>
        <ScrollView
          contentContainerStyle={s.scrollInner}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero image */}
          <Image source={castleHero} style={s.heroImage} resizeMode="cover" />

          <Text style={s.pageTitle}>Blarney Castle</Text>

          <Text style={s.bodyText}>
            Blarney Castle is a tower house, a type of fortification built by
            Gaelic lords and the Anglo-Irish between the 15th and 17th
            centuries. Tower houses are typically four or five storeys tall with
            one or two main chambers, plus several ancillary chambers on each
            floor.
          </Text>

          <Text style={s.bodyText}>
            Blarney Castle is an unusually large tower house, and it comprises
            at least two towers – the second one was added in the 1500s. You can
            see the point the two phases meet as a vertical line in the masonry
            on the north elevation.
          </Text>

          <Text style={s.bodyText}>
            The walls are around 18 feet thick at the base, gradually sloping
            inwards as they rise. This makes the building more stable but would
            also have helped with defence: when an object was dropped from the
            top it would bounce off the wall on the way down and fly outwards
            into the enemy.
          </Text>

          <Text style={s.subHeading}>Explore the Castle</Text>
          <Text style={s.bodyText}>
            As you move through the castle you&apos;ll find a series of rooms,
            passages and viewpoints that reveal how people once lived and
            defended this extraordinary place.
          </Text>

          {/* Small image row / gallery */}
          <View style={s.galleryRow}>
            <Image
              source={castleInterior}
              style={s.galleryImage}
              resizeMode="cover"
            />
            <Image
              source={castleGardens}
              style={s.galleryImage}
              resizeMode="cover"
            />
          </View>

          <Text style={[s.bodyText, { marginTop: 12 }]}>
            Take your time to explore the different levels, look out across the
            surrounding countryside and imagine the centuries of history held
            within these walls.
          </Text>

          {/* room breakdown */}
          <Text style={s.subHeading}>Castle Rooms</Text>
          <Text style={s.bodyText}>
            TBC
          </Text>

          <View style={{ height: 24 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
// styles
const s = StyleSheet.create({
  header: {
    height: 88,
    backgroundColor: colors.brand,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  headerSide: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    flex: 1,
    textAlign: "center",
    color: colors.textLight,
    fontFamily: serif,
    fontSize: 25,
    fontWeight: "800",
  },
  backArrow: {
    color: colors.textLight,
    fontSize: 28,
    lineHeight: 28,
  },
  logo: {
    width: Platform.select({ web: 56, default: 64 }),
    height: Platform.select({ web: 56, default: 64 }),
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollInner: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
  },
  heroImage: {
    width: "100%",
    height: 200,
    borderRadius: 16,
    marginBottom: 16,
  },
  pageTitle: {
    fontFamily: serif,
    fontSize: 22,
    marginBottom: 10,
    color: colors.brand,
  },
  bodyText: {
    fontFamily: serif,
    fontSize: 14,
    lineHeight: 20,
    color: "#123",
    marginBottom: 8,
  },
  subHeading: {
    fontFamily: serif,
    fontSize: 16,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 6,
    color: colors.brand,
  },
  galleryRow: {
    flexDirection: "row",
    gap: 8 as any, // if TS complains, remove this and use marginRight
    marginTop: 12,
  },
  galleryImage: {
    flex: 1,
    height: 120,
    borderRadius: 12,
  },
});
