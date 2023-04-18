import { useLayoutEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
// https://reactnavigation.org/docs/drawer-actions
import { DrawerActions } from "@react-navigation/native";

import { CATEGORIES } from "../data/dummy-data";
import CategoryGridTile from "../components/CategoryGridTile";
import CustomHeaderButton from "../components/HeaderButton";

export default function CategoriesScreen({ navigation }) {
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

  function renderGridItem(itemData) {
    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onSelect={() =>
          navigation.navigate("CategoryMeals", {
            categoryId: itemData.item.id,
          })
        }
      />
    );
  }

  return (
    <FlatList data={CATEGORIES} renderItem={renderGridItem} numColumns={2} />
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
