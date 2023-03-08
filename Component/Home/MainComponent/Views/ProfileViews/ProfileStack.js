import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "./ProfileView";
import ProfileDelete from "./ProfileDelete";
import ChangePassword from "./ChangePassword";
import ChangeProfile from "./ChangeProfile";

export default function ProfileStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Delete" component={ProfileDelete} />
      <Stack.Screen name="ChangePass" component={ChangePassword} />
      <Stack.Screen name="ChangeProf" component={ChangeProfile} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
