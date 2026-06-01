import React, { useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import PlaceholderImage from "../components/PlaceholderImage";
import { colors, spacing } from "../constants/theme";

export default function ProductDetailsScreen({ route, navigation, favorites, toggleFavorite, addToCart }) {
  const { product } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const isFavorite = favorites.some((item) => item.id === product.id);
  const total = Number(product.price || 0) * quantity;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setMessage(`${quantity}x toegevoegd aan je winkelmand.`);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {product.image ? (
        <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />
      ) : (
        <PlaceholderImage icon="SHOP" />
      )}
      <Text style={styles.category}>{product.category}</Text>
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Text style={styles.price}>€{Number(product.price || 0).toFixed(2).replace(".", ",")}</Text>

      <View style={styles.quantityRow}>
        <Pressable style={styles.stepper} onPress={() => setQuantity((value) => Math.max(1, value - 1))}>
          <Text style={styles.stepperText}>-</Text>
        </Pressable>
        <Text style={styles.quantity}>{quantity}</Text>
        <Pressable style={styles.stepper} onPress={() => setQuantity((value) => value + 1)}>
          <Text style={styles.stepperText}>+</Text>
        </Pressable>
      </View>

      <View style={styles.totalBox}>
        <Text style={styles.totalLabel}>Totaal</Text>
        <Text style={styles.totalValue}>€{total.toFixed(2).replace(".", ",")}</Text>
      </View>

      {message ? <Text style={styles.message}>{message}</Text> : null}

      <Pressable style={styles.cartButton} onPress={handleAddToCart}>
        <Text style={styles.cartButtonText}>Toevoegen aan winkelmand</Text>
      </Pressable>

      <Pressable style={styles.darkButton} onPress={() => navigation.navigate("Cart")}>
        <Text style={styles.darkButtonText}>Bekijk winkelmand</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => toggleFavorite(product)}>
        <Text style={styles.buttonText}>{isFavorite ? "Verwijder favoriet" : "Voeg toe aan favorieten"}</Text>
      </Pressable>
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
    fontSize: 34,
    fontWeight: "900",
    lineHeight: 40,
    marginTop: 8,
  },
  description: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 12,
  },
  price: {
    color: colors.darkGreen,
    fontSize: 30,
    fontWeight: "900",
    marginTop: 18,
  },
  quantityRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 18,
    marginTop: 22,
  },
  stepper: {
    alignItems: "center",
    backgroundColor: colors.lightMuted,
    borderRadius: 8,
    height: 44,
    justifyContent: "center",
    width: 44,
  },
  stepperText: {
    color: colors.ink,
    fontSize: 24,
    fontWeight: "900",
  },
  quantity: {
    color: colors.ink,
    fontSize: 22,
    fontWeight: "900",
  },
  totalBox: {
    backgroundColor: colors.darkGreen,
    borderRadius: 8,
    marginTop: 24,
    padding: 18,
  },
  totalLabel: {
    color: "#d9ead4",
    fontWeight: "800",
  },
  totalValue: {
    color: colors.white,
    fontSize: 30,
    fontWeight: "900",
    marginTop: 4,
  },
  button: {
    alignItems: "center",
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 12,
    paddingVertical: 14,
  },
  buttonText: {
    color: colors.ink,
    fontWeight: "900",
  },
  message: {
    color: colors.darkGreen,
    fontWeight: "900",
    marginTop: 12,
  },
  cartButton: {
    alignItems: "center",
    backgroundColor: colors.green,
    borderRadius: 8,
    marginTop: 14,
    paddingVertical: 14,
  },
  cartButtonText: {
    color: colors.ink,
    fontWeight: "900",
  },
  darkButton: {
    alignItems: "center",
    backgroundColor: colors.darkGreen,
    borderRadius: 8,
    marginTop: 12,
    paddingVertical: 14,
  },
  darkButtonText: {
    color: colors.white,
    fontWeight: "900",
  },
});
