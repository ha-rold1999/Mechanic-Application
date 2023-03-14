import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import SessionMap from "../../../MapComponent/SessionMap";
import { clearSessionDetails } from "../../../../../Redux/RequestListReducer/RequestListReducer";
import { useDispatch, useSelector } from "react-redux";
import { addBalance } from "../../../../../Redux/WalletReducers/WalletReducer";

export default function InSessionDetails() {
  const dispatch = useDispatch();
  const { sessionDetails, inSession } = useSelector(
    (state) => state.requestListSlice
  );

  useEffect(() => {}, [inSession]);

  const { balance } = useSelector((state) => state.walletSlice);
  const { UUID } = useSelector((state) => state.profileSlice);
  console.log("UUID: " + UUID);

  if (inSession && sessionDetails !== null) {
    return (
      <View>
        <Text>In Session</Text>
        <SessionMap
          SessionID={sessionDetails.foundData.SessionData.SessionID}
          SessionDetails={sessionDetails.foundData.SessionData.SessionDetails}
        />
      </View>
    );
  } else if (sessionDetails !== null) {
    const datas =
      sessionDetails.foundData.SessionData.SessionDetails.split("|");
    const serviceDetails = datas[0].split(":");
    const servicePrice = serviceDetails[2];
    return (
      <View>
        <Text>Session Ended</Text>
        <Text>{sessionDetails.foundData.SessionData.SessionDetails}</Text>
        <Button title="Rate Client?" />
        <Button
          title="OK"
          onPress={() => {
            dispatch(clearSessionDetails(null));
            const newBal = parseFloat(balance) + parseFloat(servicePrice);
            dispatch(addBalance(UUID, newBal));
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
