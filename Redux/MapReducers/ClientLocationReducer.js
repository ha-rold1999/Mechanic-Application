import { createSlice } from "@reduxjs/toolkit";
import { server, apiKey } from "../../Static";

export const clientLocationSlice = createSlice({
  name: "clientLocationSlice",
  initialState: { longitude: "", latitude: "" },
  reducers: {
    getLocation: (state, action) => {
      state.latitude = action.payload.Data.Latitude;
      state.longitude = action.payload.Data.Longitude;
    },
    deleteClientLocData: (state, action) => {
      state.latitude = "";
      state.longitude = "";
    },
  },
});

export const { getLocation, deleteClientLocData } = clientLocationSlice.actions;
export const clientLocationSliceReducer = clientLocationSlice.reducer;

export const getClientLocation = (UUID) => async (dispatch) => {
  try {
    fetch(`${server}/api/TemporaryRoute/MapLocation`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "AYUS-API-KEY": apiKey,
        UUID: UUID,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        dispatch(getLocation(response));
      })
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }
};
