import { createSlice } from "@reduxjs/toolkit";
import { server, apiKey } from "../../Static";
import * as Location from "expo-location";

import { BackHandler } from "react-native";

export const locationSlice = createSlice({
  name: "locationSlice",
  initialState: { longitude: "", latitude: "", UUID: "" },
  reducers: {
    postLocation: (state, action) => {
      state.longitude = action.payload.longitude;
      state.latitude = action.payload.latitude;
      state.UUID = action.payload.UUID;

      fetch(`${server}/api/TemporaryRoute/MapLocation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "AYUS-API-KEY": apiKey,
        },
        body: JSON.stringify({
          uuid: state.UUID, // any UUID as long as you can access it.
          latitude: state.latitude,
          longitude: state.longitude,
          additionData: "POST Location of user",
        }),
      })
        .then((res) => res.json())
        .then((response) => console.log(JSON.stringify(response)))
        .catch((err) => console.log(err));
    },
  },
});

export const { postLocation } = locationSlice.actions;
export const locationSliceReducer = locationSlice.reducer;

export const getCurrentLocation = (UUID) => (dispatch) => {
  setInterval(() => {
    const getLoc = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        BackHandler.exitApp();
      }
      let location = await Location.getCurrentPositionAsync();
      dispatch(
        postLocation({
          longitude: location.coords.longitude,
          latitude: location.coords.latitude,
          UUID: UUID,
        })
      );
    };
    getLoc();
  }, 10000);
};
