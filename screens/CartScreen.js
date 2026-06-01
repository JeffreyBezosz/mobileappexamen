import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import SectionHeader from "../components/SectionHeader";
import { colors, spacing } from "../constants/theme";

export default function CartScreen({ cartItems, setCartItems, updateCartQuantity }) {
  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price || 0) * item.quantity,
    0
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <SectionHeader
        eyebrow="Shop"
        title="Winkelmand"
        subtitle="Pas aantallen aan en bekijk je totaalprijs."
      />

      {cartItems.length === 0 ? (
        <Text style={styles.empty}>Je winkelmand is nog leeg.</Text>
      ) : null}

      {cartItems.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.meta}>€{Number(item.price || 0).toFixed(2).replace(".", ",")} per stuk</Text>
          <View style={styles.row}>
            <Pressable
              style={styles.stepper}
              onPress={() => updateCartQuantity(item.id, item.quantity - 1)}
            >
              <Text style={styles.stepperText}>-</Text>
            </Pressable>
            <Text style={styles.quantity}>{item.quantity}</Text>
            <Pressable
              style={styles.stepper}
              onPress={() => updateCartQuantity(item.id, item.quantity + 1)}
            >
              <Text style={styles.stepperText}>+</Text>
            </Pressable>
          </View>
          <Text style={styles.lineTotal}>
            Subtotaal: €{(Number(item.price || 0) * item.quantity).toFixed(2).replace(".", ",")}
          </Text>
        </View>
      ))}

      <View style={styles.totalBox}>
        <Text style={styles.totalLabel}>Totaal</Text>
        <Text style={styles.totalValue}>€{total.toFixed(2).replace(".", ",")}</Text>
      </View>

      {cartItems.length > 0 ? (
        <Pressable style={styles.clearButton} onPress={() => setCartItems([])}>
          <Text style={styles.clearText}>Leeg winkelmand</Text>
        </Pressable>
      ) : null}
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
    fontSize: 16,
  },
  card: {
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 14,
    padding: 16,
  },
  title: {
    color: colors.ink,
    fontSize: 20,
    fontWeight: "900",
  },
  meta: {
    color: colors.darkGreen,
    fontWeight: "800",
    marginTop: 6,
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    gap: 14,
    marginTop: 14,
  },
  stepper: {
    alignItems: "center",
    backgroundColor: colors.lightMuted,
    borderRadius: 8,
    height: 38,
    justifyContent: "center",
    width: 38,
  },
  stepperText: {
    color: colors.ink,
    fontSize: 22,
    fontWeight: "900",
  },
  quantity: {
    color: colors.ink,
    fontSize: 20,
    fontWeight: "900",
  },
  lineTotal: {
    color: colors.muted,
    fontWeight: "800",
    marginTop: 12,
  },
  totalBox: {
    backgroundColor: colors.darkGreen,
    borderRadius: 8,
    marginTop: 8,
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
  clearButton: {
    alignItems: "center",
    backgroundColor: colors.green,
    borderRadius: 8,
    marginTop: 14,
    paddingVertical: 14,
  },
  clearText: {
    color: colors.ink,
    fontWeight: "900",
  },
});
