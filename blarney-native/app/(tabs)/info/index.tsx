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
import { router, type Href } from "expo-router";

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
              Details of admission tickets, family passes and concessions will
              go here. You can also highlight seasonal offers or peak/off-peak
              pricing.
            </Text>
            <Text style={[s.bodyText, s.bodyLink]}>
              https://blarneycastle.retailint-tickets.com/Event/GENERALADM
            </Text>
          </AccordionPill>

          {/* Opening Times */}
          <AccordionPill
            title="OPENING TIMES"
            open={openSection === "opening"}
            onPress={() => toggleSection("opening")}
          >
            <Text style={s.bodyText}>
              Outline standard opening hours, last admission times and any
              seasonal variations. Note if times change for special events or
              weather.
            </Text>
          </AccordionPill>

          {/* FAQ’s */}
          <AccordionPill
            title="FAQ's"
            open={openSection === "faqs"}
            onPress={() => toggleSection("faqs")}
          >
            <Text style={s.bodyText}>
              Add answers to the most common questions visitors ask staff:
              ticket changes, accessibility, facilities, pets and more.
            </Text>
          </AccordionPill>

          {/* Shopping */}
          <AccordionPill
            title="SHOPPING"
            open={openSection === "shopping"}
            onPress={() => toggleSection("shopping")}
          >
            <Text style={s.bodyText}>
              Information about gift shops, Irish crafts, souvenirs and where
              they are located on-site.
            </Text>
          </AccordionPill>

          {/* Dining */}
          <AccordionPill
            title="DINING"
            open={openSection === "dining"}
            onPress={() => toggleSection("dining")}
          >
            <Text style={s.bodyText}>
              Describe cafés, restaurants, menus, dietary options and opening
              hours. You can also note busy times during the day.
            </Text>
          </AccordionPill>

          {/* About with sub-pages */}
          <AccordionPill
            title="ABOUT"
            open={openSection === "about"}
            onPress={() => toggleSection("about")}
          >
            <Text style={s.bodyText}>
              Learn more about the history and stories behind Blarney Castle,
              the Blarney Stone and Blarney House.
            </Text>

            <Pressable
            style={s.subButton}
            onPress={() => router.push("castle" as Href)}
          >
            <Text style={s.subButtonText}>Blarney Castle</Text>
          </Pressable>

          <Pressable
            style={s.subButton}
            onPress={() => router.push("stone" as Href)}
          >
            <Text style={s.subButtonText}>Blarney Stone</Text>
          </Pressable>

          <Pressable
            style={s.subButton}
            onPress={() => router.push("house" as Href)}
          >
            <Text style={s.subButtonText}>Blarney House</Text>
          </Pressable>
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
              Explain car park locations, any charges, accessible parking and
              advice for busy days or peak seasons.
            </Text>
          </AccordionPill>

          {/* Directions & Travel Information */}
          <AccordionPill
            title="DIRECTIONS & TRAVEL INFORMATION"
            open={openSection === "directions"}
            onPress={() => toggleSection("directions")}
          >
            <Text style={s.bodyText}>
              Provide directions by car, public transport and tour coach, plus
              approximate journey times from Cork and other key locations.
            </Text>
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
            <Text style={s.bodyText}>
              Share suggestions for other attractions, food, culture and walks
              in Cork that visitors might enjoy before or after Blarney.
            </Text>
          </AccordionPill>

          {/* Historical Attractions in Ireland */}
          <AccordionPill
            title="HISTORICAL ATTRACTIONS IN IRELAND"
            open={openSection === "history"}
            onPress={() => toggleSection("history")}
          >
            <Text style={s.bodyText}>
              Highlight other castles, heritage sites and historical attractions
              around Ireland that history lovers might want to explore.
            </Text>
          </AccordionPill>

          {/* Say Hello */}
          <AccordionPill
            title="SAY HELLO"
            open={openSection === "hello"}
            onPress={() => toggleSection("hello")}
          >
            <Text style={s.bodyText}>
              Provide contact details, social media links or a friendly message
              encouraging visitors to share feedback and photos from their day.
            </Text>
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
});
