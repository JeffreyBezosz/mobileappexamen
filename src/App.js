import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CampusDetailsScreen from "./screens/CampusDetailsScreen";
import CartScreen from "./screens/CartScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import GameScreen from "./screens/GameScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import NewsDetailsScreen from "./screens/NewsDetailsScreen";
import NewsScreen from "./screens/NewsScreen";
import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import ShopScreen from "./screens/ShopScreen";
import StudyFinderScreen from "./screens/StudyFinderScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [favorites, setFavorites] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);

  const toggleFavorite = (item) => {
    setFavorites((current) => {
      const exists = current.some((favorite) => favorite.id === item.id);
      return exists
        ? current.filter((favorite) => favorite.id !== item.id)
        : [...current, item];
    });
  };

  const addToCart = (product, quantity = 1) => {
    setCartItems((current) => {
      const existingItem = current.find((item) => item.id === product.id);
      if (existingItem) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...current, { ...product, quantity }];
    });
  };

  const updateCartQuantity = (id, quantity) => {
    setCartItems((current) =>
      current
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#ffffff" },
          headerTintColor: "#050914",
          headerTitleStyle: { fontWeight: "800" },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: "#ffffff" },
        }}
      >
        <Stack.Screen name="Home" options={{ title: "Busleyden Atheneum" }}>
          {(props) => (
            <HomeScreen
              {...props}
              favorites={favorites}
              cartItems={cartItems}
              user={user}
              toggleFavorite={toggleFavorite}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Shop" options={{ title: "Webshop" }}>
          {(props) => (
            <ShopScreen
              {...props}
              favorites={favorites}
              cartItems={cartItems}
              toggleFavorite={toggleFavorite}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="ProductDetails" options={{ title: "Product" }}>
          {(props) => (
            <ProductDetailsScreen
              {...props}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              addToCart={addToCart}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Cart" options={{ title: "Winkelmand" }}>
          {(props) => (
            <CartScreen
              {...props}
              cartItems={cartItems}
              setCartItems={setCartItems}
              updateCartQuantity={updateCartQuantity}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Favorites" options={{ title: "Favorieten" }}>
          {(props) => (
            <FavoritesScreen
              {...props}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Login" options={{ title: "Login" }}>
          {(props) => (
            <LoginScreen
              {...props}
              user={user}
              setUser={setUser}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="News" component={NewsScreen} options={{ title: "Nieuws" }} />
        <Stack.Screen name="NewsDetails" component={NewsDetailsScreen} options={{ title: "Nieuws" }} />
        <Stack.Screen name="CampusDetails" component={CampusDetailsScreen} options={{ title: "Campus" }} />
        <Stack.Screen name="StudyFinder" component={StudyFinderScreen} options={{ title: "Studiezoeker" }} />
        <Stack.Screen name="Game" component={GameScreen} options={{ title: "Mini-game" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
