import { createSlice } from "@reduxjs/toolkit";
import { server, apiKey } from "../../Static";
import * as Location from "expo-location";

import { BackHandler } from "react-native";

export const locationSlice = createSlice({
  name: "locationSlice",
  initialState: { longitude: "", latitude: "", UUID: "", sessionMap: null },
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
        .catch((err) => console.log(err));
    },

    postSessionLocation: (state, action) => {
      fetch(`${server}/api/Sessions/MapLocation`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "AYUS-API-KEY": apiKey,
          SessionID: action.payload.UUID, // any UUID as long as you can access it.
          MechanicLocLat: action.payload.latitude,
          MechanicLocLon: action.payload.longitude,
        },
      })
        .then((res) => res.json())
        .catch((err) => console.log(err));
    },

    saveSessionLocation: (state, action) => {
      state.sessionMap = action.payload;
    },
  },
});

export const { postLocation, postSessionLocation, saveSessionLocation } =
  locationSlice.actions;
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

export const getSessionLocation = (UUID) => (dispatch) => {
  try {
    fetch(`${server}/api/Sessions/MapLocation`, {
      method: "GET",
      headers: {
        "AYUS-API-KEY": apiKey,
        SessionID: UUID,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.Status === 201) {
          dispatch(saveSessionLocation(data.Data));
        }
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
};
