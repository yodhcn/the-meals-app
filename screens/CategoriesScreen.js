import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function CategoriesScreen(props) {
  return (
    <View style={styles.screen}>
      <Text>The Categories Screen!</Text>
      <Button
        title="Go to Meals!"
        onPress={() => props.navigation.navigate("CategoryMeals")}
      />
      <Button
        title="Go to Categories!"
        onPress={() => props.navigation.push("Categories")}
      />
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
