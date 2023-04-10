import { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ToastAndroid,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getReview } from "../../../../../Redux/RequestListReducer/RequestListReducer";
import { AirbnbRating, Rating } from "react-native-ratings";
import PhoneCamera from "./Camera";
import { server } from "../../../../../Static";
import { LinearGradient } from "expo-linear-gradient";
import * as Clipboard from "expo-clipboard";
import Icon from "react-native-vector-icons/FontAwesome";
import { getUserWallet } from "../../../../../Redux/WalletReducers/WalletReducer";

export default function Profile({ navigation }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageUrl, setImageURL] = useState("");
  const [openCamera, setOpenCamera] = useState(false);
  const {
    UUID,
    Firstname,
    Lastname,
    Contact,
    Birthdate,
    Address,
    Profile,
    Expiry,
  } = useSelector((state) => state.profileSlice);
  const { myRating } = useSelector((state) => state.requestListSlice);
  const dispatch = useDispatch();
  const { balance } = useSelector((state) => state.walletSlice);

  useEffect(() => {
    dispatch(getReview(UUID, "Profile"));
    dispatch(getUserWallet(UUID));
  }, []);

  const image = `${server}/api/Upload/files/${UUID}/PROFILE`;

  if (!isLoaded) {
    setImageURL(image + "?" + new Date());
    setIsLoaded(true);
  }

  if (myRating !== null) {
    return (
      <LinearGradient
        colors={["#cff5fb", "#fcfdfd"]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={{ flex: 1 }}>
          {/* ID */}
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => {
                Clipboard.setStringAsync(UUID);
                ToastAndroid.show("Text Copied", ToastAndroid.SHORT);
              }}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <Text>ID: {UUID}</Text>
              <View style={{ alignItems: "flex-end" }}>
                <Image
                  source={require("../../../../../assets/Icons/copy.png")}
                  style={{ width: 15, height: 15 }}
                />
              </View>
            </TouchableOpacity>
          </View>

          {/* Card View */}
          <View
            style={{
              width: "100%",
              height: "30%",
              backgroundColor: "#fff",
              borderRadius: 10,
              elevation: 3,
              padding: 10,
              marginVertical: 10,
              marginRight: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "red",
                width: "30%",
                height: "60%",
                elevation: 4,
                borderRadius: 100,
              }}
            >
              <Image
                source={{ uri: imageUrl }}
                style={{ width: "100%", height: "100%", borderRadius: 100 }}
              />
              <TouchableOpacity
                onPress={() => {
                  setOpenCamera(true);
                }}
                style={style.button}
              >
                <Icon name="camera-retro" size={20} style={style.icon} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: "50%",
                marginLeft: 10,
              }}
            >
              <Text
                adjustsFontSizeToFit={true}
                numberOfLines={2}
                style={{ fontSize: 30, fontWeight: "bold" }}
              >
                {Firstname} {Lastname}
              </Text>
              <Text>Mechanic</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Rating
                  type="custom"
                  startingValue={myRating.Rating}
                  readonly={true}
                  imageSize={20}
                />
                <Text style={{ fontSize: 20 }}>
                  {myRating.Rating.toFixed(2)}/5
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={require("../../../../../assets/Icons/wallet.png")}
                  style={{ width: 20, height: 20, marginRight: 5 }}
                />
                <Text>My Balance: {balance}</Text>
              </View>
            </View>
            <View
              style={{
                width: "15%",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ChangeProf");
                }}
                style={style.button}
              >
                <Icon name="edit" size={40} style={style.icon} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={style.detailContainers}>
            <View style={{ width: "10%", alignItems: "center" }}>
              <Icon name="phone" size={25} style={style.labelIcon} />
              <Icon
                name="map-marker"
                size={25}
                style={{ ...style.labelIcon, paddingBottom: 35 }}
              />
              <Image
                source={require("../../../../../assets/Icons/expired.png")}
                style={{ width: 25, height: 25 }}
              />
            </View>
            <View style={style.detailInfoContainer}>
              <Text style={style.lebelText}>Contact Number</Text>
              <Text style={style.lebelText}>Address</Text>
              <Text style={style.lebelText}>License Expiry</Text>
            </View>
            <View style={style.detailInfoContainer}>
              <Text style={{ ...style.lebelText, fontWeight: "800" }}>
                {Contact}
              </Text>
              <Text style={{ ...style.lebelText, fontWeight: "800" }}>
                {Address}
              </Text>
              <Text style={{ ...style.lebelText, fontWeight: "800" }}>
                {Expiry.split("T")[0]}
              </Text>
            </View>
          </View>
          <PhoneCamera
            openCamera={openCamera}
            setOpenCamera={setOpenCamera}
            setIsLoaded={setIsLoaded}
          />
        </View>
      </LinearGradient>
    );
  }
  return (
    <View>
      <ActivityIndicator />
    </View>
  );
}

const style = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
  },
  icon: {
    color: "grey",
  },
  text: {
    color: "white",
    paddingLeft: 5,
  },
  labelIcon: {
    color: "black",
    paddingVertical: 18,
  },
  lebelText: {
    fontSize: 15,
    paddingVertical: 20,
    paddingLeft: 10,
  },
  lebelContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
  },
  detailContainers: {
    flex: 1,
    flexDirection: "row",
  },
  detailInfoContainer: {
    width: "45%",
    height: "100%",
  },
});
