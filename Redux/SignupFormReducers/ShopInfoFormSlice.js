import { createSlice } from "@reduxjs/toolkit";

const shopDetailsSlice = createSlice({
  name: "shopDetailsSlice",
  initialState: {
    shopName: "",
    shopDescription: "",
    shopNameError: "",
    formError: false,
  },
  reducers: {
    handleShopname: (state, action) => {
      state.shopName = action.payload;
    },
    handleShopDesc: (state, action) => {
      state.shopDescription = action.payload;
    },
    checkShopForm: (state, action) => {
      if (!state.shopName) {
        state.shopNameError = "Enter your shop's name";
      } else {
        state.shopNameError = "";
      }

      if (!state.shopNameError) {
        state.formError = false;
      } else {
        state.formError = true;
      }
    },
  },
});

export const { handleShopname, handleShopDesc, checkShopForm } =
  shopDetailsSlice.actions;

export const shopName = (state) => state.shopDetailsSlice.shopName;
export const shopDescription = (state) =>
  state.shopDetailsSlice.shopDescription;

export const shopNameError = (state) => state.shopDetailsSlice.shopNameError;

export const formError = (state) => state.shopDetailsSlice.formError;
export const shopDetailsSliceReducer = shopDetailsSlice.reducer;
