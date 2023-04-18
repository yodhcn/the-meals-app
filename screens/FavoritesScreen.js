import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { MEALS } from "../data/dummy-data";
import MealList from "../components/MealList";

export default function FavoritesScreen(props) {
  const favMeals = MEALS.filter((meal) => meal.id === "m1" || meal.id == "m2");
  return <MealList listData={favMeals} />;
}

const styles = StyleSheet.create({});
