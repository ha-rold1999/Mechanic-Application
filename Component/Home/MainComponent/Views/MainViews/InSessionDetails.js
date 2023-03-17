import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import SessionMap from "../../../MapComponent/SessionMap";
import { clearSessionDetails } from "../../../../../Redux/RequestListReducer/RequestListReducer";
import { useDispatch, useSelector } from "react-redux";
import { addBalance } from "../../../../../Redux/WalletReducers/WalletReducer";
import { postBilling } from "../../../../../Redux/BillingReducers/BillingReducers";
import ReviewModal from "./ReviewModal";

export default function InSessionDetails() {
  const dispatch = useDispatch();
  const { sessionDetails, inSession } = useSelector(
    (state) => state.requestListSlice
  );
  const [isRating, setIsRating] = useState(false);

  useEffect(() => {}, [inSession]);

  const { balance } = useSelector((state) => state.walletSlice);
  const { UUID, ShopID } = useSelector((state) => state.profileSlice);

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
    const serviceName = serviceDetails[1];
    return (
      <View>
        <Text>Session Ended</Text>
        <Text>{sessionDetails.foundData.SessionData.SessionDetails}</Text>
        <Button
          title="Rate Client?"
          onPress={() => {
            setIsRating(true);
          }}
        />
        <Button
          title="OK"
          onPress={() => {
            dispatch(clearSessionDetails(null));
            dispatch(
              postBilling(
                ShopID,
                servicePrice,
                serviceName,
                sessionDetails.foundData.SessionData.SessionDetails
              )
            );
            const newBal =
              parseFloat(balance) + (parseFloat(servicePrice) - 25);
            dispatch(addBalance(UUID, newBal));
          }}
        />
        <ReviewModal modalVisible={isRating} setModalVisible={setIsRating} />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
