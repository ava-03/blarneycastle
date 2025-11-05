/**
 * components/SlideMenu.tsx
 * ------------------------------------------------------------
 * A simple slide-over menu overlay (no external libraries).
 * Props:
 *  - visible   : whether the menu is shown
 *  - onClose   : called when user taps outside or selects an item
 *  - onSelect  : called with the label of the item pressed
 * ------------------------------------------------------------
 */
import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSelect: (label: string) => void;
};

// Colors inline to keep this component standalone.
// (If you prefer, you can import from constants/colors)
const COLORS = {
  bg: "#0f584d",      // menu panel color (your green)
  text: "#ffffff",    // menu text
  backdrop: "rgba(0,0,0,0.2)", // dim background
};

export default function SlideMenu({ visible, onClose, onSelect }: Props) {
  // If not visible, render nothing — avoids unnecessary layout work.
  if (!visible) return null;

  // Backdrop covers the screen. Tapping it closes the menu.
  return (
    <Pressable style={styles.backdrop} onPress={onClose}>
      {/* This inner Pressable stops the backdrop tap from closing the menu
          when the user taps inside the panel. */}
      <Pressable style={styles.panel} onPress={(e) => e.stopPropagation()}>
        <Text style={styles.title}>MENU</Text>

        {["HOME", "NAVIGATION", "INFO", "NATURE", "AUDIO TOUR"].map((label) => (
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

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    top: 0, right: 0, bottom: 0, left: 0,
    backgroundColor: COLORS.backdrop,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  panel: {
    marginTop: 80,   // drop below your header/logo area
    marginLeft: 20,
    width: 260,
    borderRadius: 10,
    backgroundColor: COLORS.bg,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  title: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  bullet: {
    width: 6, height: 6, borderRadius: 3,
    backgroundColor: COLORS.text,
    marginRight: 10,
  },
  itemText: {
    color: COLORS.text,
    fontSize: 16,
  },
});
