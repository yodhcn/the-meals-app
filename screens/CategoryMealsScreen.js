import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

import { MEALS } from "../data/dummy-data";

export default function CategoryMealsScreen({ route, navigation }) {
  const catId = route.params.categoryId;
  const displayedMeals = MEALS.filter((meal) =>
    meal.categoryIds.includes(catId)
  );

  function renderMealItem(itemData) {
    return (
      <View>
        <Text>{itemData.item.title}</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList data={displayedMeals} renderItem={renderMealItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
