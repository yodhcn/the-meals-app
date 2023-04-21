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
  setMealFilters: (filters) =>
    set((state) => {
      state.filteredMeals = state.meals.filter((meal) => {
        if (filters.glutenFree && !meal.isGlutenFree) {
          return false;
        }
        if (filters.lactosFree && !meal.isLactosFree) {
          return false;
        }
        if (filters.vegan && !meal.isVegan) {
          return false;
        }
        if (filters.vegetarianFree && !meal.isVegetarianFree) {
          return false;
        }

        return true;
      });
    }),
});
