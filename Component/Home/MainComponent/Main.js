import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ShopStack from "./Views/ShopViews/ShopViewStack";
import MainViewStack from "./Views/MainViews/MainViewStack";
import ProfileStack from "./Views/ProfileViews/ProfileStack";
import BillingStack from "./Views/BilllingViews/BillingStack";

export default function Main() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        showLabel: true,
        style: {
          position: "absolute",
          bottom: 25,
          screenLeft: 20,
          right: 20,
          elevation: 0,
          backgroundColor: "#ffffff",
          borderRadius: 15,
          height: 90,
          ...styles.shadow,
        },
      }}
      initialRouteName="Request"
    >
      <Tab.Screen
        name="Request"
        component={MainViewStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../../../assets/Icons/request.png")}
                resizeMode="contain"
                style={{ ...styles.iconSize }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="My Shop"
        component={ShopStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../../../assets/Icons/shop.png")}
                resizeMode="contain"
                style={{ ...styles.iconSize }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Billing"
        component={BillingStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../../../assets/Icons/history.png")}
                resizeMode="contain"
                style={{ ...styles.iconSize }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="My Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../../../assets/Icons/person.png")}
                resizeMode="contain"
                style={{ ...styles.iconSize }}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  iconSize: {
    width: 25,
    height: 25,
  },
});
