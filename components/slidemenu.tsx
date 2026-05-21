import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";

// If you already use expo, this is easiest.
// If not, tell me what icon library you’re using and I’ll swap it.
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSelect: (label: string) => void;
  activeKey?: string; // optional: highlight the current page
};

const serif = Platform.select({
  ios: "Times New Roman",
  android: "serif",
  web: "Times New Roman, serif",
});

const { width: SCREEN_W } = Dimensions.get("window");
const PANEL_W = Math.min(0.86 * SCREEN_W, 330);

const COLORS = {
  bg: "#0f584d", // your brand green
  text: "#ffffff",
  backdrop: "rgba(0,0,0,0.35)",
  divider: "rgba(255,255,255,0.22)",
  itemPressed: "rgba(255,255,255,0.08)",
  active: "rgba(255,255,255,0.10)",
};

const HEADER_HEIGHT = 110;

export default function SlideMenu({
  visible,
  onClose,
  onSelect,
  activeKey,
}: Props) {
  if (!visible) return null;

  const MENU_ITEMS: Array<{ key: string; label: string; icon: any }> = [
    { key: "HOME", label: "Home", icon: "home-outline" },
    { key: "NAVIGATION", label: "Map", icon: "map-outline" },
    { key: "INFO", label: "Visitor Information", icon: "information-outline" },
    { key: "PHOTOS", label: "Photos", icon: "camera-outline" },
  ];

  return (
    <Pressable style={styles.backdrop} onPress={onClose}>
      <Pressable style={styles.panel} onPress={(e) => e.stopPropagation()}>
        <Text style={styles.title}>Menu</Text>
        <View style={styles.titleDivider} />

        {MENU_ITEMS.map(({ key, label, icon }, idx) => {
          const isActive = activeKey === key;

          return (
            <View key={key}>
              <Pressable
                onPress={() => {
                  onSelect(key);
                  onClose();
                }}
                style={({ pressed }) => [
                  styles.item,
                  isActive && styles.itemActive,
                  pressed && styles.itemPressed,
                ]}
                accessibilityRole="button"
                accessibilityLabel={label}
              >
                <MaterialCommunityIcons
                  name={icon}
                  size={22}
                  color={COLORS.text}
                  style={styles.icon}
                />
                <Text style={styles.itemText}>{label}</Text>
              </Pressable>

              {/* Divider line between items (not after last) */}
              {idx < MENU_ITEMS.length - 1 && <View style={styles.divider} />}
            </View>
          );
        })}
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: COLORS.backdrop,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },

  panel: {
    marginTop: HEADER_HEIGHT + 16,
    marginLeft: 12,
    width: PANEL_W,

    // 👇 makes it “short” like your current one
    alignSelf: "flex-start",

    backgroundColor: COLORS.bg,
    borderRadius: 14,

    paddingTop: 14,
    paddingBottom: 10,
    paddingHorizontal: 18,

    // subtle depth (optional, but helps a lot)
    shadowColor: "#000",
    shadowOpacity: 0.22,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },

  title: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: 0.5,
    fontFamily: serif,
    textTransform: "uppercase",
  },

  titleDivider: {
    height: 1,
    backgroundColor: COLORS.divider,
    marginTop: 12,
    marginBottom: 6,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14, // spacing you liked
    paddingHorizontal: 6,
    borderRadius: 10,
  },

  itemPressed: {
    backgroundColor: COLORS.itemPressed,
  },

  itemActive: {
    backgroundColor: COLORS.active, // optional current page highlight
  },

  icon: {
    width: 30,
    marginRight: 12,
    alignItems: "center",
  },

  itemText: {
    color: COLORS.text,
    fontSize: 18,
    letterSpacing: 0.2,
    fontFamily: serif,
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.divider,
    marginLeft: 36, 
  },
});