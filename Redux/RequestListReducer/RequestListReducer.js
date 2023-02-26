import { createSlice } from "@reduxjs/toolkit";
import { apiKey } from "../../Static";

export const requestListSlice = createSlice({
  name: "requestListSlice",
  initialState: { requestList: [] },
  reducers: {
    getServiceRequest: (state, action) => {
      state.requestList = action.payload;
    },
  },
});

export const { getServiceRequest } = requestListSlice.actions;
export const requestList = (state) => state.requestList;
export const requestListSliceReducer = requestListSlice.reducer;

export const fetchRequestList = (UUID) => async (dispatch) => {
  try {
    await fetch("http://203.177.71.218:5003/api/ServiceRequest", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "AYUS-API-KEY": apiKey,
        MechanicUUID: UUID,
      },
    })
      .then((res) => res.json())
      .then((data) => dispatch(getServiceRequest(data)))
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }
};
