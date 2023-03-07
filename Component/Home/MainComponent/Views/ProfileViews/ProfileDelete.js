import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteAccount } from "../../../../../Redux/ProfileReducers/ProfileReducer";

export default function ProfileDelete({ navigation }) {
  const dispatch = useDispatch();
  const { UUID } = useSelector((state) => state.profileSlice);
  return (
    <View>
      <Text>Are you sure you want to delete this account?</Text>
      <Button
        title="YES"
        onPress={() => {
          dispatch(deleteAccount(UUID));
          navigation.reset({ index: 0, routes: [{ name: "Login" }] });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
