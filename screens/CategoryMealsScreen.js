import React from "react";
import { StyleSheet } from "react-native";

import { MEALS } from "../data/dummy-data";
import MealList from "../components/MealList";

export default function CategoryMealsScreen({ route }) {
  const catId = route.params.categoryId;
  const displayedMeals = MEALS.filter((meal) =>
    meal.categoryIds.includes(catId)
  );

  return <MealList listData={displayedMeals} />;
}

const styles = StyleSheet.create({});
