import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Pressable,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import DatePicker from "../../../../FormCoponent/DatePickerComponent";
import { useDispatch } from "react-redux";
import { changeInfo } from "../../../../../Redux/ProfileReducers/ProfileReducer";
import { server, apiKey } from "../../../../../Static";
import { getProfile } from "../../../../../Redux/ProfileReducers/ProfileReducer";
import FormStyle from "../../../../../Style/Component/StyleSignupComponent";
import Icon from "react-native-vector-icons/FontAwesome";

export default function ChangeProfile({ navigation }) {
  const dispatch = useDispatch();
  const {
    UUID,
    Firstname,
    Lastname,
    Contact,
    Birthdate,
    Address,
    LicenseNumber,
    Expiry,
  } = useSelector((state) => state.profileSlice);
  const [fname, setFname] = useState(Firstname);
  const [FirstnameError, setFnameError] = useState();
  const [lname, setLname] = useState(Lastname);
  const [LastnameError, setLNameError] = useState();
  const [contact, setContact] = useState(Contact);
  const [ContactError, setContactError] = useState();
  const [address, setAddress] = useState(Address);
  const [AddressError, setAddressError] = useState();
  const [exp, setExp] = useState(Expiry);

  return (
    <View style={{ flex: 1 }}>
      {/* Change Password and Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 10,
          paddingBottom: 20,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Edit Profile</Text>
        <Pressable
          onPress={() => {
            navigation.navigate("ChangePass", {
              uuid: UUID,
            });
          }}
        >
          <Text style={{ color: "#228BD4" }}>Change Password</Text>
        </Pressable>
      </View>

      {/* Form */}
      <View style={{ width: "100%", paddingHorizontal: 10 }}>
        <Text style={styles.label}>Firstname</Text>
        <View style={FormStyle.textInputView}>
          <Image
            source={require("../../../../../assets/Icons/person.png")}
            style={{ width: 30, height: 30, marginRight: 5 }}
          />
          <TextInput
            style={FormStyle.input}
            onChangeText={(text) => setFname(text)}
            value={fname}
          />
        </View>
        {FirstnameError && (
          <Text style={{ color: "red" }}>{FirstnameError}</Text>
        )}
        <Text style={styles.label}>Lastname</Text>
        <View style={FormStyle.textInputView}>
          <Image
            source={require("../../../../../assets/Icons/person.png")}
            style={{ width: 30, height: 30, marginRight: 5 }}
          />
          <TextInput
            style={FormStyle.input}
            onChangeText={(text) => setLname(text)}
            value={lname}
          />
        </View>
        {LastnameError && <Text style={{ color: "red" }}>{LastnameError}</Text>}
        <Text style={styles.label}>Contact</Text>
        <View style={FormStyle.textInputView}>
          <Image
            source={require("../../../../../assets/Icons/phone.png")}
            style={{ width: 30, height: 30, marginRight: 5 }}
          />
          <TextInput
            style={FormStyle.input}
            onChangeText={(text) => setContact(text)}
            value={contact}
          />
        </View>
        {ContactError && <Text style={{ color: "red" }}>{ContactError}</Text>}
        <Text style={styles.label}>Address</Text>
        <View style={FormStyle.textInputView}>
          <Image
            source={require("../../../../../assets/Icons/location.png")}
            style={{ width: 30, height: 30, marginRight: 5 }}
          />
          <TextInput
            style={FormStyle.input}
            onChangeText={(text) => setAddress(text)}
            value={address}
          />
        </View>
        {AddressError && <Text style={{ color: "red" }}>{AddressError}</Text>}
        <Text style={styles.label}>License Expiration Date</Text>
        <DatePicker birthdate={exp} setBirthdate={setExp} />
      </View>

      {/* Delete */}
      <View style={{ flex: 1 }}>
        <View style={{ width: 40 }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Delete", {
                uuid: UUID,
              })
            }
            style={{ paddingTop: 20, paddingLeft: 10 }}
          >
            <Icon name="trash" size={20} style={{ color: "grey" }} />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          width: "100%",
          height: "10%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Pressable
          style={{
            backgroundColor: "#228BD4",
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 5,
          }}
          onPress={() => {
            //firstname validation
            if (!fname) {
              setFnameError("Enter your firstname");
            } else if (!/^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i.test(fname)) {
              setFnameError("Enter a valid firstname");
            } else {
              setFnameError("");
            }
            //lastname validation
            if (!lname) {
              setLNameError("Enter your lastname");
            } else if (!/^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i.test(lname)) {
              setLNameError("Enter a valid lastname");
            } else {
              setLNameError("");
            }
            //contact validation
            if (!contact) {
              setContactError("Enter your number");
            } else if (!/^(09|\+639)\d{9}$/.test(contact)) {
              setContactError("Enter a valid contact number");
            } else {
              setContactError("");
            }
            //address validation
            if (!address) {
              setAddressError("Enter your address");
            } else if (!/^([a-zA-z0-9/\\''(),-\s]{2,255})$/.test(address)) {
              setAddressError("Enter a valid address");
            } else {
              setAddressError("");
            }

            if (
              FirstnameError === "" &&
              LastnameError === "" &&
              ContactError === "" &&
              AddressError === ""
            ) {
              dispatch(
                changeInfo(
                  UUID,
                  fname,
                  lname,
                  contact,
                  Birthdate,
                  address,
                  LicenseNumber,
                  exp
                )
              );

              setTimeout(() => {
                fetch(`${server}/api/Account`, {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                    "AYUS-API-KEY": apiKey,
                    uuid: UUID,
                  },
                })
                  .then((res) => res.json())
                  .then((data) => {
                    dispatch(getProfile(data));
                    ToastAndroid.show("Profile Updated", ToastAndroid.SHORT);
                  })
                  .then(() => navigation.navigate("Profile"))
                  .catch((error) => console.log(error));
              }, 500);
            } else {
              {
              }
            }
          }}
        >
          <Text style={{ fontSize: 15 }}>Save Changes</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    paddingTop: 10,
  },
});
