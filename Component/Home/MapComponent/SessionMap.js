import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
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
    }, 10000);
    return () => clearInterval(time);
  }, [dispatch]);

  if (isLoading || sessionMap === null) {
    return <ActivityIndicator />;
  } else {
    return (
      <View>
        <MapView
          style={styles.map}
          provider="google"
          initialRegion={{
            longitude: longitude,
            latitude: latitude,
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
        <Text>{SessionDetails}</Text>
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
  },
});
