import { useCallback } from "react";
import { View, StyleSheet } from "react-native";

import DefaultText from "../components/DefaultText";
import MealList from "../components/MealList";
import { useBoundStore } from "../stores/useBoundStore";

export default function CategoryMealsScreen({ route }) {
  const catId = route.params.categoryId;

  const displayedMeals = useBoundStore(
    useCallback(
      (state) =>
        state.filteredMeals.filter((meal) => meal.categoryIds.includes(catId)),
      [catId]
    )
  );

  if (displayedMeals.length === 0) {
    return (
      <View style={styles.content}>
        <DefaultText>No meals found, maby check your filters?</DefaultText>
      </View>
    );
  }

  return <MealList listData={displayedMeals} />;
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
