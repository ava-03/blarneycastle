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
  ScrollView,
  Image,
  Pressable,
  StatusBar,
  Platform,
} from "react-native";
import { colors } from "../../../constants/colors";
import { router } from "expo-router";

// Same font 
const serif = Platform.select({
  ios: "Times New Roman",
  android: "serif",
  web: "Times New Roman, serif",
});

const experiences = [
  {
    title: "Kiss the Blarney Stone",
    paragraphs: [
      "Of course no trip to South West Ireland is complete without a visit to Blarney Castle. The origins of the Blarney Stone is steeped in myth and legend, and for over 200 years pilgrims have journeyed to Blarney to kiss the stone  and receive the gift of eloquence. Millions of visitors flock to Blarney Castle every year to continue this tradition, climbing the battlements to kiss the magical stone.",
      "There is much more to Blarney Castle than the stone, however. Visitors can step back in time and experience the fascinating history of our 15th century castle. And don’t forget, we have over 60 acres of sprawling parklands which include gardens, avenues, arboretums and waterways, offering diverse surroundings from tranquil to serene, to mystical and magical places.",
    ],
    image: require("../../../assets/images/kiss_stone.jpg"),
  },
  {
    title: "Go whale watching in West Cork",
    paragraphs: [
      "In the early 1990s, Ireland was the first European nation to declare its coast a whale and dolphin sanctuary. Since then, the south west coast has become a summer feeding ground for these marine mammals.",
      "West Cork is one of the best spots for seeing whales, dolphins and basking sharks throughout much of the year. Whale species known to visit our waters include minke, fin, humpback and long-finned pilot whales, and orcas.",
      "Photo credit: Therese Ahern.",
    ],
    image: require("../../../assets/images/whales.jpg"),
  },
  {
    title: "Fill up at The English Market",
    paragraphs: [
      "You simply can’t visit Cork without a stop at the iconic English Market. Although called the ‘English’ market, it specialises in fresh, quality, Irish fare, housing butchers, fishmongers, delis, bakers and more.",
      "The English Market has been at the heart of Cork city since the 1780s, when Ireland was a part of the British Empire. Built by the English corporation, the market was referred to as ‘the English market’ to differentiate it from the newer St Peter’s Market (known as ‘the Irish market’) built by the local government in 1840.",
      "The English market has been serving the people of Cork through famines, floods, wars and recessions, and is thriving to this day. Visitors can buy and sample some of Cork’s best produce, eat and drink at one of a selection of stalls and cafes, or simply soak up some local flavour with excellent opportunities for people watching.",
      "Photo Credit: Resolute Photography",
    ],
    image: require("../../../assets/images/eng_market.jpg"),
  },
  {
    title: "Soak up seaside charm in Kinsale",
    paragraphs: [
      "Medieval fishing port Kinsale is famous for its colourful, picturesque houses and rich history. Traditionally the first stop of the Wild Atlantic Way (a 1600 mile/ 2600 km road trip around Ireland’s west coast), Kinsale enchants visitors from around the world.",
      "Visitors to Kinsale can enjoy browsing a range of unique boutique shops, a trip to the local farmers market, a bracing walk on The Dock beach, and, of course, a meal at one of the town’s excellent eateries (Kinale is known as a ‘foodie heaven’.) For those looking to immerse themselves in some local history, Charles Fort National Monument on the edge of the town is one of the finest surviving examples of a 17th Century star-shaped fort and is open to the public daily.",
      "Photo Credit: Discover Ireland",
    ],
    image: require("../../../assets/images/kinsale.jpg"),
  },
  {
    title: "Sip a measure (or two) at the Jameson Distillery",
    paragraphs: [
      "For devotees of Irish whiskey, the Jameson distillery in Midleton is the perfect day out near Cork. Visitors on the Distillery Experience tour come face-to-face with the world’s largest pot still, enjoy a premium whiskey tasting or draw and taste whiskey straight from a cask straight in the live Maturation Warehouse.",
      "With plenty of opportunities to sample during the tour, and of course the opportunity to take home a memento from the shop, whiskey fans should leave very happy indeed.",
      "Photo Credit: Jameson Distillery",
    ],
    image: require("../../../assets/images/jameson.jpg"),
  },
  {
    title: "Take a magical dip in Lough Hyne",
    paragraphs: [
      "Located in Skibbereen, West Cork, is Europe’s only inland saltwater lake and Ireland’s first designated Marine Nature Conservation Reserve, Lough Hyne.",
      "This beautiful and serene spot is nestled between a fold of tree-lined hills and the expanse of the Atlantic ocean. Tidal flows from the ocean create a unique habitat of warm, oxygenated salt water and make this home to a diversity of marine life.",
      "Visitors can enjoy the lake from above by taking a walk through Knockomagh Woods uphill, or up-close as this is a popular destination for swimming and watersports.",
      "Kayaking trips can be booked on Lough Hyne, including night paddle excursions where you can marvel at the sparking trail of bioluminescent algae left in your boat’s wake.",
      "Photo Credit: Lukasz Warzecha",
    ],
    image: require("../../../assets/images/lough_hyne.jpg"),
  },
  {
    title: "See history come to life at Cork City Gaol",
    paragraphs: [
      "Step back in time to the 19th century and see what was like in the city of Cork, inside and outside prison walls.",
      "Housed in a magnificent, castle-like building, this interactive museum features lifelike wax figures and audio visual installations to explore the contrasting lives of real people living in Cork.",
      "Cork City Gaol is an excellent day out for visitors of all ages.",
      "Photo Credit: Cork Gaol",
    ],
    image: require("../../../assets/images/gaol.jpg"),
  },
  {
    title: "Ride the cable car to Dursey Island",
    paragraphs: [
      "Situated on the western tip of the Beara Peninsula, West Cork, is Dursey Island. Dursey island is one of the few populated islands in Beara, although its population is tiny. This remote, unspoilt, rugged landscape provides a perfect escape for those wanting to lose themselves in nature.",
      "The Island is separated from the mainland by a narrow stretch of ocean called the Dursey Sound. Visitors can reach the island via Ireland’s only cable car. First opened in 1969, the cable car carries visitors 250m above the ocean, takes just 10 minutes and offers an unrivalled view of the island on approach.",
      "Once safely on Dursey, enjoy the stunning views of the Beara peninsula by walking the island loop alone, or by taking a guided tour. A visit to Bull Rock is highly recommended, where keen birders can spot gannets, guillemots, puffins, razorbills, choughs and Manx shearwaters.",
      "Photo Credit: Tourism Ireland",
    ],
    image: require("../../../assets/images/dursey.jpg"),
  },
  {
    title: "Find sanctuary at Nano Nagle Place",
    paragraphs: [
      "Escape the hustle and bustle of Cork by ducking into Nano Nagle place, an ‘unexpected oasis’ in the heart of the city.",
      "This restored walled convent is now a visitor attraction dedicated to the life and work of Nano Nagel, an inspiring woman who dedicated her life in service to the poor in 18th century Cork. Within her lifetime, Nano had opened seven schools for poor children across Cork city, founded an almshouse for poor women, and most notably, founded the Presentation Order, who continue her education and social inclusion work today.",
      "Nano Nagel Place invites visitors to learn about Nano’s extraordinary life at their state of the heritage centre. You can also soak up the peaceful beauty of the convent’s hidden gardens and graveyard, and enjoy a delicious (and sustainable) meal at the garden terrace cafe, Good Day Deli.",
      "Photo Credit: Nano Nagle Place",
    ],
    image: require("../../../assets/images/nano_nagle.png"),
  },
  {
    title: "Marvel at Mizen Head",
    paragraphs: [
      "If you want to feel awe-struck by the raw power of nature, take a trip to Ireland’s most southwestery point, Mizen Head. Jutting into the edge of the north east Atlantic, Mizen Head is characterised by dramatic cliffs, pounding waves, ancient rocks and ocean views.",
      "A typical trip to Mizen Head includes a journey to its famous lighthouse (dating back to 1910). This involves passing through the Visitor Centre, which includes a detailed exhibition on the history of the lighthouse and challenging lives of its lighthouse keepers. Next, is a trip across Mizen’s iconic steel suspension bridge, 300 meters above the swirling Atlantic. Brave adventures are rewarded when they reach the other side by a breathtaking panorama offered by the heights of the south-western coast as they proceed to the lighthouse itself. If you’re lucky, you may also catch sight of whales and dolphins known to frequent these waters in the summer months.",
      "Mizen Head visitors centre and cafe is open daily from April to October, and at weekends November- March.",
      "Photo Credits: Mizen Head",
    ],
    image: require("../../../assets/images/mizen_head.jpg"),
  },
];

