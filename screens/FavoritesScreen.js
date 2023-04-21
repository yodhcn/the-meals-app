import { useLayoutEffect } from "react";
import { StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
// https://reactnavigation.org/docs/drawer-actions
import { DrawerActions } from "@react-navigation/native";

import { useBoundStore } from "../stores/useBoundStore";
import MealList from "../components/MealList";
import CustomHeaderButton from "../components/HeaderButton";

export default function FavoritesScreen({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderButtons left HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Menu"
            iconName="ios-menu"
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  const favMeals = useBoundStore((state) => state.favoriteMeals);
  return <MealList listData={favMeals} />;
}

const styles = StyleSheet.create({});
