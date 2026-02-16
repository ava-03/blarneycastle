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
const houseHero = require("../../../assets/images/bc_house1.jpg");
const houseInterior = require("../../../assets/images/bc_house2.jpg");

export default function HouseScreen() {
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

        <Text style={s.headerText}>BLARNEY HOUSE</Text>

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
          {/* Hero (main) image */}
          <Image source={houseHero} style={s.heroImage} resizeMode="cover" />

          <Text style={s.pageTitle}>Blarney House</Text>

          <Text style={s.bodyText}>
            Built in 1874 to welcome the return of the family after an absence
            of 54 years, Blarney House may surprise visitors by being in the
            Scots baronial style, which is rare in the southern half of Ireland.
          </Text>

          <Text style={s.bodyText}>
            Its architect was John Lanyon from Belfast. Typical of High
            Victorian buildings, Blarney House incorporates elements of several
            styles. The porch is neoclassical and comes from the Colthursts’
            former house at Ardrum, a neighbouring estate.
          </Text>

          <Text style={s.bodyText}>
            Above this, the first-floor window is embellished with Jacobean
            strapwork, while the skyline is pure Scots baronial with stepped
            gables and a turret. The silhouette is wonderfully lively, with
            conical roofs topped with decorative finials and tall chimneys.
          </Text>

          <Text style={s.subHeading}>Inside the House</Text>

          {/* Second image */}
          <Image
            source={houseInterior}
            style={s.secondaryImage}
            resizeMode="cover"
          />

          <Text style={s.bodyText}>
            On entering the lofty hall, visitors are confronted by a steep, wide
            flight of stone steps, which have an almost medieval sense of
            defence. Double doors at the top open into the staircase hall, which
            is domestic in feel and welcoming.
          </Text>

          <Text style={s.bodyText}>
            The imposing Jacobean-style staircase is lit from above and hung
            with portraits of Jefferyes and Colthurst family members and
            associates. Over time, the uses of some rooms have changed; the
            present library, for example, was once the dining room, with meals
            prepared in the basement.
          </Text>

          <Text style={s.bodyText}>
            In the corner turret, diagonally opposite the door from the hall, a
            lift was installed to bring food from the basement. Details like
            this reflect how the house has adapted to changing needs while
            preserving its character.
          </Text>

          <View style={{ height: 24 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

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
    fontSize: Platform.select({ web: 26, default: 22 }),
    fontWeight: "800",
  },
  backArrow: {
    color: colors.textLight,
    fontSize: 42,
    lineHeight: 34,
  },
  logo: {
    width: Platform.select({ web: 56, default: 55 }),
    height: Platform.select({ web: 56, default: 60 }),
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
  secondaryImage: {
    width: "100%",
    height: 180,
    borderRadius: 16,
    marginVertical: 12,
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
