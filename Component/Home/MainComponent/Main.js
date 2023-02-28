import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "./Views/ProfileViews/ProfileView";
import ShopStack from "./Views/ShopViews/ShopViewStack";
import MainViewStack from "./Views/MainViews/MainViewStack";

export default function Main() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Request"
    >
      <Tab.Screen name="My Shop" component={ShopStack} />
      <Tab.Screen name="Request" component={MainViewStack} />
      <Tab.Screen name="My Profile" component={Profile} />
    </Tab.Navigator>
  );
}
