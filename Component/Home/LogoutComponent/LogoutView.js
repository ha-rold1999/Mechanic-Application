import { Button, StyleSheet, Text, View, Pressable, Image } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { isOnline } from "../../../Redux/ProfileReducers/ProfileReducer";

export default function LogoutView({ navigation }) {
  const { UUID } = useSelector((state) => state.profileSlice);
  const dispatch = useDispatch();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        source={require("../../../assets/Icons/logout.png")}
        style={{ width: 200, height: 200 }}
      />
      <Text style={{ fontSize: 20, fontWeight: "700" }}>
        Do you want to logout
      </Text>
      <Pressable
        style={{
          backgroundColor: "#02599B",
          paddingHorizontal: 100,
          paddingVertical: 10,
          borderRadius: 10,
          marginTop: 10,
        }}
        onPress={() => {
          dispatch(isOnline(UUID, false));
          navigation.reset({ index: 0, routes: [{ name: "Login" }] });
        }}
      >
        <Text style={{ color: "white", fontSize: 20, fontWeight: "700" }}>
          Yes
        </Text>
      </Pressable>
    </View>

    // <View>
    //   <Text>Do you want to logout?</Text>
    //   <Button
    //     title="Yes"
    //     onPress={() => {
    //       navigation.reset({ index: 0, routes: [{ name: "Login" }] });
    //     }}
    //   />
    // </View>
  );
}

const styles = StyleSheet.create({});
