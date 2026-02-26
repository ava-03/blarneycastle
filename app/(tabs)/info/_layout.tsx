import React from "react";
import { Stack } from "expo-router";

export default function InfoLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // headers already drawn
      }}
    />
  );
}
