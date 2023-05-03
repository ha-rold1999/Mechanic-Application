import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import Loading from "../MainComponent/Loading";

export default function CustomerLocation() {
  const { longitude, latitude } = useSelector(
    (state) => state.clientLocationSlice
  );
  const coordinates = [{ latitude: latitude, longitude: longitude }];

  if (longitude !== "") {
    return (
      <MapView
        style={styles.map}
        ref={(ref) => {
          mapRef = ref;
        }}
        provider="google"
        initialRegion={{
          longitude: longitude,
          latitude: latitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={{
            longitude: longitude,
            latitude: latitude,
          }}
        />
      </MapView>
    );
  }

  return (
    <>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Loading />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
