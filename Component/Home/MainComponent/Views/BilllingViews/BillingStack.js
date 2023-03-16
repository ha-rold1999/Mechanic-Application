import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BillingList from "./BillingList";
import BillingDetails from "./BillingDetails";
import BillingCard from "./BillingCard";

export default function BillingStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="BillingList"
    >
      <Stack.Screen name="BillingList" component={BillingList} />
      <Stack.Screen name="BillingDetails" component={BillingDetails} />
      <Stack.Screen name="BillingCard" component={BillingCard} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
