import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ToastAndroid,
} from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteAccount } from "../../../../../Redux/ProfileReducers/ProfileReducer";

export default function ProfileDelete({ navigation }) {
  const dispatch = useDispatch();
  const { UUID } = useSelector((state) => state.profileSlice);
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          width: "100%",
          height: "50%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 30, fontWeight: "bold", paddingBottom: 20 }}>
          Delete Account
        </Text>
        <Image
          source={require("../../../../../assets/Icons/trash.png")}
          style={{ width: 200, height: 200 }}
        />
      </View>

      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 20, textAlign: "center", paddingBottom: 30 }}>
          Are you sure you want to delete this account?
        </Text>
        <Pressable
          onPress={() => {
            dispatch(deleteAccount(UUID));
            navigation.reset({ index: 0, routes: [{ name: "Login" }] });
            ToastAndroid.show("Account Deleted", ToastAndroid.SHORT);
          }}
          style={{
            borderWidth: 1,
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 10,
            marginBottom: 10,
          }}
        >
          <Text style={{ fontSize: 20 }}>yes</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate("Profile");
          }}
          style={{
            borderWidth: 1,
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 10,
            backgroundColor: "#228BD4",
          }}
        >
          <Text style={{ fontSize: 20 }}>NO</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
