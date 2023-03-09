import { createSlice } from "@reduxjs/toolkit";
import { apiKey, server } from "../../Static";

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

export const deleteAccount = (UUID) => () => {
  try {
    fetch(`${server}/api/Account`, {
      method: "DELETE",
      headers: {
        "AYUS-API-KEY": apiKey,
        uuid: UUID,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(JSON.stringify(data, null, 2));
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
};

export const changePassword = (UUID, NewPassword) => () => {
  try {
    fetch(`${server}/api/Account/Password?uuid=${UUID}`, {
      method: "PUT",
      headers: {
        "AYUS-API-KEY": apiKey,
        "new-password": NewPassword,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(JSON.stringify(data, null, 2));
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
};

export const changeInfo =
  (UUID, Firstname, Lastname, Contact, Birthdate, Address, License, Expiry) =>
  () => {
    try {
      fetch(`${server}/api/Account/PersonalInformation`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "AYUS-API-KEY": apiKey,
        },
        body: JSON.stringify({
          UUID: UUID,
          Firstname: Firstname,
          Lastname: Lastname,
          Contact: Contact,
          Birthdate: Birthdate,
          Address: Address,
          LicenseNumber: License,
          Expiry: new Date(Date.parse(Expiry)),
        }),
      })
        .then((res) => res.json())
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };
