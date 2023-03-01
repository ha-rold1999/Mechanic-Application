import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { BackHandler } from "react-native";
import Main from "./Home/MainComponent/Main";
import Setting from "./Home/SettingComponent/Setting";

import * as Location from "expo-location";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLocation } from "../Redux/MapReducers/LocationReducers";

export default function HomeComponent() {
  const { UUID } = useSelector((state) => state.profileSlice);
  const Drawer = createDrawerNavigator();
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          BackHandler.exitApp();
        }
        let location = await Location.getCurrentPositionAsync();
        dispatch(
          getLocation({
            longitude: location.coords.longitude,
            latitude: location.coords.latitude,
            UUID: UUID,
          })
        );
      })();
    }, 10000);
  }, []);

  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Main} />
        <Drawer.Screen name="Setting" component={Setting} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
