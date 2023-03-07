import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changePassword } from "../../../../../Redux/ProfileReducers/ProfileReducer";

export default function ChangePassword({ navigation }) {
  const { UUID } = useSelector((state) => state.profileSlice);
  const dispatch = useDispatch();

  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState(false);
  return (
    <View>
      <Text>Change Password</Text>
      <Text>Type New Password</Text>
      <TextInput secureTextEntry={true} onChangeText={setNewPass} />
      <Text>Re-type New Password</Text>
      <TextInput secureTextEntry={true} onChangeText={setConfirmPass} />
      {error && <Text>Password does not match</Text>}
      <Button
        title="Change Password"
        onPress={() => {
          if (newPass !== confirmPass) {
            setError(true);
          } else {
            console.log("ERROR");
            setError(false);
            dispatch(changePassword(UUID, newPass));
            navigation.reset({ index: 0, routes: [{ name: "Login" }] });
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
