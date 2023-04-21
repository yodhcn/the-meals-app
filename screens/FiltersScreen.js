import { useLayoutEffect, useState, useCallback, useRef } from "react";
import { View, Text, StyleSheet, Switch, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
// https://reactnavigation.org/docs/drawer-actions
import { DrawerActions, useFocusEffect } from "@react-navigation/native";

import { useBoundStore } from "../stores/useBoundStore";
import CustomHeaderButton from "../components/HeaderButton";
import Colors from "../constants/colors";

function FilterSwitch(props) {
  return (
    <View style={styles.filterContainer}>
      <Text>{props.lable}</Text>
      <Switch
        trackColor={{ true: Colors.primaryColor }}
        thumbColor={Platform.OS === "android" ? Colors.primaryColor : undefined}
        value={props.state}
        onValueChange={props.onChange}
      />
    </View>
  );
}

export default function FiltersScreen({ navigation, route }) {
  console.log("render...");

  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactosFree, setIsLactosFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);
  // cache savedFilters
  const savedFiltersRef = useRef({
    glutenFree: false,
    lactosFree: false,
    vegan: false,
    vegetarian: false,
  });

  const setMealFilters = useBoundStore((state) => state.setMealFilters);

  const saveFiltersHandler = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGlutenFree,
      lactosFree: isLactosFree,
      vegan: isVegan,
      vegetarian: isVegetarian,
    };
    setMealFilters(appliedFilters);
    savedFiltersRef.current = appliedFilters;
  }, [isGlutenFree, isLactosFree, isVegan, isVegetarian]);

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
      headerRight: () => (
        <HeaderButtons left HeaderButtonComponent={CustomHeaderButton}>
          <Item title="Save" iconName="ios-save" onPress={saveFiltersHandler} />
        </HeaderButtons>
      ),
    });
  }, [navigation, saveFiltersHandler]);

  useFocusEffect(
    useCallback(() => {
      const savedFilters = savedFiltersRef.current;
      setIsGlutenFree(savedFilters.glutenFree);
      setIsLactosFree(savedFilters.lactosFree);
      setIsVegan(savedFilters.vegan);
      setIsVegetarian(savedFilters.vegetarian);
    }, [savedFiltersRef])
  );

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters / Restrictions</Text>
      <FilterSwitch
        lable="Gluten-free"
        state={isGlutenFree}
        onChange={(newValue) => setIsGlutenFree(newValue)}
      />
      <FilterSwitch
        lable="Lactose-free"
        state={isLactosFree}
        onChange={(newValue) => setIsLactosFree(newValue)}
      />
      <FilterSwitch
        lable="Vegan"
        state={isVegan}
        onChange={(newValue) => setIsVegan(newValue)}
      />
      <FilterSwitch
        lable="Vegetarian"
        state={isVegetarian}
        onChange={(newValue) => setIsVegetarian(newValue)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    margin: 20,
    textAlign: "center",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginVertical: 15,
  },
});
