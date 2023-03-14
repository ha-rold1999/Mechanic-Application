import { createSlice } from "@reduxjs/toolkit";
import { apiKey, server } from "../../Static";

export const walletSlice = createSlice({
  name: "walletSlice",
  initialState: { pincode: "", balance: 0 },
  reducers: {
    getWallet: (state, action) => {
      state.pincode = action.payload.WalletData.Pincode;
      state.balance = action.payload.WalletData.Balance;
    },
    setWallet: (state, action) => {
      state.pincode = action.payload.pincode;
      state.balance = action.payload.balance;
    },
  },
});

export const { getWallet, setWallet } = walletSlice.actions;
export const walletSliceReducer = walletSlice.reducer;

export const getUserWallet = (UUID, setIsLoading) => (dispatch) => {
  console.log("Debugging: " + UUID);
  try {
    fetch(`${server}/api/Wallet?uuid=${UUID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "AYUS-API-KEY": apiKey,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        dispatch(getWallet(response));
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }
};

export const setWalletPin = (UUID, Pin) => () => {
  try {
    fetch(`${server}/api/Wallet?uuid=${UUID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "AYUS-API-KEY": apiKey,
        newbalance: 0,
        pincode: Pin,
      },
    }).catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }
};

export const addBalance = (UUID, balance) => () => {
  console.log(balance);
  try {
    fetch(`${server}/api/Wallet?uuid=${UUID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "AYUS-API-KEY": apiKey,
        newbalance: balance,
      },
    })
      .then((res) => res.json())
      .then((responose) => console.log(JSON.stringify(responose, null, 2)))
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }
};
