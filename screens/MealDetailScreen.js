import { useLayoutEffect, useCallback } from "react";
import { ScrollView, Image, View, Text, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/HeaderButton";
import DefaultText from "../components/DefaultText";
import { useBoundStore } from "../stores/useBoundStore";

function ListItem(props) {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
}

export default function MealDetailScreen({ navigation, route }) {
  const mealId = route.params.mealId;

  const selectedMeal = useBoundStore(
    useCallback(
      (state) => state.meals.find((meal) => meal.id === mealId),
      [mealId]
    )
  );

  const toggleFavoriteMeal = useBoundStore((state) => state.toggleFavoriteMeal);

  const toggleFavoriteMealHandler = useCallback(
    () => toggleFavoriteMeal(selectedMeal.id),
    [toggleFavoriteMeal, selectedMeal.id]
  );

  const selectedMealIsFavorite = useBoundStore(
    useCallback(
      (state) => state.favoriteMeals.some((meal) => meal.id === mealId),
      [mealId]
    )
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: selectedMeal.title,
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Favorite"
            iconName={selectedMealIsFavorite ? "ios-star" : "ios-star-outline"}
            onPress={toggleFavoriteMealHandler}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation, selectedMeal.id, selectedMeal.title, selectedMealIsFavorite]);

  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <DefaultText>{selectedMeal.duration}</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {selectedMeal.ingredients.map((ingredient) => (
        <ListItem key={ingredient}>{ingredient}</ListItem>
      ))}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map((step) => (
        <ListItem key={step}>{step}</ListItem>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  details: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    textAlign: "center",
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
  },
});
