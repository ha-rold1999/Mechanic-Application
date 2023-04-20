import { Button, StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import SessionMap from "../../../MapComponent/SessionMap";
import { clearSessionDetails } from "../../../../../Redux/RequestListReducer/RequestListReducer";
import { useDispatch, useSelector } from "react-redux";
import { addBalance } from "../../../../../Redux/WalletReducers/WalletReducer";
import { postBilling } from "../../../../../Redux/BillingReducers/BillingReducers";
import ReviewModal from "./ReviewModal";
import ReportModal from "./ReportModal";
import { getUserWallet } from "../../../../../Redux/WalletReducers/WalletReducer";

export default function InSessionDetails() {
  const dispatch = useDispatch();
  const { sessionDetails, inSession } = useSelector(
    (state) => state.requestListSlice
  );
  const [isRating, setIsRating] = useState(false);
  const [isReporting, setIsReporting] = useState(false);

  const { balance } = useSelector((state) => state.walletSlice);
  const { UUID, ShopID } = useSelector((state) => state.profileSlice);

  useEffect(() => {
    dispatch(getUserWallet(UUID));
  }, [inSession]);

  if (inSession && sessionDetails !== null) {
    return (
      <View>
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
      <View style={{ paddingHorizontal: 10 }}>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 30, fontWeight: "700" }}>Session Ended</Text>
          <Text>{balance}</Text>
        </View>

        <View
          style={{
            borderWidth: 2,
            padding: 10,
            borderRadius: 10,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "50%" }}>
              <View
                style={{
                  flexDirection: "row",
                  alignContent: "center",
                  marginVertical: 5,
                }}
              >
                <Image
                  source={require("../../../../../assets/Icons/service.png")}
                  style={{ width: 20, height: 20 }}
                />
                <Text style={{ fontSize: 15 }}>{serviceName}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignContent: "center",
                  marginVertical: 5,
                }}
              >
                <Image
                  source={require("../../../../../assets/Icons/client.png")}
                  style={{ width: 20, height: 20 }}
                />
                <Text>{datas[1].split(":")[1]}</Text>
              </View>
            </View>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignContent: "center",
                  marginVertical: 5,
                }}
              >
                <Image
                  source={require("../../../../../assets/Icons/money.png")}
                  style={{ width: 20, height: 20 }}
                />
                <Text>{servicePrice}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignContent: "center",
                  marginVertical: 5,
                }}
              >
                <Image
                  source={require("../../../../../assets/Icons/car.png")}
                  style={{ width: 20, height: 20 }}
                />
                <Text>{datas[4].split(":")[1]}</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignContent: "center",
              marginTop: 5,
            }}
          >
            <Image
              source={require("../../../../../assets/Icons/info.png")}
              style={{ width: 20, height: 20 }}
            />
            <Text>{datas[5].split(":")[1]}</Text>
          </View>
        </View>

        <View style={{ marginTop: 10 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            <Pressable
              style={{
                backgroundColor: "red",
                paddingHorizontal: 30,
                paddingVertical: 10,
                borderRadius: 10,
              }}
              onPress={() => {
                setIsReporting(true);
              }}
            >
              <Text style={{ color: "white", fontWeight: "700" }}>
                Report Client
              </Text>
            </Pressable>
            <Pressable
              style={{
                backgroundColor: "#228BD4",
                paddingHorizontal: 30,
                paddingVertical: 10,
                borderRadius: 10,
              }}
              onPress={() => {
                setIsRating(true);
              }}
            >
              <Text style={{ color: "white", fontWeight: "700" }}>
                Rate Client
              </Text>
            </Pressable>
          </View>

          <View style={{ alignItems: "center", marginTop: 10 }}>
            <Pressable
              style={{
                backgroundColor: "#209589",
                paddingHorizontal: 140,
                paddingVertical: 10,
                borderRadius: 10,
              }}
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
                console.log("Service Price: " + servicePrice);
                console.log("Balance: " + balance);
                const newBal = parseFloat(
                  balance + (parseFloat(servicePrice) - 25)
                );
                console.log("New Balance: " + newBal);
                dispatch(addBalance(UUID, newBal));
              }}
            >
              <Text style={{ color: "white", fontSize: 20, fontWeight: "700" }}>
                OK
              </Text>
            </Pressable>
          </View>
        </View>

        <ReviewModal modalVisible={isRating} setModalVisible={setIsRating} />
        <ReportModal
          modalVisible={isReporting}
          setModalVisible={setIsReporting}
          UUID={UUID}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
