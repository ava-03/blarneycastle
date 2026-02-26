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
const enteringCastleImg = require("../../../assets/images/entrance.jpg");
const chapelHallFamilyImg = require("../../../assets/images/chapel.jpg");
const greatHallImg = require("../../../assets/images/hall.jpg");
const kitchenImg = require("../../../assets/images/kitchen.jpg");
const youngLadiesPriestsImg = require("../../../assets/images/bedroom.jpg");
const dungeonImg = require("../../../assets/images/dungeon.jpg");
const wallsBawnImg = require("../../../assets/images/walls.jpg");

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

          {/* Heading */}
          <Text style={s.sectionTitle}>Explore the Castle</Text>
          <Text style={s.bodyText}>
            As you move through the castle you&apos;ll find a series of rooms,
            passages and viewpoints that reveal how people once lived and
            defended this extraordinary place.
          </Text>

          {/* image row / gallery */}
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

          {/* rooms */}
          {/* Entering the Castle */}
          <Text style={s.roomTitle}>Entering the Castle</Text>
          <Image source={enteringCastleImg} style={s.roomImage} resizeMode="cover" />
          <Text style={s.bodyText}>
            Had we come to storm the Castle and had got as far as the gate, we would face multiple difficulties. Already under attack from the battlements and many musket loops, we would find the entrance facing the cliff's edge, with no room for a battering ram. The entrance door would be covered by an iron grill (a 'yet'), which opened outward but was secured by a strong chain from the inside through a hole to be seen on the left.
            {"\n\n"}
            If we managed to break down the door, with its awkward yet, we would find ourselves in a confined space with a door in each wall and a 'murder hole' in the ceiling, through which deadly missiles or boiling liquid could be dropped on our heads. The door on the left leads to a store or amoury and had no access to the rest of the Castle. The door on our right leads to the staircase, but would be jammed shut with a beam of timber wedged into an alcove beside the bottom steps. We would then find that the stairs spiral to the right, giving the defender above the advantage of an unimpeded right hand.
            {"\n\n"}
            Today's visitors encounter no such difficulties, but enter the stone-floored storeroom with a narrow door at the far end leading to the guards' quarters. In the MacCarthys' time the floor would have been strewn with rushes on which the men stretched out at night, wrapped in their great cloaks for warmth.
          </Text>


          {/* Chapel, Banqueting Hall & Family Room */}
          <Text style={s.roomTitle}>Chapel, Banqueting Hall & Family Room</Text>
          <Image source={chapelHallFamilyImg} style={s.roomImage} resizeMode="cover" />
          <Text style={s.bodyText}>
            A flight of steps leads down from the parapet to the serving area
            outside the kitchen, with a view down to the room called the
            ‘Chapel and the ‘Banqueting Hall’ beneath it. When the Castle was
            first built, it is likely that what is now the ‘Chapel’ was in fact
            originally the Banqueting Hall: it is the largest of the principal
            rooms, occupying the whole floor at this level, and has the finest
            architectural treatment, with pointed arches on three walls. This
            was where the household gathered for Mass said in Latin. The
            Banqueting Hall was the heart of the social life of the Castle:
            feasting was a way of life, combining dinner with a whole night’s
            entertainment. The family room focal point is the fireplace on the
            north wall which is enormous and flanked by cut stone tablets and a
            mantle shelf running the full width of the room. On the south wall
            opposite is a rare fragment of early 17th-century plasterwork, the
            remains of a frieze that would once have decorated the walls of this
            room.
          </Text>

          {/* The Great Hall */}
          <Text style={s.roomTitle}>The Great Hall</Text>
          <Image source={greatHallImg} style={s.roomImage} resizeMode="cover" />
          <Text style={s.bodyText}>
            From the guards’ quarters a wooden staircase leads up into a vaulted
            chamber with a fine 17th- century fireplace. This is known as the
            ‘Great Hall’, the nerve-centre of Castle life, where guests were
            received and entertained.
          </Text>

          {/* The Kitchen */}
          <Text style={s.roomTitle}>The Kitchen</Text>
          <Image source={kitchenImg} style={s.roomImage} resizeMode="cover" />
          <Text style={s.bodyText}>
            The room above the ‘Priest’s Room’, perhaps once the finest bedroom,
            was converted in the 16th century into the kitchen. Here it was next
            to the original Banqueting Hall – and its position high on the top
            floor reduced the risk of fire and meant that there was a ready
            supply of boiling oil to pour from the parapet onto unwelcome
            guests.
          </Text>

          {/* Young Ladies Bedroom – Priests Room */}
          <Text style={s.roomTitle}>Young Ladies Bedroom – Priests Room</Text>
          <Image source={youngLadiesPriestsImg} style={s.roomImage} resizeMode="cover" />
          <Text style={s.bodyText}>
            The spiral staircase of the older tower leads up to the ‘Young
            Ladies’ Bedroom’, with the ‘Priest’s Room’ above it – the floor
            between them has gone. We do know that the three young daughters of
            the 14th Lord of Muskerry, Cormac McTeige MacCarthy, were brought up
            here. Their good behaviour would be assured if the traditional
            definition of the room above is correct. The lack of any gun loops,
            the space in its west window, perhaps for a small altar, and the
            shape of the window, suggest its more holy status. This room may
            even have served as a small chapel.
          </Text>

          {/* The Dungeon */}
          <Text style={s.roomTitle}>The Dungeon</Text>
          <Image source={dungeonImg} style={s.roomImage} resizeMode="cover" />
          <Text style={s.bodyText}>
            Below the lookout tower on the way up to the Castle are a dog kennel
            and sentry box guarding the entrance. A third opening in the rock
            leads to the dungeon – though we do not know whether prisoners were
            kept here. What is certain is that this contained the Castle well,
            which had to be protected but kept accessible even if the tower was
            under siege. This is also the entrance to a labyrinth of hidden
            underground passages and chambers, now inaccessible to even the most
            intrepid explorer…
          </Text>

          {/* Walls and Bawn */}
          <Text style={s.roomTitle}>Walls and Bawn</Text>
          <Image source={wallsBawnImg} style={s.roomImage} resizeMode="cover" />
          <Text style={s.bodyText}>
            Blarney Castle would have been surrounded by a defensive wall, which
            enclosed an area of about 8 acres called the ‘Bawn’. This sheltered
            both livestock and people in times of danger but was also a hive of
            activity. Here were to be found Blacksmiths, tanners, masons,
            woodcutters, carpenters, butchers, cooks and all the livestock. The
            bawn wall is long gone today but its line is followed by the stone
            wall along the Poison Garden.
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

  pageTitle: {
    fontFamily: serif,
    fontSize: 22,
    marginBottom: 10,
    color: colors.brand,
    fontWeight: "700",
  },

  bodyText: {
    fontFamily: serif,
    fontSize: 14,
    lineHeight: 20,
    color: "#123",
    marginBottom: 8,
  },

  sectionTitle: {
    fontFamily: serif,
    fontSize: 20,
    fontWeight: "400",
    marginTop: 18,
    marginBottom: 8,
    color: colors.brand,
  },

  roomTitle: {
    fontFamily: serif,
    fontSize: 15,
    fontWeight: "600",
    marginTop: 14,
    marginBottom: 8,
    color: colors.brand,
  },

  roomImage: {
    width: "100%",
    height: 170,
    borderRadius: 14,
    marginBottom: 10,
  },

  galleryRow: {
    flexDirection: "row",
    gap: 8 as any,
    marginTop: 12,
    marginBottom: 4,
  },
  galleryImage: {
    flex: 1,
    height: 120,
    borderRadius: 12,
  },
});
