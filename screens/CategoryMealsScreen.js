import { useCallback } from "react";
import { StyleSheet } from "react-native";

import MealList from "../components/MealList";
import { useBoundStore } from "../stores/useBoundStore";

export default function CategoryMealsScreen({ route }) {
  const catId = route.params.categoryId;

  const displayedMeals = useBoundStore(
    useCallback(
      (state) => state.meals.filter((meal) => meal.categoryIds.includes(catId)),
      [catId]
    )
  );

  return <MealList listData={displayedMeals} />;
}

const styles = StyleSheet.create({});
