import { configureStore } from "@reduxjs/toolkit";
import { fnameSliceReducer } from "./SignupFormReducers/PersonalInfoSlice";
import { licenseSliceReducer } from "./SignupFormReducers/DriveerLicenseFormReducers";
import { credentialSliceReducer } from "./SignupFormReducers/AccountCredFormReducers";
import { loginSliceReducer } from "./LoginFormReducers/LoginReducers";
import { shopDetailsSliceReducer } from "./SignupFormReducers/ShopInfoFormSlice";
import { profileSliceReducers } from "./ProfileReducers/ProfileReducer";
import { serviceSliceReducer } from "./ProfileReducers/ServiceReducer";
import { requestListSliceReducer } from "./RequestListReducer/RequestListReducer";
import { locationSliceReducer } from "./MapReducers/LocationReducers";
import { clientLocationSliceReducer } from "./MapReducers/ClientLocationReducer";
import { walletSliceReducer } from "./WalletReducers/WalletReducer";
import { billingSliceReducer } from "./BillingReducers/BillingReducers";

export default configureStore({
  reducer: {
    firstnameSlice: fnameSliceReducer,
    licenseSlice: licenseSliceReducer,
    credentialSlice: credentialSliceReducer,
    loginSlice: loginSliceReducer,
    shopDetailsSlice: shopDetailsSliceReducer,
    profileSlice: profileSliceReducers,
    serviceSlice: serviceSliceReducer,
    requestListSlice: requestListSliceReducer,
    locationSlice: locationSliceReducer,
    clientLocationSlice: clientLocationSliceReducer,
    walletSlice: walletSliceReducer,
    billingSlice: billingSliceReducer,
  },
});
