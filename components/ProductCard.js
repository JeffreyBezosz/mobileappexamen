import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/theme";
import { formatPrice } from "../utils/formatting";
import PlaceholderImage from "./PlaceholderImage";

export default function ProductCard({ product, onPress, onFavorite, isFavorite }) {
  const handleFavorite = (event) => {
    event.stopPropagation?.();
    onFavorite();
  };

  return (
    <Pressable style={({ pressed }) => [styles.card, pressed && styles.pressed]} onPress={onPress}>
      {product.image ? (
        <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />
      ) : (
        <PlaceholderImage icon="SHOP" />
      )}
      <View style={styles.content}>
        <View style={styles.metaRow}>
          <Text style={styles.category}>{product.category}</Text>
          {product.label ? <Text style={styles.label}>{product.label}</Text> : null}
        </View>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.description} numberOfLines={2}>{product.description}</Text>
        {product.rating ? <Text style={styles.rating}>Rating {product.rating}/5</Text> : null}
        <View style={styles.footer}>
          <Text style={styles.price}>{formatPrice(product.price)}</Text>
          <Pressable style={[styles.favoriteButton, isFavorite && styles.favoriteButtonActive]} onPress={handleFavorite}>
            <Text style={[styles.favoriteText, isFavorite && styles.favoriteTextActive]}>
              {isFavorite ? "F" : "+"}
            </Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
    overflow: "hidden",
  },
  pressed: {
    opacity: 0.78,
    transform: [{ scale: 0.99 }],
  },
  image: {
    height: 160,
    width: "100%",
  },
  content: {
    padding: 14,
  },
  category: {
    color: colors.darkGreen,
    fontSize: 12,
    fontWeight: "800",
  },
  metaRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    justifyContent: "space-between",
    marginBottom: 6,
  },
  label: {
    backgroundColor: colors.green,
    borderRadius: 999,
    color: colors.ink,
    fontSize: 11,
    fontWeight: "900",
    overflow: "hidden",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  title: {
    color: colors.ink,
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 8,
  },
  description: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
  rating: {
    color: colors.darkGreen,
    fontSize: 13,
    fontWeight: "800",
    marginTop: 8,
  },
  footer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },
  price: {
    color: colors.darkGreen,
    fontSize: 21,
    fontWeight: "900",
  },
  favoriteButton: {
    alignItems: "center",
    backgroundColor: colors.lightMuted,
    borderRadius: 999,
    height: 38,
    justifyContent: "center",
    width: 38,
  },
  favoriteButtonActive: {
    backgroundColor: colors.darkGreen,
  },
  favoriteText: {
    color: colors.green,
    fontSize: 18,
    fontWeight: "900",
  },
  favoriteTextActive: {
    color: colors.white,
  },
});
