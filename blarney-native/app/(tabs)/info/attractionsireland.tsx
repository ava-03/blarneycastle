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
  ScrollView,
  Image,
  StyleSheet,
  Pressable,
  StatusBar,
  Platform,
} from "react-native";
import { colors } from "../../../constants/colors";
import { router, type Href } from "expo-router";

const serif = Platform.select({
  ios: "Times New Roman",
  android: "serif",
  web: "Times New Roman, serif",
});


const attractions = [
  {
    title: "Brú na Bóinne, County Meath",
    paragraphs: [
      "UNESCO World Heritage Site of Brú na Bóinne contains over 90 Neolithic monuments dotted across the River Boyne Valley, including Ireland’s most famous Neolithic site Newgrange passage tomb. Brú na Bóinne is among the most important Neolithic sites in the world and contains the largest collection of megalithic art in Western Europe. These sacred sites date back over 5,000 years to approximately 3,200 B.C. That makes it older than Stonehenge and the Pyramids.",
      "Any visit to Newgrange must start at the Brú na Bóinne Visitor Centre. Here you can learn all about the history of the site in an interactive exhibit which explores Neolithic culture, landscape and monuments. Standing 80-metres high and encircled by painstakingly engraved white stones, the mound of Newgrange is a sight to behold, and once looked like a natural extension of the green countryside, and alien from it.",
      "The most famous attraction is the roof box, which aligns with the rising sun on the winter solstice (21st December) filling the chamber with sunlight. Very few people are able to witness this sacred event, with a lucky few chosen by lottery each year, but the rest of us can at least experience the next best thing with artificial lighting. Pre-booking tickets is essential when visiting Brú na Bóinne.",
      "Photo Credit: Tourism Ireland",
    ],
    image: require("../../../assets/images/newgrange.jpg"),
  },
  {
    title: "Glendalough Monastery, County Wicklow",
    paragraphs: [
      "Glendalough monastery is situated within Wicklow Mountains National Park, the largest national park in Ireland, covering over 129,500 square kilometers. The park is well worth a visit, boasting mountains (as the name implies), verdant forests, the Glendalough glacial lake and, of course, the Glendalough monastic site.",
      "Nestled in the Glendalough valley and surrounded by the protective walls of the Wicklow mountains, the monastic site was founded in the early 6th century by the hermit monk, St Kevin, who sought a place for peaceful, religious reflection. The monastery ran successfully for over 900 years. Today, pilgrims can see the ruins of the ancient monastic site scattered throughout this stunning valley, many dating back almost 1000 years.",
      "The most famous landmark is probably the round tower, standing 112 feet high with a base measuring 52 feet in circumference. Steeped in monastic history, Glendalough remains a special place for peaceful reflection and contemplation of the profound beauty of this pristine natural landscape.",
      "Photo credit: Failte Ireland",
    ],
    image: require("../../../assets/images/glendalough.jpg"),
  },
  {
    title: "Rock of Cashel, County Tipperary",
    paragraphs: [
      "The Rock of Cashel, also known as St Patrick’s Rock and The Cashel of the Kings, is one of Ireland’s most visited historical attractions.",
      "The seat of the High Kings of Munster, Cashel was built between the 12th and 13th centuries. The legend goes that St Patrick visited in 432 A.D. to convert and baptize King Aengus. This large, imposing fortress looks down on the beautiful surroundings of Cashel’s rolling hills and distant mountains, providing many magnificent views and excellent photo opportunities.",
      "Visitors today can explore alone or take a guided tour of Cashel’s ruins including the cathedral, chapel and graveyard, and learn about this historical landmark’s role in the story of Ireland and of early Christianity.",
      "Cashel is also home to one of Europe’s most significant collections of Celtic art and medieval architecture.",
      "Photo Credit: Tipperary Tourism"
    ],
    image: require("../../../assets/images/rock_of_cashel.jpg"),
  },
  {
    title: "Trinity College, Dublin City",
    paragraphs: [
      "Founded by Queen Elizabeth I in 1592, Trinity College is Ireland’s oldest university. Some of Ireland’s finest minds received their education at Trinity, including Jonathan Swift, Oscar Wilde and Samuel Beckett.",
      "Visitors can stroll around the beautiful campus, admire the beautiful architecture of the quads, arches and spires, and truly feel like they’ve taken a step back in time when passing from the busy Dublin high street through the university’s stone entranceway. The main attraction for most visitors is the iconic Long Room library. Said to be the inspiration for the library in Harry Potter, the Long Room is filled from floor to ceiling with row upon row of leather-bound books.",
      "The university is also the home of the Book of Kells, a priceless 9th-century illuminated manuscript, which visitors can learn about and witness first-hand in a special display.",
      "Photo Credit: James Bowden",
    ],
    image: require("../../../assets/images/trinity.jpg"),
  },
];

export default function AttractionsIrelandScreen() {
  const HEADER_HEIGHT = Platform.select({ web: 120, default: 88 });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.brand }}>
      <StatusBar barStyle="light-content" />

      {/* Header with back button */}
      <View style={[s.header, { height: HEADER_HEIGHT }]}>
        <Pressable
          style={s.headerSide}
          onPress={() => router.push("/info" as Href)}
          accessibilityLabel="Go back to Information"
        >
          <Text style={s.backText}>‹</Text>
        </Pressable>

        <View style={s.titleContainer}>
          <Text style={s.headerTitle}>HISTORICAL</Text>
          <Text style={s.headerSubtitle}>ATTRACTIONS</Text>
        </View>

        <View style={s.headerSide}>
          <Image
            source={require("../../../assets/images/blarney-logo2.png")}
            style={s.logo}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Content scroll */}
      <ScrollView style={s.body} contentContainerStyle={s.bodyInner}>
        {attractions.map((a) => (
          <View key={a.title} style={s.card}>
            <View style={s.cardContent}>
              <Text style={s.cardTitle}>{a.title}</Text>

              <Image
                source={a.image}
                style={s.cardImage}
                resizeMode="cover"
              />

              {a.paragraphs.map((p, i) => (
                <Text key={i} style={s.cardText}>
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
// styles
const s = StyleSheet.create({
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
    fontSize: 32,
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
    fontSize: Platform.select({ web: 28, default: 25 }),
    fontWeight: "800",
    textAlign: "center",
    fontFamily: serif,
  },
  headerSubtitle: {
    color: colors.textLight,
    fontSize: Platform.select({ web: 28, default: 25 }),
    fontWeight: "800",
    textAlign: "center",
    fontFamily: serif,
    marginTop: -2,
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
