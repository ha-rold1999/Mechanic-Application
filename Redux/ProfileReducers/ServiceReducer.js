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
    deleteServiceData: (state, action) => {
      state.error = "";
      state.serviceLst = [];
    },
  },
});

export const { getService, getServiceError, deleteServiceData } =
  serviceSlice.actions;
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
  fetch(`${server}/api/Mechanic/ServiceOffer`, {
    method: "DELETE",
    headers: {
      "AYUS-API-KEY": apiKey,
      MechanicUUID: UUID,
      ServiceOfferUUID: serviceID,
    },
  }).catch((error) => console.log(error));
};
