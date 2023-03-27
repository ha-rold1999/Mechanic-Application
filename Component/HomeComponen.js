import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./Home/MainComponent/Main";
import Setting from "./Home/SettingComponent/Setting";
import ShowMaps from "./Home/MapComponent/Maps";
import LogoutView from "./Home/LogoutComponent/LogoutView";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentLocation } from "../Redux/MapReducers/LocationReducers";
import WalletStack from "./Home/WalletComponent/WalletStack";
import HistoryTabs from "./Home/HistoryComponent/HistoryTabs";

export default function HomeComponent() {
  const { UUID } = useSelector((state) => state.profileSlice);
  const Drawer = createDrawerNavigator();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentLocation(UUID));
  }, []);

  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Main} />
      <Drawer.Screen name="History" component={HistoryTabs} />
      <Drawer.Screen name="Setting" component={Setting} />
      <Drawer.Screen name="Map" component={ShowMaps} />
      <Drawer.Screen name="Logout" component={LogoutView} />
      <Drawer.Screen name="WalletStack" component={WalletStack} />
    </Drawer.Navigator>
  );
}
