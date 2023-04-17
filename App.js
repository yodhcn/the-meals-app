import React, { useCallback } from "react";
import { StyleSheet, View, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  OverflowMenuProvider,
  HeaderButtons,
  Item,
} from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";

import Colors from "./constants/colors";
import HeaderButton from "./components/HeaderButton";
import { CATEGORIES, MEALS } from "./data/dummy-data";
import CategoriesScreen from "./screens/CategoriesScreen";
import CategoryMealsScreen from "./screens/CategoryMealsScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import FiltersScreen from "./screens/FiltersScreen";
import MealDetailScreen from "./screens/MealDetailScreen";

SplashScreen.preventAutoHideAsync();

const MealsStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  function MealsStackScreen() {
    return (
      <MealsStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor:
              Platform.OS === "android" ? Colors.primaryColor : undefined,
          },
          headerTintColor:
            Platform.OS === "android" ? "white" : Colors.primaryColor,
        }}
      >
        <MealsStack.Screen
          name="Categories"
          component={CategoriesScreen}
          options={{
            title: "Meal Categories",
          }}
        />
        <MealsStack.Screen
          name="CategoryMeals"
          component={CategoryMealsScreen}
          options={({ route }) => {
            const catId = route.params.categoryId;
            const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);
            return {
              title: selectedCategory.title,
            };
          }}
        />
        <MealsStack.Screen
          name="MealDetail"
          component={MealDetailScreen}
          options={({ route }) => {
            const mealId = route.params.mealId;
            const selectedMeal = MEALS.find((meal) => meal.id === mealId);
            return {
              title: selectedMeal.title,
              headerRight: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                  <Item
                    title="Favorite"
                    iconName="ios-star"
                    onPress={() => {
                      console.log("Mark as Favorite!");
                    }}
                  />
                </HeaderButtons>
              ),
            };
          }}
        />
      </MealsStack.Navigator>
    );
  }

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
          <OverflowMenuProvider>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  if (route.name === "Meals") {
                    return (
                      <Ionicons
                        name={
                          focused ? "ios-restaurant" : "ios-restaurant-outline"
                        }
                        size={size}
                        color={color}
                      />
                    );
                  } else if (route.name === "Favorites") {
                    return (
                      <Ionicons
                        name={focused ? "ios-star" : "ios-star-outline"}
                        size={size}
                        color={color}
                      />
                    );
                  }
                },
                tabBarInactiveTintColor: "gray",
                tabBarActiveTintColor: Colors.accentColor,
                headerShown: false,
              })}
            >
              <Tab.Screen name="Meals" component={MealsStackScreen} />
              <Tab.Screen
                name="Favorites"
                component={FavoritesScreen}
                options={{
                  tabBarLabel: "Favorites!",
                }}
              />
            </Tab.Navigator>
          </OverflowMenuProvider>
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
