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
import SuspendedModal from "./Signup/ModalComponent/LoginModalMessage/SuspendedModal";
import { isOnline } from "../Redux/ProfileReducers/ProfileReducer";
import { server } from "../Static";
import { useState } from "react";
import { Alert } from "react-native";
import PhoneCamera from "./Home/MainComponent/Views/ProfileViews/Camera";

export default function HomeComponent() {
  const { UUID, Suspended } = useSelector((state) => state.profileSlice);
  const Drawer = createDrawerNavigator();
  const dispatch = useDispatch();
  const [hasLicense, setHasLicense] = useState(true);
  const [openCamera, setOpenCamera] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);

  fetch(`${server}/api/Upload/files/${UUID}/LICENSE`)
    .then((response) => {
      if (response.status === 200) {
        setHasLicense(true);
      } else {
        setHasLicense(false);
      }
    })
    .catch((error) => {
      console.log("Error: " + error);
    });

  useEffect(() => {
    dispatch(getCurrentLocation(UUID));
    dispatch(isOnline(UUID, true));
  }, []);

  {
    !hasLicense &&
      !openCamera &&
      Alert.alert(
        "Proof license",
        "Please upload a picture of your drivers license",
        [
          {
            text: "OK",
            onPress: () => {
              setHasLicense(true);
              setOpenCamera(true);
            },
          },
        ]
      );
  }
  return (
    <>
      {Suspended && <SuspendedModal />}
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Main} />
        <Drawer.Screen name="History" component={HistoryTabs} />
        <Drawer.Screen name="Logout" component={LogoutView} />
      </Drawer.Navigator>
      <PhoneCamera
        openCamera={openCamera}
        setOpenCamera={setOpenCamera}
        setIsLoaded={setIsLoaded}
        upload={"LICENSE"}
      />
    </>
  );
}
