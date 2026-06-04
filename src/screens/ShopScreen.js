import React, { useEffect, useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
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

  const renderProduct = ({ item }) => (
    <ProductCard
      product={item}
      isFavorite={favorites.some((favorite) => favorite.id === item.id)}
      onFavorite={() => toggleFavorite(item)}
      onPress={() => navigation.navigate("ProductDetails", { product: item })}
    />
  );

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.content}
      data={filteredProducts}
      keyExtractor={(item) => item.id}
      renderItem={renderProduct}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <>
      <View style={styles.headerRow}>
        <SectionHeader eyebrow="Shop" title="Webshop" subtitle="Zoek, filter en sorteer alle producten." />
        <Pressable style={styles.cartButton} onPress={() => navigation.navigate("Cart")}>
          <Text style={styles.cartText}>Mandje</Text>
        </Pressable>
        <Pressable style={styles.favoritesButton} onPress={() => navigation.navigate("Favorites")}>
          <Text style={styles.favoritesText}>Favorieten</Text>
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
        </>
      }
      ListEmptyComponent={
        !loading ? <Text style={styles.empty}>Geen producten gevonden.</Text> : null
      }
    />
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
    alignItems: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
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
  favoritesButton: {
    alignItems: "center",
    borderColor: colors.darkGreen,
    borderRadius: 8,
    borderWidth: 1,
    height: 42,
    justifyContent: "center",
    marginTop: 10,
    paddingHorizontal: 14,
  },
  favoritesText: {
    color: colors.darkGreen,
    fontWeight: "900",
  },
});
