import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import SectionHeader from "../components/SectionHeader";
import { colors, spacing } from "../constants/theme";
import { fallbackStudies } from "../data/fallbackData";

const filters = ["ASO", "TSO", "BSO", "STEM", "Talen", "Gezondheid"];

export default function StudyFinderScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("");

  const studies = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return fallbackStudies.filter((study) => {
      const text = `${study.title} ${study.campus} ${study.type} ${study.interests.join(" ")}`.toLowerCase();
      const matchesSearch = !query || text.includes(query);
      const matchesFilter =
        !activeFilter ||
        study.type === activeFilter ||
        study.interests.includes(activeFilter);

      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <SectionHeader
        eyebrow="Ontdekken"
        title="Welke richting past bij jou?"
        subtitle="Verken richtingen via type onderwijs, interesses of campus."
      />

      <TextInput
        placeholder="Zoek een studierichting..."
        placeholderTextColor="#8b94a3"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.input}
      />

      <View style={styles.filterGrid}>
        {filters.map((filter) => {
          const active = activeFilter === filter;
          return (
            <Pressable
              key={filter}
              style={[styles.filterButton, active && styles.activeFilter]}
              onPress={() => setActiveFilter(active ? "" : filter)}
            >
              <Text style={[styles.filterText, active && styles.activeFilterText]}>{filter}</Text>
            </Pressable>
          );
        })}
      </View>

      {studies.map((study) => (
        <View key={study.id} style={styles.card}>
          <Text style={styles.cardTitle}>{study.title}</Text>
          <Text style={styles.meta}>{study.campus} · {study.type}</Text>
          <Text style={styles.description}>{study.description}</Text>
        </View>
      ))}

      {studies.length === 0 ? <Text style={styles.empty}>Geen richtingen gevonden.</Text> : null}
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
  input: {
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    color: colors.ink,
    fontSize: 16,
    marginBottom: 18,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  filterGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 24,
  },
  filterButton: {
    alignItems: "center",
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    minWidth: "30%",
    paddingVertical: 12,
  },
  activeFilter: {
    backgroundColor: colors.darkGreen,
    borderColor: colors.darkGreen,
  },
  filterText: {
    color: colors.ink,
    fontWeight: "900",
  },
  activeFilterText: {
    color: colors.white,
  },
  card: {
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 14,
    padding: 16,
  },
  cardTitle: {
    color: colors.ink,
    fontSize: 20,
    fontWeight: "900",
  },
  meta: {
    color: colors.darkGreen,
    fontSize: 15,
    fontWeight: "800",
    marginTop: 8,
  },
  description: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 12,
  },
  empty: {
    color: colors.muted,
  },
});
