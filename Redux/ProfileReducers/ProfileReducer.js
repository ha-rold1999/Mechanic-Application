import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
  name: "profileSlice",
  initialState: {
    UUID: "",
    Firstname: "",
    Lastname: "",
    Contact: "",
    Birthdate: "",
    Address: "",
    LicenseNumber: "",
    Expiry: "",
    Username: "",
    Email: "",
    Balance: 0,
    ShopID: "",
    ShopName: "",
    ShopDescripction: "",
  },
  reducers: {
    getProfile: (state, action) => {
      state.UUID = action.payload.AccountData.personalInformation.UUID;
      state.Firstname =
        action.payload.AccountData.personalInformation.Firstname;
      state.Lastname = action.payload.AccountData.personalInformation.Lastname;
      state.Contact = action.payload.AccountData.personalInformation.Contact;
      state.Birthdate =
        action.payload.AccountData.personalInformation.Birthdate;
      state.Address = action.payload.AccountData.personalInformation.Address;
      state.LicenseNumber =
        action.payload.AccountData.personalInformation.LicenseNumber;
      state.Expiry = action.payload.AccountData.personalInformation.Expiry;
      state.Username = action.payload.AccountData.credential.Username;
      state.Email = action.payload.AccountData.credential.Email;
      state.Balance = action.payload.AccountData.wallet.Balance;
      state.ShopID = action.payload.AccountData.accountStatus.Shop.ShopID;
      state.ShopName = action.payload.AccountData.accountStatus.Shop.ShopName;
      state.ShopDescripction =
        action.payload.AccountData.accountStatus.Shop.ShopDescription;
    },
  },
});

export const { getProfile } = profileSlice.actions;
export const profileSliceReducers = profileSlice.reducer;
