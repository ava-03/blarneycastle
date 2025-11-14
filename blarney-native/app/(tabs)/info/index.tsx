import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Pressable,
  StatusBar,
  Platform,
  Image,
  ScrollView,
} from "react-native";
import { colors } from "../../../constants/colors";
import SlideMenu from "../../../components/slidemenu";
import { router, type Href, Link } from "expo-router";

const serif = Platform.select({
  ios: "Times New Roman",
  android: "serif",
  web: "Times New Roman, serif",
});

type SectionId =
  | "tickets"
  | "opening"
  | "faqs"
  | "shopping"
  | "dining"
  | "about"
  | "weather"
  | "parking"
  | "directions"
  | "safety"
  | "cork"
  | "history"
  | "hello";

export default function InfoScreen() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSection, setOpenSection] = useState<SectionId | null>(null);
  const HEADER_HEIGHT = 88;

  const toggleSection = (id: SectionId) => {
    setOpenSection((prev) => (prev === id ? null : id));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.brand }}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={[s.header, { height: HEADER_HEIGHT }]}>
        <Pressable
          onPress={() => setMenuOpen(true)}
          style={s.headerSide}
          accessibilityLabel="Open menu"
        >
          <View style={s.burger}>
            <View style={s.line} />
            <View style={s.line} />
            <View style={s.line} />
          </View>
        </Pressable>

        <Text style={s.headerText}>INFORMATION</Text>

        <View style={s.headerSide}>
          <Image
            source={require("../../../assets/images/blarney-logo2.png")}
            style={s.logo}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Main content */}
      <View style={s.contentWrapper}>
        <ScrollView
          contentContainerStyle={s.scrollInner}
          showsVerticalScrollIndicator={false}
        >
          <Text style={s.pageTitle}>INFORMATION</Text>

          {/* Tickets & Prices */}
          <AccordionPill
            title="TICKETS & PRICES"
            open={openSection === "tickets"}
            onPress={() => toggleSection("tickets")}
          >
            <Text style={s.bodyText}>
              Buy tickets in advance online or at our ticket office on arrival.
            </Text>

            <View style={{ marginTop: 12 }}>
              <View style={s.priceRow}>
                <Text style={s.priceLabel}>Adult Admission</Text>
                <Text style={s.priceValue}>€23</Text>
              </View>
              <View style={s.priceRow}>
                <Text style={s.priceLabel}>Student / Seniors (65+)</Text>
                <Text style={s.priceValue}>€18</Text>
              </View>
              <View style={s.priceRow}>
                <Text style={s.priceLabel}>
                  Children 6–16 (5 & under free, with adult)
                </Text>
                <Text style={s.priceValue}>€11</Text>
              </View>
              <View style={s.priceRow}>
                <Text style={s.priceLabel}>Family (2 adults + 2 children)</Text>
                <Text style={s.priceValue}>€60</Text>
              </View>
            </View>

            <Text style={[s.bodyText, { marginTop: 10, fontSize: 14 }]}>
              Children under 16 must be accompanied by an adult.{"\n"}
              Valid student I.D. is required.
            </Text>

            <Link
              href="https://blarneycastle.retailint-tickets.com/Event/GENERALADM"
              style={[
                s.bodyText,
                {
                  marginTop: 12,
                  color: "#EA9627", // deep brand-friendly blue
                  textDecorationLine: "underline",
                  fontWeight: "600",
                },
              ]}
            >
              Book Tickets
            </Link>
          </AccordionPill>


          {/* Opening Times */}
          <AccordionPill
            title="OPENING TIMES"
            open={openSection === "opening"}
            onPress={() => toggleSection("opening")}
          >
            <Text style={s.bodyText}>
              Opening hours and last admission times vary slightly throughout the year.
            </Text>

            <View style={{ marginTop: 12 }}>
              <View style={s.priceRow}>
                <Text style={s.priceLabel}>Jan / Feb / Mar</Text>
                <Text style={s.priceValue}>9.00am – 5.00pm (Last entry 4.00pm)</Text>
              </View>
              <View style={s.priceRow}>
                <Text style={s.priceLabel}>Apr</Text>
                <Text style={s.priceValue}>9.00am – 5.30pm (Last entry 4.30pm)</Text>
              </View>
              <View style={s.priceRow}>
                <Text style={s.priceLabel}>May – Sep</Text>
                <Text style={s.priceValue}>9.00am – 6.00pm (Last entry 5.00pm)</Text>
              </View>
              <View style={s.priceRow}>
                <Text style={s.priceLabel}>Oct</Text>
                <Text style={s.priceValue}>9.00am – 5.30pm (Last entry 4.30pm)</Text>
              </View>
              <View style={s.priceRow}>
                <Text style={s.priceLabel}>Nov / Dec</Text>
                <Text style={s.priceValue}>9.00am – 5.00pm (Last entry 4.00pm)</Text>
              </View>
            </View>

            <Text style={[s.bodyText, { marginTop: 20, fontSize: 17 }]}>
              24 & 25 December: Closed
            </Text>
            <Text style={[s.bodyText, { fontSize: 17 }]}>
              26 December & 1 January: 10.00am – 5.00pm (Last entry 4.00pm)
            </Text>
          </AccordionPill>


          {/* FAQ’s */}
          <AccordionPill
            title="FAQ'S"
            open={openSection === "faqs"}
            onPress={() => toggleSection("faqs")}
          >
            <View>
              {[
                [
                  "Do you have to buy tickets online?",
                  "No, tickets can be bought online or on arrival at our ticket office.",
                ],
                [
                  "Do you have timed slots?",
                  "No, we do not have timed slots. You can visit any time during our opening hours.",
                ],
                [
                  "Do you accept credit cards?",
                  "Yes, we accept Visa and Mastercard.",
                ],
                [
                  "How long does a visit take?",
                  "To explore the Castle and 100 acres of gardens, we recommend at least 3 hours.",
                ],
                [
                  "Do you have guide maps available?",
                  "Maps are available in English, French, German, Spanish, Italian and Chinese. Please ask our staff if you require a map other than English.",
                ],
                [
                  "Do you have a café on site?",
                  "Yes, we have a café (no. 8 on the map) and a coffee hut just inside the entrance.",
                ],
                [
                  "Are the Castle & Gardens wheelchair accessible?",
                  "The Castle is not accessible but a portion of the grounds and gardens are. If you have a disability, please alert our staff as there is no charge for entry.",
                ],
                [
                  "Is a student/college I.D. required?",
                  "Yes, a valid student ID is required to purchase a student ticket.",
                ],
                [
                  "What age qualifies for a child ticket?",
                  "Anyone aged 6–16.",
                ],
                [
                  "Can children kiss the Stone?",
                  "Yes, but children under the age of 8 are at the discretion of the staff member.",
                ],
                [
                  "Are dogs allowed?",
                  "No. Dogs are not allowed in the Castle & Gardens except for guide dogs/assistance dogs.",
                ],
                [
                  "Are bicycles allowed?",
                  "No, bicycles, scooters, roller blades or ball games are not allowed within the park.",
                ],
                [
                  "Can you fly drones?",
                  "No. As a private estate, drones are not permitted.",
                ],
                [
                  "Are tickets refundable?",
                  "Tickets are non-refundable, but we can offer a change of date.",
                ],
                [
                  "Do you have a car park on site?",
                  "Yes. Parking is a €2 flat fee for the duration of your visit. The car park closes at our designated closing time; vehicles released after this incur a €50 penalty. No overnight parking.",
                ],
                [
                  "Which bus do I take back to Cork?",
                  "The 215 bus leaves from outside the church just off Blarney Square. Please check the latest timetables on the Bus Éireann website.",
                ],
              ].map(([q, a]) => (
                <View key={q} style={s.qaBlock}>
                  <Text style={s.question}>Q. {q}</Text>
                  <Text style={s.answer}>A. {a}</Text>
                </View>
              ))}
            </View>
          </AccordionPill>


          {/* Shopping */}
          <AccordionPill
            title="SHOPPING"
            open={openSection === "shopping"}
            onPress={() => toggleSection("shopping")}
          >
            <Text style={s.bodyText}>
              Bring the charm of Blarney to your home. Explore Irish gifts, meaningful keepsakes
              and exclusive Blarney Castle souvenirs in our on-site shops or online.
            </Text>
            <Link
              href="https://blarneycastle.ie/shop/"
              style={[
                s.bodyText,
                {
                  marginTop: 10,
                  color: "#EA9627",           
                  textDecorationLine: "underline",
                  fontWeight: "600",
                },
              ]}
            >
              Shop – Blarney Castle
            </Link>
          </AccordionPill>


          {/* Dining */}
          <AccordionPill
            title="DINING"
            open={openSection === "dining"}
            onPress={() => toggleSection("dining")}
          >
            <Text style={s.bodyText}>
              Enjoy a bite to eat at the Stable Yard Café, located at no.8 on the map,
              or grab a quick drink and snack from our coffee hut just inside the
              entrance.
            </Text>
          </AccordionPill>


          {/* ABOUT */}
          <AccordionPill
            title="ABOUT"
            open={openSection === "about"}
            onPress={() => toggleSection("about")}
          >
            <Text style={s.bodyText}>
              Learn more about the history and stories behind Blarney Castle,
              the Blarney Stone and Blarney House.
            </Text>

            <Link href="/info/castle" asChild>
              <Pressable style={s.subButton}>
                <Text style={s.subButtonText}>Blarney Castle</Text>
              </Pressable>
            </Link>

            <Link href="/info/stone" asChild>
              <Pressable style={s.subButton}>
                <Text style={s.subButtonText}>Blarney Stone</Text>
              </Pressable>
            </Link>

            <Link href="/info/house" asChild>
              <Pressable style={s.subButton}>
                <Text style={s.subButtonText}>Blarney House</Text>
              </Pressable>
            </Link>
          </AccordionPill>


          {/* Weather placeholder */}
          <AccordionPill
            title="WEATHER"
            open={openSection === "weather"}
            onPress={() => toggleSection("weather")}
          >
            <Text style={s.bodyText}>
              Local weather information will appear here in a future update. For
              now, please check your preferred weather app or website before
              visiting.
            </Text>
          </AccordionPill>

          {/* Parking */}
          <AccordionPill
            title="PARKING"
            open={openSection === "parking"}
            onPress={() => toggleSection("parking")}
          >
            <Text style={s.bodyText}>
              Our main car park is located just beyond the entrance barrier, with disabled
              spaces available.
            </Text>
            <Text style={[s.bodyText, { marginTop: 8 }]}>
              Parking is a simple €2 flat fee for the duration of your visit.
            </Text>
            <Text style={[s.bodyText, { marginTop: 8 }]}>
              Please note that the car park closes at our designated closing time.
              Vehicles released after this will incur a €50 penalty. Overnight parking is
              not permitted.
            </Text>
          </AccordionPill>


          {/* Directions & Travel Information */}
          <AccordionPill
            title="DIRECTIONS & TRAVEL INFORMATION"
            open={openSection === "directions"}
            onPress={() => toggleSection("directions")}
          >
            <Text style={s.bodyText}>
              Blarney Castle is situated in Blarney Village, 8 km northwest of Cork city
              in the south of Ireland.
            </Text>

            <Text style={s.subHeading}>From Cork Airport</Text>
            <View>
              {[
                "From the airport follow signs for Cork City Centre.",
                "From the city centre follow signs for Limerick (N20).",
                "Travel for approximately 7 km and exit left, signposted Blarney.",
                "Arrive in Blarney Village.",
              ].map((t) => (
                <View key={t} style={s.bulletRow}>
                  <Text style={s.bulletDot}>•</Text>
                  <Text style={s.bulletText}>{t}</Text>
                </View>
              ))}
            </View>

            <Text style={s.subHeading}>From Shannon</Text>
            <View>
              <View style={s.bulletRow}>
                <Text style={s.bulletDot}>•</Text>
                <Text style={s.bulletText}>
                  By car: follow the road to Limerick, then signs for Mallow and take the
                  turn-off for Blarney before Cork City.
                </Text>
              </View>
              <View style={s.bulletRow}>
                <Text style={s.bulletDot}>•</Text>
                <Text style={s.bulletText}>
                  By bus: there is a direct bus from Shannon Airport to Cork City (see
                  Bus Éireann for up-to-date timetables).
                </Text>
              </View>
            </View>

            <Text style={s.subHeading}>From Dublin</Text>
            <View>
              <View style={s.bulletRow}>
                <Text style={s.bulletDot}>•</Text>
                <Text style={s.bulletText}>
                  By car: it takes around 3–4 hours. Take the N8 motorway south towards
                  Cork, then follow signs for Blarney.
                </Text>
              </View>
              <View style={s.bulletRow}>
                <Text style={s.bulletDot}>•</Text>
                <Text style={s.bulletText}>
                  By train: regular services run from Dublin to Cork (see Irish Rail for
                  timetables), then connect to Blarney by bus or taxi.
                </Text>
              </View>
              <View style={s.bulletRow}>
                <Text style={s.bulletDot}>•</Text>
                <Text style={s.bulletText}>
                  Aircoach also runs buses from Dublin Airport to Cork; journey times vary
                  depending on traffic.
                </Text>
              </View>
            </View>
          </AccordionPill>


          {/* Safety */}
          <AccordionPill
            title="SAFETY"
            open={openSection === "safety"}
            onPress={() => toggleSection("safety")}
          >
            <Text style={s.bodyText}>
              Outline important safety advice: uneven paths, steep steps,
              slippery surfaces in wet weather and supervision of children.
            </Text>
          </AccordionPill>

          {/* Experiences in Cork */}
          <AccordionPill
            title="EXPERIENCES IN CORK"
            open={openSection === "cork"}
            onPress={() => toggleSection("cork")}
          >
            <Text style={s.bodyText}>10 experiences not to miss in Cork:</Text>
            {[
              "Kiss the Blarney Stone.",
              "Go whale watching in West Cork.",
              "Fill up at The English Market.",
              "Soak up seaside charm in Kinsale.",
              "Sip a measure (or two) at the Jameson Distillery.",
              "Take a magical dip in Lough Hyne.",
              "See history come to life at Cork City Gaol.",
              "Take an unforgettable ride to Dursey Island.",
              "Find sanctuary at Nano Nagle Place.",
              "Marvel at the dramatic scenery of Mizen Head.",
            ].map((t) => (
              <View key={t} style={s.bulletRow}>
                <Text style={s.bulletDot}>•</Text>
                <Text style={s.bulletText}>{t}</Text>
              </View>
            ))}
          </AccordionPill>


          {/* Historical Attractions in Ireland */}
          <AccordionPill
            title="HISTORICAL ATTRACTIONS IN IRELAND"
            open={openSection === "history"}
            onPress={() => toggleSection("history")}
          >
            <Text style={s.bodyText}>
              Ireland is a place like no other. Visitors come from around the world to
              experience our rich and ancient culture, dramatic scenery and captivating
              history.
            </Text>

            <Text style={[s.bodyText, { marginTop: 8 }]}>
              A few notable historical attractions include:
            </Text>

            {[
              "Brú na Bóinne, County Meath",
              "Glendalough Monastery, County Wicklow",
              "Rock of Cashel, County Tipperary",
              "Trinity College, Dublin City",
            ].map((t) => (
              <View key={t} style={s.bulletRow}>
                <Text style={s.bulletDot}>•</Text>
                <Text style={s.bulletText}>{t}</Text>
              </View>
            ))}
          </AccordionPill>


          {/* Say Hello */}
          <AccordionPill
            title="SAY HELLO"
            open={openSection === "hello"}
            onPress={() => toggleSection("hello")}
          >
            {/* Phone */}
            <Link
              href="tel:+353214385252"
              style={s.link}
            >
              Phone – 00 353 21 438 5252
            </Link>

            {/* Email */}
            <Link
              href="mailto:info@blarneycastle.ie"
              style={s.link}
            >
              Email – info@blarneycastle.ie
            </Link>

            {/* Facebook */}
            <Link
              href="https://www.facebook.com/blarneycastleireland"
              style={s.link}
            >
              Facebook – Blarney Castle and Gardens
            </Link>

            {/* Instagram */}
            <Link
              href="https://www.instagram.com/blarneycastleandgardens/"
              style={s.link}
            >
              Instagram – @blarneycastleandgardens
            </Link>

            {/* X / Twitter */}
            <Link
              href="https://x.com/blarney_castle"
              style={s.link}
            >
              X – @blarneycastle
            </Link>

            {/* YouTube */}
            <Link
              href="https://www.youtube.com/@theblarneycastle"
              style={s.link}
            >
              YouTube – Blarney Castle & Gardens
            </Link>

            {/* TripAdvisor */}
            <Link
              href="https://www.tripadvisor.co.uk/Attraction_Review-g186599-d214817-Reviews-Blarney_Castle_Gardens-Blarney_Cork_County_Cork.html"
              style={s.link}
            >
              TripAdvisor – Blarney Castle & Gardens Reviews
            </Link>
          </AccordionPill>


        </ScrollView>
      </View>

      {/* Slide-out menu */}
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

