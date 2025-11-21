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
const stoneHero = require("../../../assets/images/blarney_stone.jpg");

export default function StoneScreen() {
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

        <Text style={s.headerText}>BLARNEY STONE</Text>

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
          {/* Hero image (main) */}
          <Image source={stoneHero} style={s.heroImage} resizeMode="cover" />

          <Text style={s.pageTitle}>The Blarney Stone</Text>

          <Text style={s.bodyText}>
            “There is a stone there, that whoever kisses, OH! He never misses, to grow eloquent.”
          </Text>

          <Text style={s.bodyText}>
            The term ‘blarney’, meaning beguiling but misleading talk, gained 
            currency during the 16th century as the MacCarthy of the day 
            attempted to fend off the demands of Queen Elizabeth I.
          </Text>

          <Text style={s.subHeading}>Legends & Origins</Text>

          <Text style={s.bodyText}>
            Countless legends surround the origin of the Blarney Stone. 
            Some say it was the stone used by Jacob as a pillow when he 
            dreamed of the angelic ladder to heaven. Others claim it was 
            brought back from the Holy Land after the Crusades.
          </Text>

          <Text style={s.bodyText}>
            Another legend tells that the stone was a gift to the MacCarthy 
            Chieftain from Robert Bruce, in gratitude for sending troops 
            to support him at the Battle of Bannockburn — and that it was part 
            of the Stone of Scone on which Scottish Kings were crowned.
          </Text>

          <Text style={s.bodyText}>
            A more magical tale tells of a witch rescued from drowning, who 
            revealed that the stone held mystical powers. If kissed, it would 
            grant the gift of eloquence.
          </Text>

          <Text style={s.subHeading}>The Stone of Eloquence</Text>

          <Text style={s.bodyText}>
            Whatever its true origins, the powers of the Blarney Stone are 
            unquestioned. Visitors have been travelling from around the world 
            for centuries to lie back, hold the iron rails, and kiss the stone — 
            receiving the legendary “gift of the gab.”
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
});
