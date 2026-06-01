import React, { useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import FilterBar from "../components/FilterBar";
import ProductCard from "../components/ProductCard";
import SectionHeader from "../components/SectionHeader";
import { colors, spacing } from "../constants/theme";
import { getProducts } from "../services/webflow";
import { filterAndSort, getCategories } from "../utils/filtering";

export default function ShopScreen({ navigation, favorites, toggleFavorite }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("name-asc");

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setErrorMessage("");
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        setErrorMessage("Producten konden niet geladen worden.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const categories = useMemo(() => getCategories(products), [products]);
  const filteredProducts = useMemo(
    () => filterAndSort(products, searchQuery, selectedCategory, sortOption),
    [products, searchQuery, selectedCategory, sortOption]
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerRow}>
        <SectionHeader eyebrow="Shop" title="Webshop" subtitle="Zoek, filter en sorteer alle producten." />
        <Pressable style={styles.cartButton} onPress={() => navigation.navigate("Cart")}>
          <Text style={styles.cartText}>Mandje</Text>
        </Pressable>
      </View>
      <FilterBar
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortOption={sortOption}
        setSortOption={setSortOption}
        showPriceSort
        onReset={() => {
          setSearchQuery("");
          setSelectedCategory("");
          setSortOption("name-asc");
        }}
      />
      {loading ? <Text style={styles.empty}>Producten laden...</Text> : null}
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      {!loading && filteredProducts.length === 0 ? <Text style={styles.empty}>Geen producten gevonden.</Text> : null}
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
  error: {
    color: "#b42318",
    fontWeight: "800",
    marginTop: 8,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cartButton: {
    alignItems: "center",
    backgroundColor: colors.darkGreen,
    borderRadius: 8,
    height: 42,
    justifyContent: "center",
    marginTop: 10,
    paddingHorizontal: 14,
  },
  cartText: {
    color: colors.white,
    fontWeight: "900",
  },
});
