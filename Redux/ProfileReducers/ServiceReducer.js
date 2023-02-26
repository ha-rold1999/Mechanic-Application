import { createSlice } from "@reduxjs/toolkit";
import { apiKey } from "../../Static";

export const serviceSlice = createSlice({
  name: "serviceSlice",
  initialState: { serviceLst: [], error: "" },
  reducers: {
    getService: (state, action) => {
      state.serviceLst = action.payload.Info;
      console.log(JSON.stringify(state.serviceLst, null, 2));
    },
    getServiceError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { getService, getServiceError } = serviceSlice.actions;
export const serviceSliceReducer = serviceSlice.reducer;

export const fetchService = (uuid) => async (dispatch) => {
  try {
    await fetch("http://203.177.71.218:5003/api/Mechanic/ServiceOffer", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "AYUS-API-KEY": apiKey,
        MechanicUUID: uuid,
      },
    })
      .then((res) => res.json())
      .then((data) => dispatch(getService(data)))
      .catch((error) => dispatch(getServiceError(error.message)));
  } catch (error) {
    console.log("Error on ServiceReucer: " + error);
  }
};
