import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { colors } from "../constants/theme";

export default function FilterBar({
  categories,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  sortOption,
  setSortOption,
  showPriceSort = false,
}) {
  return (
    <View style={styles.wrapper}>
      <TextInput
        placeholder="Zoeken..."
        placeholderTextColor="#8b94a3"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.input}
      />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
        {["Alles", ...categories].map((category) => {
          const value = category === "Alles" ? "" : category;
          const active = selectedCategory === value;
          return (
            <Pressable
              key={category}
              style={[styles.chip, active && styles.activeChip]}
              onPress={() => setSelectedCategory(value)}
            >
              <Text style={[styles.chipText, active && styles.activeChipText]}>{category}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={styles.pickerWrapper}>
        <Picker selectedValue={sortOption} onValueChange={setSortOption} style={styles.picker}>
          <Picker.Item label="Naam A-Z" value="name-asc" />
          <Picker.Item label="Naam Z-A" value="name-desc" />
          {showPriceSort ? <Picker.Item label="Prijs laag-hoog" value="price-asc" /> : null}
          {showPriceSort ? <Picker.Item label="Prijs hoog-laag" value="price-desc" /> : null}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 18,
  },
  input: {
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    color: colors.ink,
    fontSize: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  chips: {
    gap: 8,
    paddingVertical: 12,
  },
  chip: {
    borderColor: colors.border,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  activeChip: {
    backgroundColor: colors.darkGreen,
    borderColor: colors.darkGreen,
  },
  chipText: {
    color: colors.ink,
    fontWeight: "800",
  },
  activeChipText: {
    color: colors.white,
  },
  pickerWrapper: {
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    overflow: "hidden",
  },
  picker: {
    color: colors.ink,
  },
});
