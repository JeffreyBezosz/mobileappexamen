import React from "react";
import { Image, ScrollView, StyleSheet, Text } from "react-native";
import PlaceholderImage from "../components/PlaceholderImage";
import { colors, spacing } from "../constants/theme";

export default function NewsDetailsScreen({ route }) {
  const { article } = route.params;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {article.image ? (
        <Image source={{ uri: article.image }} style={styles.image} resizeMode="cover" />
      ) : (
        <PlaceholderImage icon="NEWS" />
      )}
      <Text style={styles.category}>{article.category}</Text>
      <Text style={styles.title}>{article.title}</Text>
      <Text style={styles.date}>{article.date}</Text>
      <Text style={styles.body}>{article.content || article.intro}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    padding: spacing.page,
    paddingBottom: 40,
  },
  image: {
    borderRadius: 8,
    height: 220,
    width: "100%",
  },
  category: {
    color: colors.darkGreen,
    fontWeight: "900",
    marginTop: 18,
  },
  title: {
    color: colors.ink,
    fontSize: 34,
    fontWeight: "900",
    lineHeight: 40,
    marginTop: 8,
  },
  date: {
    color: colors.muted,
    fontWeight: "800",
    marginTop: 10,
  },
  body: {
    color: colors.muted,
    fontSize: 17,
    lineHeight: 28,
    marginTop: 18,
  },
});
