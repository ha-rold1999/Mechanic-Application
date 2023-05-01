import { createSlice } from "@reduxjs/toolkit";
import { apiKey, server } from "../../Static";

export const serviceSlice = createSlice({
  name: "serviceSlice",
  initialState: { serviceLst: [], error: "" },
  reducers: {
    getService: (state, action) => {
      state.serviceLst = action.payload.Info;
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
    await fetch(`${server}/api/Mechanic/ServiceOffer`, {
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

export const deleteService = (UUID, serviceID) => () => {
  console.log("ServiceID: " + serviceID);
  fetch(`${server}/api/Mechanic/ServiceOffer`, {
    method: "DELETE",
    headers: {
      "AYUS-API-KEY": apiKey,
      MechanicUUID: UUID,
      ServiceOfferUUID: serviceID,
    },
  })
    .then((res) => res.json())
    .then((res) => console.log(JSON.stringify(res, null, 2)))
    .catch((error) => console.log(error));
};