export default function ExperiencesCorkScreen() {
  const HEADER_HEIGHT = Platform.select({ web: 120, default: 88 });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.brand }}>
      <StatusBar barStyle="light-content" />

      {/* Header – back button + title + logo */}
      <View style={[s.header, { height: HEADER_HEIGHT }]}>
        <Pressable
          style={s.headerSide}
          onPress={() => router.back()}
          accessibilityLabel="Go back to Information"
        >
          <Text style={s.backText}>‹</Text>
        </Pressable>

        <View style={s.titleContainer}>
          <Text style={s.headerTitle}>EXPERIENCES</Text>
          <Text style={s.headerSubtitle}>IN CORK</Text>
        </View>

        <View style={s.headerSide}>
          <Image
            source={require("../../../assets/images/blarney-logo2.png")}
            style={s.logo}
            resizeMode="contain"
          />
        </View>
      </View>

      <ScrollView style={s.body} contentContainerStyle={s.bodyInner}>
        {experiences.map((exp) => (
          <View key={exp.title} style={s.card}>
            <View style={s.cardContent}>
              <Text style={s.cardTitle}>{exp.title}</Text>

              <Image
                source={exp.image}
                style={s.cardImage}
                resizeMode="cover"
              />

              {exp.paragraphs.map((p, idx) => (
                <Text key={idx} style={s.cardText}>
                  {p}
                </Text>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  // header 
  header: {
    backgroundColor: colors.brand,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  headerSide: {
    width: 66,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  backText: {
    color: colors.textLight,
    fontFamily: serif,
    fontSize: 28,
  },
  logo: {
    width: Platform.select({ web: 72, default: 70 }),
    height: Platform.select({ web: 72, default: 74 }),
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: colors.textLight,
    fontSize: Platform.select({ web: 24, default: 20 }),
    fontWeight: "800",
    textAlign: "center",
    fontFamily: serif,
    lineHeight: Platform.select({ web: 30, default: 26 }),
  },
  headerSubtitle: {
    color: colors.textLight,
    fontSize: Platform.select({ web: 24, default: 20 }),
    fontWeight: "800",
    textAlign: "center",
    fontFamily: serif,
    marginTop: Platform.select({ web: -2, default: -2 }),
    letterSpacing: 0.5,
  },

  body: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  bodyInner: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 36,
  },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    marginBottom: 18,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontFamily: serif,
    fontSize: 18,
    fontWeight: "700",
    color: colors.brand,
    marginBottom: 10,
  },
  cardImage: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginBottom: 10,
  },
  cardText: {
    fontFamily: serif,
    fontSize: 14,
    lineHeight: 20,
    color: "#123",
    marginBottom: 6,
  },
});
