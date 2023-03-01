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
      .then((data) => {dispatch(getServiceRequest(data));})
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
      .then((data) =>{
        
        fetch(`${server}/api/ServiceRequest`,{method:"PUT", headers: {
        "Content-Type": "application/json",
        "AYUS-API-KEY": apiKey,
      },body: JSON.stringify({...data.ServiceRequests.filter(s=>s.RequestID === ReqUUID)[0], newstatus:"declined"})})})
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }
};
