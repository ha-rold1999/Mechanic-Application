import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import React, { useRef } from "react";
import { useSelector } from "react-redux";

export default function MapLocation() {
  const { longitude, latitude } = useSelector((state) => state.locationSlice);
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

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
    elevation: 5,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
