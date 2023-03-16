import { createSlice } from "@reduxjs/toolkit";
import { apiKey, server } from "../../Static";

const billingSlice = createSlice({
  name: "billingSlice",
  initialState: { billingList: [] },
  reducers: {
    setBillingList: (state, action) => {
      state.billingList = action.payload.BillingData;
    },
  },
});

export const { setBillingList } = billingSlice.actions;
export const billingSliceReducer = billingSlice.reducer;

export const getBillingLIst = (ShopID, dispatch) => () => {
  try {
    setInterval(() => {
      fetch(`${server}/api/Mechanic/Billing`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "AYUS-API-KEY": apiKey,
          ShopID: ShopID,
        },
      })
        .then((res) => res.json())
        .then((response) => {
          dispatch(setBillingList(response));
        })
        .catch((error) => console.log(error));
    }, 5000);
  } catch (error) {
    console.log(error);
  }
};
export const postBilling = (ShopID, fee, service, details) => () => {
  try {
    fetch(`${server}/api/Mechanic/Billing`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "AYUS-API-KEY": apiKey,
        ShopID: ShopID,
      },
      body: JSON.stringify({
        shopID: ShopID,
        serviceFee: Number(fee),
        serviceRemark: `Billing for service ${service} at ${new Date().toString()} MORE DETAILS: ${details}`,
      }),
    })
      .then((res) => res.json())
      .then((response) =>
        console.log("Billing Posted: " + JSON.stringify(response, null, 2))
      )
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }
};
