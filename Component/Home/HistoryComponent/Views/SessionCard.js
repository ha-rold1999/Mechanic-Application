import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
  Image,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import * as Clipboard from "expo-clipboard";

export default function SessionCard({ data }) {
  return (
    <LinearGradient
      colors={["#cff5fb", "#fcfdfd"]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View
        style={{
          borderWidth: 1,
          margin: 4,
          elevation: 5,
          backgroundColor: "white",
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 10,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => {
              Clipboard.setStringAsync(data.item.SessionID);
              ToastAndroid.show("Text Copied", ToastAndroid.SHORT);
            }}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Text style={{ fontSize: 13 }}>
              {" "}
              Session ID: {data.item.SessionID}
            </Text>
            <View style={{ alignItems: "flex-end" }}>
              <Image
                source={require("../../../../assets/Icons/copy.png")}
                style={{ width: 15, height: 15 }}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 5,
          }}
        >
          <Image
            source={require("../../../../assets/Icons/service.png")}
            style={{ width: 20, height: 20 }}
          />
          <Text>{data.item.SessionDetails.split("|")[0].split(":")[1]}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 5,
          }}
        >
          <Image
            source={require("../../../../assets/Icons/car.png")}
            style={{ width: 20, height: 20 }}
          />
          <Text>{data.item.SessionDetails.split("|")[4].split(":")[1]}</Text>
        </View>
        {console.log(data.item.TimeStart)}
        <Text style={{ marginTop: 5 }}>
          {" "}
          Time start: {data.item.TimeStart.split("T")[0]}{" "}
          {data.item.TimeStart.split("T")[1].split(".")[0]}
        </Text>
        <Text style={{ marginTop: 5 }}>
          {" "}
          Time end: {data.item.TimeEnd.split("T")[0]}{" "}
          {data.item.TimeEnd.split("T")[1].split(".")[0]}
        </Text>
      </View>
    </LinearGradient>

    // <View
    //   style={{
    //     borderWidth: 1,
    //     margin: 4,
    //     elevation: 5,
    //     backgroundColor: "pink",
    //   }}
    // >
    //   <Text>Session ID: {data.item.SessionID}</Text>
    //   <Text>Mechanic ID: {data.item.MechanicUUID}</Text>
    //   <Text>Details: {data.item.SessionDetails}</Text>
    //   <Text>Time start: {data.item.TimeStart}</Text>
    //   <Text>Time end: {data.item.TimeEnd}</Text>
    // </View>
  );
}

const styles = StyleSheet.create({});
