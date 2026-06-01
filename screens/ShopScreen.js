import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import FilterBar from "../components/FilterBar";
import ProductCard from "../components/ProductCard";
import SectionHeader from "../components/SectionHeader";
import { colors, spacing } from "../constants/theme";
import { getProducts } from "../services/webflow";
import { filterAndSort, getCategories } from "../utils/filtering";

export default function ShopScreen({ navigation, favorites, toggleFavorite }) {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("name-asc");

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const categories = useMemo(() => getCategories(products), [products]);
  const filteredProducts = useMemo(
    () => filterAndSort(products, searchQuery, selectedCategory, sortOption),
    [products, searchQuery, selectedCategory, sortOption]
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <SectionHeader eyebrow="Shop" title="Webshop" subtitle="Zoek, filter en sorteer alle producten." />
      <FilterBar
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortOption={sortOption}
        setSortOption={setSortOption}
        showPriceSort
      />
      {filteredProducts.length === 0 ? <Text style={styles.empty}>Geen producten gevonden.</Text> : null}
      {filteredProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isFavorite={favorites.some((item) => item.id === product.id)}
          onFavorite={() => toggleFavorite(product)}
          onPress={() => navigation.navigate("ProductDetails", { product })}
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
