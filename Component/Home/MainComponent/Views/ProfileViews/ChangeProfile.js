import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import DatePicker from "../../../../FormCoponent/DatePickerComponent";
import { useDispatch } from "react-redux";
import { changeInfo } from "../../../../../Redux/ProfileReducers/ProfileReducer";
import { server, apiKey } from "../../../../../Static";
import { getProfile } from "../../../../../Redux/ProfileReducers/ProfileReducer";

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
  const [lname, setLname] = useState(Lastname);
  const [contact, setContact] = useState(Contact);
  const [address, setAddress] = useState(Address);
  const [exp, setExp] = useState(Expiry);
  return (
    <View>
      <Text>Change Profile</Text>
      <Text>Firstname</Text>
      <TextInput value={fname} onChangeText={setFname} />
      <Text>Lastname</Text>
      <TextInput value={lname} onChangeText={setLname} />
      <Text>Contact</Text>
      <TextInput value={contact} onChangeText={setContact} />
      <Text>Address</Text>
      <TextInput value={address} onChangeText={setAddress} />
      <Text>License Expiration Date</Text>
      <DatePicker birthdate={exp} setBirthdate={setExp} />
      <Button
        title="Save Changes"
        onPress={() => {
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
              .then((data) => dispatch(getProfile(data)))
              .then(() => navigation.navigate("Profile"))
              .catch((error) => console.log(error));
          }, 500);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
