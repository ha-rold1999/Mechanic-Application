import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import SessionMap from "../../../MapComponent/SessionMap";

export default function InSessionDetails() {
  const { sessionDetails } = useSelector((state) => state.requestListSlice);
  return (
    <View>
      <Text>In Session</Text>
      <SessionMap
        SessionID={sessionDetails.foundData.SessionData.SessionID}
        SessionDetails={sessionDetails.foundData.SessionData.SessionDetails}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
