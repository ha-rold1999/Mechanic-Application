import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import React, { useRef } from "react";
import { useSelector } from "react-redux";

export default function CustomerLocation() {
  const { longitude, latitude } = useSelector(
    (state) => state.clientLocationSlice
  );
  const coordinates = [{ latitude: latitude, longitude: longitude }];

  if (longitude !== "") {
    return (
      <View style={styles.container}>
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
      </View>
    );
  }

  return (
    <>
      <ActivityIndicator />
    </>
  );
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
  },
});
