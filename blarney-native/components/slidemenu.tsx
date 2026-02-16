// https://reactnative.dev/docs/pressable
// https://reactnative.dev/docs/usewindowdimensions
// https://reactnative.dev/docs/platform#platformselect

import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";


type Props = {
  visible: boolean;
  onClose: () => void;
  onSelect: (label: string) => void;
};

// Consistent font across platforms
// Platform.select ensures correct fallback font on web
const serif = Platform.select({
  ios: "Times New Roman",
  android: "serif",
  web: "Times New Roman, serif",
});

// responsive layer
// dimensions ensures it works on both mobile and web
const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get("window");

const PANEL_W = Math.min(0.86 * SCREEN_W, 330);

const COLORS = {
  bg: "#0f584d",
  text: "#ffffff",
  backdrop: "rgba(0,0,0,0.35)", 
};

const HEADER_HEIGHT = 110;

export default function SlideMenu({ visible, onClose, onSelect }: Props) {
  if (!visible) return null;

  const MENU_ITEMS: Array<{ key: string; label: string }> = [
    { key: "HOME", label: "HOME" },
    { key: "NAVIGATION", label: "MAP" }, 
    { key: "INFO", label: "INFORMATION" },
    { key: "PHOTOS", label: "PHOTOS" },
  ];

  return (
    // Backdrop fills entire screen; tapping it triggers onClose()
    // stopPropagation prevents closing when tapping inside the panel
    <Pressable style={styles.backdrop} onPress={onClose}>
      <Pressable style={styles.panel} onPress={(e) => e.stopPropagation()}>
        <Text style={styles.title}>MENU</Text>

        {MENU_ITEMS.map(({ key, label }) => (
          <Pressable
            key={key}
            style={styles.item}
            onPress={() => {
              onSelect(key);
              onClose();
            }}
            accessibilityRole="button"
            accessibilityLabel={label}
          >
            <View style={styles.bullet} />
            <Text style={styles.itemText}>{label}</Text>
          </Pressable>
        ))}
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
    maxHeight: SCREEN_H - (HEADER_HEIGHT + 32),
    backgroundColor: COLORS.bg,
    borderRadius: 14,

    paddingVertical: 14,
    paddingHorizontal: 18,
  },
  title: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 8,
    fontFamily: serif,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",

    paddingVertical: 10,
  },
  bullet: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: COLORS.text,
    marginRight: 12,
  },
  itemText: {
    color: COLORS.text,
    fontSize: 18,
    letterSpacing: 0.3,
    fontFamily: serif,
  },
});
