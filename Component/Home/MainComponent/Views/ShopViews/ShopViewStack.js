import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Shop from "./ShopView";
import AddService from "./AddServiceView";

export default function ShopStack() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={"ShopDesc"}
      >
        <Stack.Screen name="ShopDesc" component={Shop} />
        <Stack.Screen name="AddService" component={AddService} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
