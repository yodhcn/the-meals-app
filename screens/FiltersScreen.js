import { useLayoutEffect, useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Switch, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
// https://reactnavigation.org/docs/drawer-actions
import { DrawerActions } from "@react-navigation/native";

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
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactosFree, setIsLactosFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGlutenFree,
      lactosFree: isLactosFree,
      vegan: isVegan,
      vegetarian: isVegetarian,
    };

    console.log(appliedFilters);
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
          <Item
            title="Save"
            iconName="ios-save"
            onPress={() => {
              console.log(route.params);
              route.params.save();
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation, route]);

  useEffect(() => {
    console.log("set route params");
    navigation.setParams({ save: saveFilters });
  }, [saveFilters]);

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
