/**
 * components/slidemenu.tsx
 * Bigger left-side overlay menu, sized to screen width, below header.
 */
import React from "react";
import { View, Text, Pressable, StyleSheet, Dimensions } from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSelect: (label: string) => void;
};

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get("window");
const PANEL_W = Math.min(0.9 * SCREEN_W, 360); // wider panel (up to 360px)

const COLORS = {
  bg: "#0f584d",
  text: "#ffffff",
  backdrop: "rgba(0,0,0,0.35)", // a bit darker for focus
};

export default function SlideMenu({ visible, onClose, onSelect }: Props) {
  if (!visible) return null;

  return (
    <Pressable style={styles.backdrop} onPress={onClose}>
      <Pressable style={styles.panel} onPress={(e) => e.stopPropagation()}>
        <Text style={styles.title}>MENU</Text>

        {["HOME", "NAVIGATION", "INFO", "NATURE", "PHOTOS", "AUDIO TOUR"].map((label) => (
          <Pressable
            key={label}
            style={styles.item}
            onPress={() => {
              onSelect(label);
              onClose();
            }}
          >
            <View style={styles.bullet} />
            <Text style={styles.itemText}>{label}</Text>
          </Pressable>
        ))}
      </Pressable>
    </Pressable>
  );
}

const HEADER_HEIGHT = 88; // keep in sync with the header in index.tsx

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    top: 0, right: 0, bottom: 0, left: 0,
    backgroundColor: COLORS.backdrop,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  panel: {
    // left-aligned, large panel sitting just under the header
    marginTop: HEADER_HEIGHT + 8,
    marginLeft: 12,
    width: PANEL_W,
    maxHeight: SCREEN_H - (HEADER_HEIGHT + 24),
    backgroundColor: COLORS.bg,
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  title: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  bullet: {
    width: 7, height: 7, borderRadius: 3.5,
    backgroundColor: COLORS.text,
    marginRight: 12,
  },
  itemText: {
    color: COLORS.text,
    fontSize: 18, // larger, easier to tap/read
    letterSpacing: 0.3,
  },
});
