import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RequestList from "./Views/MainViews/RequestList";
import Profile from "./Views/ProfileViews/ProfileView";

export default function Main() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="MainView"
    >
      <Tab.Screen name="MainView" component={RequestList} />
      <Tab.Screen name="ProfileView" component={Profile} />
    </Tab.Navigator>
  );
}
