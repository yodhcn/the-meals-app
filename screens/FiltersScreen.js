import { useLayoutEffect, useState } from "react";
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

export default function FiltersScreen({ navigation }) {
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactosFree, setIsLactosFree] = useState(false);
  const [isVeganFree, setIsVeganFree] = useState(false);
  const [isVegetarianFree, setIsVegetarianFree] = useState(false);

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
        lable="Vegan-free"
        state={isVeganFree}
        onChange={(newValue) => setIsVeganFree(newValue)}
      />
      <FilterSwitch
        lable="Vegetarian-free"
        state={isVegetarianFree}
        onChange={(newValue) => setIsVegetarianFree(newValue)}
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
