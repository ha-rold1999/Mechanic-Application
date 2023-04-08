import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Image,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changePassword } from "../../../../../Redux/ProfileReducers/ProfileReducer";
import FormStyle from "../../../../../Style/Component/StyleSignupComponent";

export default function ChangePassword({ navigation }) {
  const { UUID } = useSelector((state) => state.profileSlice);
  const dispatch = useDispatch();

  const [newPass, setNewPass] = useState("");
  const [newPassError, setNewPassError] = useState(false);
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState(false);
  return (
    <View style={{ paddingHorizontal: 10 }}>
      <Text style={{ fontSize: 20, fontWeight: "600" }}>Change Password</Text>
      <View>
        <View style={{ paddingTop: 30 }}>
          <Text>Type New Password</Text>
          <View style={FormStyle.textInputView}>
            <Image
              source={require("../../../../../assets/Icons/password.png")}
              style={{ width: 30, height: 30, marginRight: 5 }}
            />
            <TextInput
              secureTextEntry={true}
              onChangeText={setNewPass}
              style={{ fontSize: 20, borderStartColor: "red" }}
            />
          </View>
          {newPassError && (
            <Text style={{ color: "red" }}>
              Password must be at leat 8 character with at least one uppercase
              letter, one lowercase letter, one number and one special character
            </Text>
          )}
        </View>
        <View style={{ paddingTop: 30 }}>
          <Text>Re-type New Password</Text>
          <View style={FormStyle.textInputView}>
            <Image
              source={require("../../../../../assets/Icons/password.png")}
              style={{ width: 30, height: 30, marginRight: 5 }}
            />
            <TextInput
              secureTextEntry={true}
              onChangeText={setConfirmPass}
              style={{ fontSize: 20 }}
            />
          </View>
          {error && (
            <Text style={{ color: "red" }}>Password does not match</Text>
          )}
        </View>

        <View style={{ alignItems: "center", paddingTop: 40 }}>
          <Pressable
            onPress={() => {
              if (
                !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*-?&])[A-Za-z\d@$!%*-?&]{8,}$/.test(
                  newPass
                )
              ) {
                setNewPassError(true);
              } else if (newPass !== confirmPass) {
                setError(true);
                setNewPassError(false);
              } else {
                setError(false);
                setNewPass(false);
                dispatch(changePassword(UUID, newPass));
                navigation.reset({ index: 0, routes: [{ name: "Login" }] });
              }
            }}
            style={{
              paddingHorizontal: 50,
              paddingVertical: 10,
              backgroundColor: "#228BD4",
              borderRadius: 10,
            }}
          >
            <Text style={{ color: "white" }}>Change Password</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
