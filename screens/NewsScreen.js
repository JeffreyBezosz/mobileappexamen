import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import FilterBar from "../components/FilterBar";
import NewsCard from "../components/NewsCard";
import SectionHeader from "../components/SectionHeader";
import { colors, spacing } from "../constants/theme";
import { getNews } from "../services/webflow";
import { filterAndSort, getCategories } from "../utils/filtering";

export default function NewsScreen({ navigation }) {
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("name-asc");

  useEffect(() => {
    getNews().then(setNews);
  }, []);

  const categories = useMemo(() => getCategories(news), [news]);
  const filteredNews = useMemo(
    () => filterAndSort(news, searchQuery, selectedCategory, sortOption),
    [news, searchQuery, selectedCategory, sortOption]
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <SectionHeader eyebrow="Actueel" title="Laatste nieuws" subtitle="Zoek en filter nieuwsartikelen." />
      <FilterBar
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />
      {filteredNews.length === 0 ? <Text style={styles.empty}>Geen nieuws gevonden.</Text> : null}
      {filteredNews.map((article) => (
        <NewsCard
          key={article.id}
          article={article}
          onPress={() => navigation.navigate("NewsDetails", { article })}
        />
      ))}
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
  empty: {
    color: colors.muted,
    marginTop: 8,
  },
});
