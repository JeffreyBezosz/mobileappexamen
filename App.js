import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CampusDetailsScreen from "./screens/CampusDetailsScreen";
import GameScreen from "./screens/GameScreen";
import HomeScreen from "./screens/HomeScreen";
import NewsDetailsScreen from "./screens/NewsDetailsScreen";
import NewsScreen from "./screens/NewsScreen";
import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import ShopScreen from "./screens/ShopScreen";
import StudyFinderScreen from "./screens/StudyFinderScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (item) => {
    setFavorites((current) => {
      const exists = current.some((favorite) => favorite.id === item.id);
      return exists
        ? current.filter((favorite) => favorite.id !== item.id)
        : [...current, item];
    });
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
              toggleFavorite={toggleFavorite}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Shop" options={{ title: "Webshop" }}>
          {(props) => (
            <ShopScreen
              {...props}
              favorites={favorites}
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
