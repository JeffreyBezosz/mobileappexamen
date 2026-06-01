import React from "react";
import { Image, Pressable, StyleSheet, Text } from "react-native";
import { colors } from "../constants/theme";
import PlaceholderImage from "./PlaceholderImage";

export default function CampusCard({ campus, onPress }) {
  return (
    <Pressable style={({ pressed }) => [styles.card, pressed && styles.pressed]} onPress={onPress}>
      {campus.image ? (
        <Image source={{ uri: campus.image }} style={styles.image} resizeMode="cover" />
      ) : (
        <PlaceholderImage icon="BA" />
      )}
      <Text style={styles.title}>{campus.name}</Text>
      <Text style={styles.focus}>{campus.focus}</Text>
      <Text style={styles.description} numberOfLines={3}>{campus.description}</Text>
      <Text style={styles.link}>Meer informatie →</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 22,
  },
  pressed: {
    opacity: 0.75,
  },
  image: {
    borderRadius: 8,
    height: 170,
    width: "100%",
  },
  title: {
    color: colors.ink,
    fontSize: 24,
    fontWeight: "900",
    marginTop: 14,
  },
  focus: {
    color: colors.darkGreen,
    fontSize: 14,
    fontWeight: "800",
    marginTop: 6,
  },
  description: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 10,
  },
  link: {
    color: colors.darkGreen,
    fontSize: 15,
    fontWeight: "900",
    marginTop: 14,
  },
});
