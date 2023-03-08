import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import DatePicker from "../../../../FormCoponent/DatePickerComponent";

export default function ChangeProfile() {
  const { Firstname, Lastname, Contact, Address, Expiry } = useSelector(
    (state) => state.profileSlice
  );
  return (
    <View>
      <Text>Change Profile</Text>
      <Text>Firstname</Text>
      <TextInput value={Firstname} />
      <Text>Lastname</Text>
      <TextInput value={Lastname} />
      <Text>Contact</Text>
      <TextInput value={Contact} />
      <Text>Address</Text>
      <TextInput value={Address} />
      <Text>License Expiration Date</Text>
      <DatePicker birthdate={Expiry} />
      <Button title="Save Changes" />
    </View>
  );
}

const styles = StyleSheet.create({});
