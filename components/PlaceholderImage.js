import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/theme";

export default function PlaceholderImage({ icon = "BA", small = false }) {
  return (
    <View style={[styles.placeholder, small && styles.small]}>
      <Text style={[styles.icon, small && styles.smallIcon]}>{icon}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    alignItems: "center",
    backgroundColor: colors.lightMuted,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    height: 160,
    justifyContent: "center",
    width: "100%",
  },
  small: {
    height: 104,
  },
  icon: {
    color: colors.green,
    fontSize: 28,
    fontWeight: "900",
  },
  smallIcon: {
    fontSize: 20,
  },
});
