import React from "react";
import { Image, Pressable, StyleSheet, Text } from "react-native";
import { colors } from "../constants/theme";
import PlaceholderImage from "./PlaceholderImage";

export default function NewsCard({ article, onPress }) {
  return (
    <Pressable style={({ pressed }) => [styles.card, pressed && styles.pressed]} onPress={onPress}>
      {article.image ? (
        <Image source={{ uri: article.image }} style={styles.image} resizeMode="cover" />
      ) : (
        <PlaceholderImage icon="NEWS" small />
      )}
      <Text style={styles.category}>{article.category}</Text>
      <Text style={styles.title}>{article.title}</Text>
      <Text style={styles.intro} numberOfLines={3}>{article.intro}</Text>
      <Text style={styles.date}>{article.date}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    marginBottom: 18,
    paddingBottom: 18,
  },
  pressed: {
    opacity: 0.75,
  },
  image: {
    borderRadius: 8,
    height: 104,
    marginBottom: 12,
    width: "100%",
  },
  category: {
    color: colors.darkGreen,
    fontSize: 13,
    fontWeight: "800",
    marginTop: 12,
  },
  title: {
    color: colors.ink,
    fontSize: 21,
    fontWeight: "900",
    lineHeight: 27,
    marginTop: 6,
  },
  intro: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
  },
  date: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "700",
    marginTop: 10,
  },
});
