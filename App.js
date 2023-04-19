import "react-native-gesture-handler";
import React, { useCallback } from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// https://github.com/vonovak/react-navigation-header-buttons/issues/152
import { createStackNavigator as createNativeStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  OverflowMenuProvider,
  HeaderButtons,
  Item,
} from "react-navigation-header-buttons";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import Colors from "./constants/colors";
import HeaderButton from "./components/HeaderButton";
import { CATEGORIES, MEALS } from "./data/dummy-data";
import CategoriesScreen from "./screens/CategoriesScreen";
import CategoryMealsScreen from "./screens/CategoryMealsScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import FiltersScreen from "./screens/FiltersScreen";
import MealDetailScreen from "./screens/MealDetailScreen";

SplashScreen.preventAutoHideAsync();

const Drawer = createDrawerNavigator();
const MealsStack = createNativeStackNavigator();
const FavoritesStack = createNativeStackNavigator();
const FiltersStack = createNativeStackNavigator();
const Tab =
  Platform.OS == "android"
    ? createMaterialBottomTabNavigator()
    : createBottomTabNavigator();

export default function App() {
  const defaultStackNavOptions = {
    headerStyle: {
      backgroundColor:
        Platform.OS === "android" ? Colors.primaryColor : undefined,
    },
    headerTitleStyle: {
      fontFamily: "open-sans-bold",
    },
    headerBackTitleStyle: {
      fontFamily: "open-sans",
    },
    headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
  };

  function MealsStackScreen() {
    return (
      <MealsStack.Navigator screenOptions={defaultStackNavOptions}>
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

  function FavoritesStackScreen() {
    return (
      <FavoritesStack.Navigator screenOptions={defaultStackNavOptions}>
        <FavoritesStack.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{
            title: "Favorites",
          }}
        />
        <FavoritesStack.Screen
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
      </FavoritesStack.Navigator>
    );
  }

  function FiltersStackScreen() {
    return (
      <FiltersStack.Navigator screenOptions={defaultStackNavOptions}>
        <FiltersStack.Screen
          name="Filters"
          component={FiltersScreen}
          options={{
            title: "Filters",
          }}
        />
      </FiltersStack.Navigator>
    );
  }

  function MealsFavTabScreen() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            const iconSize = 25;
            if (route.name === "MealsStack") {
              return (
                <Ionicons
                  name={focused ? "ios-restaurant" : "ios-restaurant-outline"}
                  size={iconSize}
                  color={color}
                />
              );
            } else if (route.name === "FavoritesStack") {
              return (
                <Ionicons
                  name={focused ? "ios-star" : "ios-star-outline"}
                  size={iconSize}
                  color={color}
                />
              );
            }
          },
          tabBarInactiveTintColor: "gray",
          tabBarActiveTintColor: Colors.accentColor,
          headerShown: false,
          tabBarLabelStyle: {
            fontFamily: "open-sans",
          },
        })}
        activeColor="white"
        inactiveColor="gray"
        barStyle={{ backgroundColor: Colors.primaryColor }}
        shifting={true}
      >
        <Tab.Screen
          name="MealsStack"
          component={MealsStackScreen}
          options={{
            tabBarLabel:
              Platform.OS === "android" ? (
                <Text style={{ fontFamily: "open-sans" }}>Meals!</Text>
              ) : (
                "Meals!"
              ),
          }}
        />
        <Tab.Screen
          name="FavoritesStack"
          component={FavoritesStackScreen}
          options={{
            tabBarLabel:
              Platform.OS === "android" ? (
                <Text style={{ fontFamily: "open-sans-bold" }}>Favorites!</Text>
              ) : (
                "Favorites!"
              ),
          }}
        />
      </Tab.Navigator>
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
            <Drawer.Navigator
              screenOptions={{
                headerShown: false,
                drawerActiveTintColor: Colors.accentColor,
                drawerLabelStyle: {
                  fontFamily: "open-sans-bold",
                },
              }}
            >
              <Drawer.Screen
                name="MealsFavTab"
                component={MealsFavTabScreen}
                options={{ drawerLabel: "Meals" }}
              />
              <Drawer.Screen
                name="FiltersStack"
                component={FiltersStackScreen}
                options={{ drawerLabel: "Filters" }}
              />
            </Drawer.Navigator>
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
