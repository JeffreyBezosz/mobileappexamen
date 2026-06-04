import { StatusBar } from "expo-status-bar";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Pressable, ScrollView, StyleSheet, Switch, Text, View } from "react-native";

import CampusCard from "../components/CampusCard";
import FilterBar from "../components/FilterBar";
import NewsCard from "../components/NewsCard";
import ProductCard from "../components/ProductCard";
import SectionHeader from "../components/SectionHeader";
import { colors, spacing } from "../constants/theme";
import { getCampuses, getNews, getProducts } from "../services/webflow";
import { filterAndSort, getCategories } from "../utils/filtering";

export default function HomeScreen({ navigation, favorites, cartItems, user, toggleFavorite }) {
  const [products, setProducts] = useState([]);
  const [news, setNews] = useState([]);
  const [campuses, setCampuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCompact, setShowCompact] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("name-asc");

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const [productData, newsData, campusData] = await Promise.all([
        getProducts(),
        getNews(),
        getCampuses(),
      ]);
      setProducts(productData);
      setNews(newsData);
      setCampuses(campusData);
      setLoading(false);
    }

    loadData();
  }, []);

  const campusCategories = useMemo(() => getCategories(campuses), [campuses]);
  const filteredCampuses = useMemo(
    () => filterAndSort(campuses, searchQuery, selectedCategory, sortOption, "name"),
    [campuses, searchQuery, selectedCategory, sortOption]
  );
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.logoRow}>
        <View style={styles.brandRow}>
          <View style={styles.logoBox}>
            <Text style={styles.logoText}>BA</Text>
          </View>
          <View>
            <Text style={styles.brand}>Busleyden</Text>
            <Text style={styles.brandSub}>Atheneum</Text>
          </View>
        </View>
        <Pressable style={styles.cartPill} onPress={() => navigation.navigate("Cart")}>
          <Text style={styles.cartPillText}>Mandje {cartCount}</Text>
        </Pressable>
      </View>
      <Pressable style={styles.loginBanner} onPress={() => navigation.navigate("Login")}>
        <Text style={styles.loginBannerText}>
          {user ? `Welkom, ${user.name}` : "Login met dummy account"}
        </Text>
      </Pressable>
      <View style={styles.statusBar}>
        <Text style={styles.statusText}>{products.length} producten</Text>
        <Text style={styles.statusText}>{news.length} nieuwsitems</Text>
        <Text style={styles.statusText}>{campuses.length} campussen</Text>
      </View>

      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Ontdek jouw toekomst</Text>
        <Text style={styles.heroText}>
          Een scholengemeenschap, 8 unieke campussen en meer dan 60 studierichtingen in Mechelen.
        </Text>
        <View style={styles.heroActions}>
          <Pressable style={styles.primaryButton} onPress={() => navigation.navigate("StudyFinder")}>
            <Text style={styles.primaryButtonText}>Vind jouw richting</Text>
          </Pressable>
          <Pressable style={styles.secondaryButton} onPress={() => navigation.navigate("Game")}>
            <Text style={styles.secondaryButtonText}>Speel game</Text>
          </Pressable>
        </View>
        <View style={styles.nativeButton}>
          <Button title="Open webshop" color={colors.darkGreen} onPress={() => navigation.navigate("Shop")} />
        </View>
        <View style={styles.quickActions}>
          <Pressable style={styles.quickButton} onPress={() => navigation.navigate("News")}>
            <Text style={styles.quickButtonText}>Nieuws</Text>
          </Pressable>
          <Pressable style={styles.quickButton} onPress={() => navigation.navigate("Favorites")}>
            <Text style={styles.quickButtonText}>Favorieten</Text>
          </Pressable>
          <Pressable style={styles.quickButton} onPress={() => navigation.navigate("Login")}>
            <Text style={styles.quickButtonText}>Login</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.statsBand}>
        <Text style={styles.statsTitle}>Waarom Busleyden Atheneum?</Text>
        <View style={styles.statsGrid}>
          <Text style={styles.stat}>5000+{"\n"}<Text style={styles.statLabel}>Leerlingen</Text></Text>
          <Text style={styles.stat}>8{"\n"}<Text style={styles.statLabel}>Campussen</Text></Text>
          <Text style={styles.stat}>60+{"\n"}<Text style={styles.statLabel}>Richtingen</Text></Text>
        </View>
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.switchText}>Compact overzicht</Text>
        <Switch value={showCompact} onValueChange={setShowCompact} trackColor={{ true: colors.green }} />
      </View>

      <SectionHeader
        eyebrow="Onze locaties"
        title="8 campussen met karakter"
        subtitle="Filter op focus en ontdek welke campus bij jou past."
      />
      <FilterBar
        categories={campusCategories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortOption={sortOption}
        setSortOption={setSortOption}
        onReset={() => {
          setSearchQuery("");
          setSelectedCategory("");
          setSortOption("name-asc");
        }}
      />

      {loading ? <Text style={styles.empty}>Data laden...</Text> : null}
      {filteredCampuses.slice(0, showCompact ? 3 : 8).map((campus) => (
        <CampusCard
          key={campus.id}
          campus={campus}
          onPress={() => navigation.navigate("CampusDetails", { campus })}
        />
      ))}

      <View style={styles.sectionTop}>
        <View style={styles.rowBetween}>
          <SectionHeader eyebrow="Actueel" title="Laatste nieuws" subtitle="Blijf op de hoogte van ons schoolleven." />
          <Pressable onPress={() => navigation.navigate("News")}>
            <Text style={styles.link}>Alles →</Text>
          </Pressable>
        </View>
        {news.slice(0, 3).map((article) => (
          <NewsCard
            key={article.id}
            article={article}
            onPress={() => navigation.navigate("NewsDetails", { article })}
          />
        ))}
      </View>

      <View style={styles.sectionTop}>
        <View style={styles.rowBetween}>
          <SectionHeader eyebrow="Shop" title="Webshop" subtitle="Schoolmateriaal, merchandise en meer." />
          <Pressable onPress={() => navigation.navigate("Shop")}>
            <Text style={styles.link}>Alles →</Text>
          </Pressable>
        </View>
        {products.slice(0, 4).map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isFavorite={favorites.some((item) => item.id === product.id)}
            onFavorite={() => toggleFavorite(product)}
            onPress={() => navigation.navigate("ProductDetails", { product })}
          />
        ))}
      </View>

      <StatusBar style="dark" />
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
  logoRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 28,
  },
  brandRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  logoBox: {
    alignItems: "center",
    backgroundColor: colors.darkGreen,
    borderRadius: 6,
    height: 42,
    justifyContent: "center",
    width: 42,
  },
  logoText: {
    color: colors.white,
    fontWeight: "900",
  },
  brand: {
    color: colors.ink,
    fontSize: 17,
    fontWeight: "900",
  },
  brandSub: {
    color: colors.darkGreen,
    fontSize: 13,
    fontWeight: "700",
  },
  cartPill: {
    backgroundColor: colors.lightMuted,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  cartPillText: {
    color: colors.darkGreen,
    fontWeight: "900",
  },
  loginBanner: {
    backgroundColor: colors.lightMuted,
    borderRadius: 8,
    marginBottom: 20,
    padding: 12,
  },
  loginBannerText: {
    color: colors.darkGreen,
    fontWeight: "900",
  },
  statusBar: {
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 22,
    padding: 12,
  },
  statusText: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "800",
  },
  hero: {
    paddingBottom: 30,
  },
  heroTitle: {
    color: colors.ink,
    fontSize: 46,
    fontWeight: "900",
    lineHeight: 52,
  },
  heroText: {
    color: colors.muted,
    fontSize: 17,
    lineHeight: 25,
    marginTop: 16,
  },
  heroActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 22,
  },
  primaryButton: {
    backgroundColor: colors.darkGreen,
    borderRadius: 6,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  primaryButtonText: {
    color: colors.white,
    fontWeight: "900",
  },
  secondaryButton: {
    borderColor: colors.border,
    borderRadius: 6,
    borderWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  secondaryButtonText: {
    color: colors.ink,
    fontWeight: "900",
  },
  nativeButton: {
    alignSelf: "flex-start",
    marginTop: 12,
  },
  quickActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  quickButton: {
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 11,
  },
  quickButtonText: {
    color: colors.ink,
    fontWeight: "900",
  },
  statsBand: {
    backgroundColor: colors.darkGreen,
    borderRadius: 8,
    marginBottom: 28,
    padding: 18,
  },
  statsTitle: {
    color: colors.white,
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 18,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  stat: {
    color: colors.white,
    fontSize: 28,
    fontWeight: "900",
  },
  statLabel: {
    color: "#d9ead4",
    fontSize: 12,
  },
  switchRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 22,
  },
  switchText: {
    color: colors.ink,
    fontWeight: "800",
  },
  empty: {
    color: colors.muted,
    marginBottom: 16,
  },
  sectionTop: {
    marginTop: 30,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  link: {
    color: colors.darkGreen,
    fontWeight: "900",
    marginTop: 10,
  },
});
