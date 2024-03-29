import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import Styles from "../Style/Component/StyleComponent";
import PersonalInformation from "./Signup/PersonalInfoComponent";
import LicenseInfo from "./Signup/LicenseInfoComponent";
import AccountCred from "./Signup/AccountCredComponent";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import FormStyle from "../Style/Component/StyleSignupComponent";
import { useDispatch, useSelector } from "react-redux";
import * as PersonalInfo from "../Redux/SignupFormReducers/PersonalInfoSlice";
import * as LicenseInfoForm from "../Redux/SignupFormReducers/DriveerLicenseFormReducers";
import * as CredentialForm from "../Redux/SignupFormReducers/AccountCredFormReducers";
import * as ShopDetailForm from "../Redux/SignupFormReducers/ShopInfoFormSlice";
import { useState } from "react";
import SingnupConfirmation from "./Signup/ModalComponent/SignupConfirmationModal";
import ShopInfo from "./Signup/ShopDetailsComponent";
import { server } from "../Static";
import { deleteAccountCredData } from "../Redux/SignupFormReducers/AccountCredFormReducers";
import { deleteDriveerLicenseData } from "../Redux/SignupFormReducers/DriveerLicenseFormReducers";
import { deletePersonaInfoData } from "../Redux/SignupFormReducers/PersonalInfoSlice";
import { deleteShopInfoData } from "../Redux/SignupFormReducers/ShopInfoFormSlice";

export default function SingupScreen({ navigation }) {
  const apiKey = "API_SECRET-42e016b219421dc83d180bdee27f81dd";

  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const firstname = useSelector(PersonalInfo.firstname);
  const lastname = useSelector(PersonalInfo.lastname);
  const contact = useSelector(PersonalInfo.contact);
  const birthdate = useSelector(PersonalInfo.birthdate);
  const address = useSelector(PersonalInfo.address);
  const licenseNo = useSelector(LicenseInfoForm.licenseNo);
  const expiryDate = useSelector(LicenseInfoForm.licenseExpDate);
  const shopName = useSelector(ShopDetailForm.shopName);
  const shodDesc = useSelector(ShopDetailForm.shopDescription);
  const email = useSelector(CredentialForm.email);
  const username = useSelector(CredentialForm.username);
  const password = useSelector(CredentialForm.password);

  const checkForm = useDispatch();

  //Peronsal Information Form Validation
  const checkPerosnalInfoForm = useSelector(PersonalInfo.formError);

  //Driverse License Form  Validdation
  const licenseFormError = useSelector(LicenseInfoForm.licenseFormError);

  //Acount Credential Form Validation
  const formError = useSelector(CredentialForm.formError);

  //Shop Information Form Validation
  const shopInfoFormError = useSelector(ShopDetailForm.formError);

  const executePost = () => {
    checkForm(CredentialForm.checkCredForm("error"));
    if (!formError) {
      setModalVisible(true);
      fetch(`${server}/api/Account`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "AYUS-API-KEY": apiKey,
        },
        body: JSON.stringify({
          personalInformation: {
            Firstname: firstname,
            Lastname: lastname,
            Contact: contact,
            Birthdate: new Date(Date.parse(birthdate)),
            Address: address,
            LicenseNumber: licenseNo,
            Expiry: new Date(Date.parse(expiryDate)),
          },
          credential: {
            Username: username,
            Password: password,
            Email: email,
          },
          wallet: {
            Balance: 0,
            Pincode: "",
          },
          accountStatus: {
            Shop: {
              ShopName: shopName,
              ShopDescription: shodDesc,
            },
            Role: "MECHANIC",
          },
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.Status == 409) {
            setIsError(true);
            setIsSuccess(false);
          } else {
            setIsError(false);
            setIsSuccess(true);
            checkForm(deleteAccountCredData(""));
            checkForm(deleteDriveerLicenseData(""));
            checkForm(deletePersonaInfoData(""));
            checkForm(deleteShopInfoData(""));
          }
          setIsLoading(false);
        })
        .catch((error) => console.log(error));
    } else {
      setModalVisible(false);
    }
  };

  return (
    <View style={Styles.container}>
      <Text style={{ fontSize: 20 }}>Create Your Account</Text>
      <SingnupConfirmation
        modalVisible={modalVisible}
        isLoading={isLoading}
        isError={isError}
        isSuccess={isSuccess}
        setModalVisible={setModalVisible}
        navigation={navigation}
      />
      <View style={FormStyle.steps}>
        <ProgressSteps
          activeStepIconBorderColor="#61afe1"
          activeLabelColor="#61afe1"
          completedStepIconColor="#d1f6fb"
          completedProgressBarColor="#d1f6fb"
          completedCheckColor="#61afe1"
        >
          {/* Personal Information Component*/}
          <ProgressStep
            label="Personal Information"
            nextBtnStyle={FormStyle.nextButton}
            nextBtnTextStyle={FormStyle.nextButton}
            onNext={() => checkForm(PersonalInfo.checkFirstname("error"))}
            errors={checkPerosnalInfoForm}
          >
            <PersonalInformation />
          </ProgressStep>

          {/* Drivers License Component*/}
          <ProgressStep
            label="Driver's License"
            nextBtnStyle={FormStyle.nextButton}
            nextBtnTextStyle={FormStyle.nextButton}
            previousBtnStyle={FormStyle.prevButton}
            previousBtnTextStyle={FormStyle.prevButton}
            onNext={() =>
              checkForm(LicenseInfoForm.checkDriversLicense("error"))
            }
            errors={licenseFormError}
          >
            <LicenseInfo />
          </ProgressStep>

          {/* Shop Information Component*/}
          <ProgressStep
            label="Shop Information"
            nextBtnStyle={FormStyle.nextButton}
            nextBtnTextStyle={FormStyle.nextButton}
            previousBtnStyle={FormStyle.prevButton}
            previousBtnTextStyle={FormStyle.prevButton}
            onNext={() => checkForm(ShopDetailForm.checkShopForm("error"))}
            errors={shopInfoFormError}
          >
            <ShopInfo />
          </ProgressStep>

          {/* Username and Password Component*/}
          <ProgressStep
            label="Username and Password"
            nextBtnStyle={FormStyle.submitButton}
            nextBtnTextStyle={FormStyle.submitButton}
            previousBtnStyle={FormStyle.prevButton}
            previousBtnTextStyle={FormStyle.prevButton}
            onSubmit={executePost}
          >
            <AccountCred />
          </ProgressStep>
        </ProgressSteps>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text>Already have an account? </Text>
        <Pressable
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={{ color: "blue" }}>Login Here</Text>
        </Pressable>
      </View>
    </View>
  );
}