function AccordionPill({
  title,
  open,
  onPress,
  children,
}: {
  title: string;
  open: boolean;
  onPress: () => void;
  children: React.ReactNode;
}) {
  return (
    <View style={s.section}>
      <Pressable style={s.pill} onPress={onPress}>
        <Text style={s.pillText}>{title}</Text>
        <Text style={s.pillIcon}>{open ? "▲" : "▼"}</Text>
      </Pressable>
      {open && <View style={s.content}>{children}</View>}
    </View>
  );
}

const s = StyleSheet.create({
  header: {
    backgroundColor: colors.brand,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },
  headerSide: {
    width: 40,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    color: colors.textLight,
    fontSize: 28,
    fontWeight: "800",
    fontFamily: serif,
    flex: 1,
    textAlign: "center",
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
    backgroundColor: colors.textLight,
    borderRadius: 2,
  },
  logo: {
    width: Platform.select({ web: 62, default: 74 }),
    height: Platform.select({ web: 62, default: 74 }),
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollInner: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },
  pageTitle: {
    fontFamily: serif,
    fontSize: 32,
    textAlign: "center",
    marginBottom: 25,
    color: colors.brand,
  },
  section: {
    marginBottom: 12,
  },
  pill: {
    backgroundColor: colors.brand,
    borderRadius: 999,
    paddingVertical: 25,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  pillText: {
    color: colors.textLight,
    fontFamily: serif,
    fontSize: 22,
    flex: 1,
    textAlign: "center",
  },
  pillIcon: {
    color: colors.textLight,
    fontSize: 16,
    width: 20,
    textAlign: "right",
  },
  content: {
    marginTop: 8,
    borderRadius: 16,
    padding: 16,
    backgroundColor: "#e5f2ef",
  },
  bodyText: {
    fontFamily: serif,
    fontSize: 18,
    lineHeight: 20,
    color: "#123",
  },
  bodyLink: {
    marginTop: 8,
    textDecorationLine: "underline",
  },
  subButton: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: colors.brand,
    alignSelf: "flex-start",
  },
  subButtonText: {
    color: colors.textLight,
    fontFamily: serif,
    fontSize: 14,
  },
  subHeading: {
    fontFamily: serif,
    fontSize: 15,
    fontWeight: "600",
    marginTop: 8,
    marginBottom: 4,
    color: colors.brand,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  priceLabel: {
    fontFamily: serif,
    fontSize: 14,
    color: "#123",
  },
  priceValue: {
    fontFamily: serif,
    fontSize: 14,
    fontWeight: "600",
    color: "#123",
  },
  qaBlock: {
    marginBottom: 10,
  },
  question: {
    fontFamily: serif,
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 2,
  },
  answer: {
    fontFamily: serif,
    fontSize: 14,
    lineHeight: 20,
    color: "#123",
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  bulletDot: {
    fontSize: 14,
    lineHeight: 20,
    marginRight: 6,
  },
  bulletText: {
    flex: 1,
    fontFamily: serif,
    fontSize: 14,
    lineHeight: 20,
    color: "#123",
  },
  inlineLink: {
    textDecorationLine: "underline",
  },
  contactRow: {
    marginBottom: 6,
  },
  contactLabel: {
    fontFamily: serif,
    fontWeight: "600",
    fontSize: 14,
  },
  contactValue: {
    fontFamily: serif,
    fontSize: 14,
  },
  link: {
  fontSize: 16,
  marginTop: 8,
  color: "#EA9627",              
  textDecorationLine: "underline",
  fontFamily: serif,            
},
});
