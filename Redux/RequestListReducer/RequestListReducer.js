import { createSlice } from "@reduxjs/toolkit";
import { apiKey, server } from "../../Static";

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
    await fetch(`${server}/api/ServiceRequest`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "AYUS-API-KEY": apiKey,
        MechanicUUID: UUID,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(getServiceRequest(data));
      })
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }
};

export const fetchDeleteReq = (ReqUUID) => async (dispatch) => {
  try {
    await fetch(`${server}/api/ServiceRequest`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "AYUS-API-KEY": apiKey,
        ServiceRequestUUID: ReqUUID,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        fetch(`${server}/api/ServiceRequest`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "AYUS-API-KEY": apiKey,
          },
          body: JSON.stringify({
            ...data.ServiceRequests.filter((s) => s.RequestID === ReqUUID)[0],
            newstatus: "declined",
          }),
        })
          .then((res) => res.json())
          .then((response) =>
            console.log("Update: " + JSON.stringify(response, null, 2))
          );
      })
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }
};

export const acceptReq = (clientID, mechanicID, details) => async () => {
  try {
    await fetch(`${server}/api/Sessions/RegisterSession`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "AYUS-API-KEY": apiKey,
        ClientUUID: clientID, // [REQUIRED]
        MechanicUUID: mechanicID, // [REQUIRED]
        SessionDetails: details, // [REQUIRED]
        Flag: "Accept Request",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(JSON.stringify(data, null, 2));
      })
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }
};
