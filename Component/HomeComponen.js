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
import { Alert, View } from "react-native";
import PhoneCamera from "./Home/MainComponent/Views/ProfileViews/Camera";
import { getUserWallet } from "../Redux/WalletReducers/WalletReducer";
import { Linking } from "react-native";
import { deleteProfileData } from "../Redux/ProfileReducers/ProfileReducer";
import { adminserver } from "../Static";
import Loading from "./Home/MainComponent/Loading";

export default function HomeComponent({ navigation }) {
  const { UUID, Suspended } = useSelector((state) => state.profileSlice);
  const { balance } = useSelector((state) => state.walletSlice);
  const Drawer = createDrawerNavigator();
  const [hasBalance, setHasbalance] = useState(true);
  const dispatch = useDispatch();
  const [hasLicense, setHasLicense] = useState(true);
  const [openCamera, setOpenCamera] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);
  const [loading, setLoading] = useState(true);

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
    dispatch(getUserWallet(UUID));
  }, []);

  useEffect(() => {
    if (balance != null) {
      if (balance <= 0) {
        setHasbalance(false);
        console.log(balance);
        Alert.alert("Empty Wallet", "Wallet is Empty", [
          {
            text: "Add Balance",
            onPress: () => {
              console.log("add bal");
              let url = `${adminserver}/gcash?merchant=AYUS@ICTEAM&amount=100&redirecturl=AYUS_UID_${UUID}_AMT_100`;
              console.log(url);
              Linking.openURL(url);
              setHasbalance(true);
            },
          },
          {
            text: "Cancel",
            onPress: () => {
              dispatch(isOnline(UUID, false));
              dispatch(deleteProfileData(""));
              setHasbalance(true);
              navigation.reset({ index: 0, routes: [{ name: "Login" }] });
            },
          },
        ]);
        setLoading(false);
      } else {
        setHasbalance(true);
        setLoading(false);
      }
    }
  }, [balance, hasLicense]);

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
  // {
  //   !hasBalance &&
  //     balance <= 0 &&
  //     Alert.alert("Empty Wallet", "Wallet is Empty", [
  //       {
  //         text: "Add Balance",
  //         onPress: () => {
  //           console.log("add bal");
  //           let url = `${adminserver}/gcash?merchant=AYUS@ICTEAM&amount=100&redirecturl=AYUS_UID_${UUID}_AMT_100`;
  //           console.log(url);
  //           Linking.openURL(url);
  //           setHasbalance(true);
  //         },
  //       },
  //       {
  //         text: "Cancel",
  //         onPress: () => {
  //           dispatch(isOnline(UUID, false));
  //           dispatch(deleteProfileData(""));
  //           setHasbalance(true);
  //           navigation.reset({ index: 0, routes: [{ name: "Login" }] });
  //         },
  //       },
  //     ]);
  // }
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Loading />
      </View>
    );
  }
  return (
    <>
      {Suspended && <SuspendedModal navigation={navigation}/>}
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
