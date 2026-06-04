import React from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import ProductCard from "../components/ProductCard";
import SectionHeader from "../components/SectionHeader";
import { colors, spacing } from "../constants/theme";

export default function FavoritesScreen({ navigation, favorites, toggleFavorite }) {
  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.content}
      data={favorites}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <SectionHeader
          eyebrow="Shop"
          title="Favorieten"
          subtitle="Bewaar producten die je later opnieuw wil bekijken."
        />
      }
      ListEmptyComponent={
        <Text style={styles.empty}>Je hebt nog geen favoriete producten.</Text>
      }
      renderItem={({ item }) => (
        <ProductCard
          product={item}
          isFavorite
          onFavorite={() => toggleFavorite(item)}
          onPress={() => navigation.navigate("ProductDetails", { product: item })}
        />
      )}
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
    fontSize: 16,
  },
});
