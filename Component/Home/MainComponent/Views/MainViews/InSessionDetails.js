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
import { checkSession } from "../../../../../Redux/RequestListReducer/RequestListReducer";
import { currancyFormat } from "../../../../../Static";

import { Platform, PermissionsAndroid } from "react-native";
import * as Sharing from "expo-sharing";
import * as Print from "expo-print";
import * as FileSystem from "expo-file-system";

export default function InSessionDetails() {
  const dispatch = useDispatch();
  const { sessionDetails, inSession } = useSelector(
    (state) => state.requestListSlice
  );
  const [isRating, setIsRating] = useState(false);
  const [isReporting, setIsReporting] = useState(false);

  const { balance } = useSelector((state) => state.walletSlice);
  const { UUID, ShopID } = useSelector((state) => state.profileSlice);
  const { serviceFee } = useSelector((state) => state.requestListSlice);

  useEffect(() => {
    dispatch(getUserWallet(UUID));
  }, [inSession, sessionDetails]);

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
    const flag = sessionDetails.foundData.Flag;
    return (
      <View style={{ paddingHorizontal: 10 }}>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 30, fontWeight: "700" }}>Session Ended</Text>
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
                <Text>{currancyFormat.format(servicePrice)}</Text>
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
                const save = async () => {
                  if (Platform.OS === "android") {
                    const granted = await PermissionsAndroid.request(
                      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
                    );
                    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                      console.log("Write permission denied");
                      return;
                    }
                  }
                  const htmlContent = `
                      <!DOCTYPE html>
                          <html>
                            <head>
                              <title>Service Receipt</title>
                              <style>
                                /* Define the CSS style for the receipt */
                                body {
                                  font-family: Arial, sans-serif;
                                  margin: 0;
                                  padding: 0;
                                  text-align: center;
                                  background-color: #f2f2f2;
                                }

                                .container {
                                  max-width: 600px;
                                  margin: 0 auto;
                                  padding: 20px;
                                  border: 1px solid #ccc;
                                  border-radius: 10px;
                                  background-color: #fff;
                                }

                                h1 {
                                  font-size: 32px;
                                  margin-bottom: 20px;
                                }

                                h3 {
                                  font-size: 18px;
                                  margin-top: 10px;
                                }

                                table {
                                  width: 100%;
                                  border-collapse: collapse;
                                  margin-bottom: 20px;
                                }

                                th {
                                  background-color: #f2f2f2;
                                  padding: 10px;
                                  font-size: 18px;
                                }

                                td {
                                  border: 1px solid #ccc;
                                  padding: 10px;
                                  font-size: 16px;
                                }

                                .total {
                                  font-weight: bold;
                                }

                                .thankyou {
                                  font-size: 20px;
                                  margin-top: 30px;
                                }
                              </style>
                            </head>
                            <body>
                              <div class="container">
                                <h1>Service Receipt</h1>
                                <h3>Service ID: ${
                                  sessionDetails.foundData.SessionData.SessionID
                                }</h3>
                                <table>
                                  <thead>
                                    <tr>
                                      <th>Service</th>
                                      <th>Vehicle</th>
                                      <th>Date/Time</th>
                                      <th>Fee</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>${
                                        sessionDetails.foundData.SessionData.SessionDetails.split(
                                          "|"
                                        )[0].split(":")[1]
                                      }</td>
                                      <td>${
                                        sessionDetails.foundData.SessionData.SessionDetails.split(
                                          "|"
                                        )[4].split(":")[1]
                                      }</td>
                                      <td>${
                                        sessionDetails.foundData.SessionData
                                          .TimeStart
                                      }</td>
                                      <td>${
                                        sessionDetails.foundData.SessionData.SessionDetails.split(
                                          "|"
                                        )[0].split(":")[2]
                                      }</td>
                                    </tr>
                                  </tbody>
                                </table>
                                <p class="thankyou">Thank you for trusting AYUS!</p>
                              </div>
                            </body>
                          </html>`;
                  try {
                    const downloadDocument = await Print.printToFileAsync({
                      html: htmlContent,
                    });
                    const pdfURI = downloadDocument.uri;
                    const pdfName = "receipt.pdf";
                    const fileURI = `${FileSystem.documentDirectory}${pdfName}`;
                    await FileSystem.copyAsync({ from: pdfURI, to: fileURI });
                    await Sharing.shareAsync(fileURI);
                  } catch (e) {
                    console.log(e);
                  }
                };

                save();
                if (flag === "Cash") {
                  dispatch(clearSessionDetails(null));
                  dispatch(
                    postBilling(
                      ShopID,
                      serviceFee,
                      serviceName,
                      sessionDetails.foundData.SessionData.SessionDetails
                    )
                  );
                  const newBal = parseFloat(balance - serviceFee);
                  dispatch(addBalance(UUID, newBal));
                } else {
                  dispatch(clearSessionDetails(null));
                  dispatch(
                    postBilling(
                      ShopID,
                      serviceFee,
                      serviceName,
                      sessionDetails.foundData.SessionData.SessionDetails
                    )
                  );
                  const newBal = parseFloat(
                    balance + (parseFloat(servicePrice) - serviceFee)
                  );
                  dispatch(addBalance(UUID, newBal));
                }
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  date: {
    fontSize: 16,
  },
  items: {
    marginBottom: 20,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
  },
  itemPrice: {
    fontSize: 16,
  },
  total: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
