import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Shop from "./ShopView";
import AddService from "./AddServiceView";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchService } from "../../../../../Redux/ProfileReducers/ServiceReducer";

export default function ShopStack() {
  const { UUID } = useSelector((state) => state.profileSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    const time = setInterval(() => {
      dispatch(fetchService(UUID));
    }, 10000);

    return () => clearInterval(time);
  }, [dispatch]);

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
