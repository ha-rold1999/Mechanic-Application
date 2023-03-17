import { createSlice } from "@reduxjs/toolkit";
import { apiKey, server } from "../../Static";

export const requestListSlice = createSlice({
  name: "requestListSlice",
  initialState: {
    requestList: [],
    inSession: false,
    sessionDetails: null,
    rating: null,
    myRating: null,
  },
  reducers: {
    getServiceRequest: (state, action) => {
      state.requestList = action.payload;
    },
    setInSession: (state, action) => {
      if (action.payload.inSession) {
        state.inSession = action.payload.inSession;
        state.sessionDetails = action.payload.info;
      } else {
        state.inSession = action.payload.inSession;
      }
    },
    clearSessionDetails: (state, action) => {
      state.sessionDetails = action.payload;
    },
    setRating: (state, action) => {
      state.rating = action.payload;
    },
    setMyRating: (state, action) => {
      state.myRating = action.payload;
    },
  },
});

export const {
  getServiceRequest,
  setInSession,
  clearSessionDetails,
  setRating,
  setMyRating,
} = requestListSlice.actions;
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

export const checkSession = (UUID) => async (dispatch) => {
  try {
    await fetch(`${server}/api/Sessions/GetSession`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "AYUS-API-KEY": apiKey,
        MechanicUUID: UUID,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.Status === 200) {
          dispatch(setInSession({ inSession: true, info: data }));
        } else {
          dispatch(setInSession({ inSession: false, info: null }));
        }
      })
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }
};

export const fetchDeleteReq = (clientID) => async (dispatch) => {
  try {
    await fetch(`${server}/api/ServiceRequest`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "AYUS-API-KEY": apiKey,
        ServiceRequestUUID: clientID,
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

export const postReview = (mechID, rating) => () => {
  try {
    fetch(`${server}/api/Account/Rating`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "AYUS-API-KEY": apiKey,
        uuid: mechID,
      },
      body: JSON.stringify({
        Rating: rating,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("Rating Response: " + JSON.stringify(response, null, 2));
      })
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }
};

export const getReview = (uuid, active) => (dispatch) => {
  try {
    fetch(`${server}/api/Account/Rating`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "AYUS-API-KEY": apiKey,
        uuid: uuid,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (active === "Profile") {
          dispatch(setMyRating(response));
        } else {
          dispatch(setRating(response));
        }
      })
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }
};
