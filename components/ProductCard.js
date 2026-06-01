import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/theme";
import PlaceholderImage from "./PlaceholderImage";

export default function ProductCard({ product, onPress, onFavorite, isFavorite }) {
  return (
    <Pressable style={({ pressed }) => [styles.card, pressed && styles.pressed]} onPress={onPress}>
      {product.image ? (
        <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />
      ) : (
        <PlaceholderImage icon="SHOP" />
      )}
      <View style={styles.content}>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.description} numberOfLines={2}>{product.description}</Text>
        <View style={styles.footer}>
          <Text style={styles.price}>€{Number(product.price || 0).toFixed(2).replace(".", ",")}</Text>
          <Pressable style={styles.favoriteButton} onPress={onFavorite}>
            <Text style={styles.favoriteText}>{isFavorite ? "★" : "☆"}</Text>
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
    marginBottom: 6,
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
  favoriteText: {
    color: colors.green,
    fontSize: 20,
  },
});
