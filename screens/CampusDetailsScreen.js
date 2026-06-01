import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import PlaceholderImage from "../components/PlaceholderImage";
import { colors, spacing } from "../constants/theme";

export default function CampusDetailsScreen({ route }) {
  const { campus } = route.params;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {campus.image ? (
        <Image source={{ uri: campus.image }} style={styles.image} resizeMode="cover" />
      ) : (
        <PlaceholderImage icon="BA" />
      )}
      <Text style={styles.category}>{campus.category}</Text>
      <Text style={styles.title}>{campus.name}</Text>
      <Text style={styles.focus}>{campus.focus}</Text>
      <Text style={styles.description}>{campus.description}</Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoLabel}>Adres</Text>
        <Text style={styles.infoText}>{campus.address || "Adres volgt later"}</Text>
      </View>
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
    height: 230,
    width: "100%",
  },
  category: {
    color: colors.darkGreen,
    fontWeight: "900",
    marginTop: 18,
  },
  title: {
    color: colors.ink,
    fontSize: 36,
    fontWeight: "900",
    lineHeight: 42,
    marginTop: 8,
  },
  focus: {
    color: colors.darkGreen,
    fontSize: 17,
    fontWeight: "800",
    marginTop: 10,
  },
  description: {
    color: colors.muted,
    fontSize: 17,
    lineHeight: 27,
    marginTop: 16,
  },
  infoBox: {
    backgroundColor: colors.lightMuted,
    borderRadius: 8,
    marginTop: 22,
    padding: 16,
  },
  infoLabel: {
    color: colors.darkGreen,
    fontWeight: "900",
  },
  infoText: {
    color: colors.ink,
    fontSize: 16,
    marginTop: 6,
  },
});
