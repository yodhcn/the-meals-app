import { MEALS } from "../data/dummy-data";

export const createMealSlice = (set) => ({
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: [],
  toggleFavoriteMeal: (mealId) =>
    set((state) => {
      const existingIndex = state.favoriteMeals.findIndex(
        (meal) => meal.id === mealId
      );
      if (existingIndex >= 0) {
        state.favoriteMeals.splice(existingIndex, 1);
      } else {
        const meal = state.meals.find((meal) => meal.id === mealId);
        state.favoriteMeals.push(meal);
      }
    }),
});
