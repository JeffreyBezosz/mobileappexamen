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
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("date-new");

  useEffect(() => {
    async function loadNews() {
      try {
        setLoading(true);
        setErrorMessage("");
        const data = await getNews();
        setNews(data);
      } catch (error) {
        setErrorMessage("Nieuws kon niet geladen worden.");
      } finally {
        setLoading(false);
      }
    }

    loadNews();
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
        sortOptions={[
          { label: "Nieuwste eerst", value: "date-new" },
          { label: "Oudste eerst", value: "date-old" },
          { label: "Naam A-Z", value: "name-asc" },
          { label: "Naam Z-A", value: "name-desc" },
        ]}
        onReset={() => {
          setSearchQuery("");
          setSelectedCategory("");
          setSortOption("date-new");
        }}
      />
      {loading ? <Text style={styles.empty}>Nieuws laden...</Text> : null}
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      {!loading && filteredNews.length === 0 ? <Text style={styles.empty}>Geen nieuws gevonden.</Text> : null}
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
  error: {
    color: "#b42318",
    fontWeight: "800",
    marginTop: 8,
  },
});
