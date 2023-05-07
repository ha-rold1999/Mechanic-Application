import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
} from "react-native";
import Loading from "../MainComponent/Loading";
import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { useSelector, useDispatch } from "react-redux";
import {
  postSessionLocation,
  getSessionLocation,
} from "../../../Redux/MapReducers/LocationReducers";

export default function SessionMap({ SessionID, SessionDetails }) {
  const [isLoading, setIsLoading] = useState(true);
  const { longitude, latitude, sessionMap } = useSelector(
    (state) => state.locationSlice
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const time = setInterval(() => {
      dispatch(
        postSessionLocation({
          UUID: SessionID,
          longitude: longitude,
          latitude: latitude,
        })
      );
      dispatch(getSessionLocation(SessionID));
      setIsLoading(false);
    }, 5000);
    return () => clearInterval(time);
  }, [dispatch, sessionMap]);

  if (isLoading || sessionMap === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Loading />
      </View>
    );
  } else {
    return (
      <View style={{ paddingHorizontal: 10 }}>
        <Text style={{ fontSize: 10 }}> Session ID: {SessionID}</Text>
        <MapView
          style={styles.map}
          provider="google"
          initialRegion={{
            longitude: sessionMap.ClientLocLon,
            latitude: sessionMap.ClientLocLat,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker
            icon={require("../../../assets/Icons/license.png")}
            coordinate={{
              longitude: sessionMap.MechanicLocLon,
              latitude: sessionMap.MechanicLocLat,
            }}
          />
          <Marker
            icon={require("../../../assets/Icons/person.png")}
            coordinate={{
              longitude: sessionMap.ClientLocLon,
              latitude: sessionMap.ClientLocLat,
            }}
          />
        </MapView>
        <View
          style={{
            paddingHorizontal: 10,
          }}
        >
          <View style={{ height: "10%" }}>
            <Text
              style={{ fontSize: 30, fontWeight: "600", textAlign: "center" }}
            >
              {SessionDetails.split("|")[0].split(":")[1]}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../../../assets/Icons/vehicle.png")}
                style={{ width: 30, height: 30 }}
              />
              <Text style={{ fontSize: 20, fontWeight: "400" }}>
                {SessionDetails.split("|")[4].split(":")[1]}
              </Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../../../assets/Icons/person.png")}
                style={{ width: 30, height: 30 }}
              />
              <Text style={{ fontSize: 20, fontWeight: "400" }}>
                {SessionDetails.split("|")[1].split(":")[1]}
              </Text>
            </View>
          </View>

          <View style={{ alignItems: "center" }}>
            <Pressable
              style={{
                paddingHorizontal: 30,
                paddingVertical: 10,
                backgroundColor: "#209589",
                flexDirection: "row",
                alignItems: "center",
                borderRadius: 10,
              }}
              onPress={() => {
                const phoneUrl = `tel:${
                  SessionDetails.split("|")[2].split(":")[1]
                }`;
                Linking.openURL(phoneUrl);
              }}
            >
              <Image
                source={require("../../../assets/Icons/call.png")}
                style={{ width: 30, height: 30 }}
              />
              <Text style={{ fontSize: 20, fontWeight: "500", color: "white" }}>
                {SessionDetails.split("|")[2].split(":")[1]}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.2,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "400%",
    maxHeight: 400,
    marginRight: 10,
  },
});
