import React, { useCallback } from "react";
import { StyleSheet, View, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Colors from "./constants/colors";
import { CATEGORIES } from "./data/dummy-data";
import CategoriesScreen from "./screens/CategoriesScreen";
import CategoryMealsScreen from "./screens/CategoryMealsScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import FiltersScreen from "./screens/FiltersScreen";
import MealDetailScreen from "./screens/MealDetailScreen";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container} onLayout={onLayoutRootView}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor:
                  Platform.OS === "android" ? Colors.primaryColor : undefined,
              },
              headerTintColor:
                Platform.OS === "android" ? "white" : Colors.primaryColor,
            }}
          >
            <Stack.Screen
              name="Categories"
              component={CategoriesScreen}
              options={{
                title: "Meal Categories",
              }}
            />
            <Stack.Screen
              name="CategoryMeals"
              component={CategoryMealsScreen}
              options={({ route }) => {
                const catId = route.params.categoryId;
                const selectedCategory = CATEGORIES.find(
                  (cat) => cat.id === catId
                );
                return {
                  title: selectedCategory.title,
                };
              }}
            />
            <Stack.Screen name="Favorites" component={FavoritesScreen} />
            <Stack.Screen name="Filters" component={FiltersScreen} />
            <Stack.Screen name="MealDetail" component={MealDetailScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
