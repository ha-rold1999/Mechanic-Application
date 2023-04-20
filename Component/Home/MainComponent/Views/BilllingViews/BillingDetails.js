import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function BillingDetails({ route }) {
  const Details = route.params;
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontWeight: "700" }}>Billing Details</Text>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontWeight: "600" }}>Billing ID: </Text>
        <Text>{Details.Details.BillingID}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontWeight: "600" }}>Billing Date: </Text>
        <Text>{Details.Details.BillingDate}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontWeight: "600" }}>Service Fee: </Text>
        <Text>{Details.Details.ServiceFee}</Text>
      </View>
      <View
        style={{
          width: "100%",
          backgroundColor: "white",
          borderWidth: 1,
          borderRadius: 10,
          padding: 5,
          elevation: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ textAlign: "center" }}>
          {Details.Details.ServiceRemark.split("MORE DETAILS")[0]}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Text>Service: </Text>

          <Text>
            {
              Details.Details.ServiceRemark.split("MORE DETAILS")[1]
                .split("|")[0]
                .split(":")[2]
            }
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text>Fee: </Text>
          <Text>
            {
              Details.Details.ServiceRemark.split("MORE DETAILS")[1]
                .split("|")[0]
                .split(":")[3]
            }
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text>Client: </Text>
          <Text>
            {
              Details.Details.ServiceRemark.split("MORE DETAILS")[1]
                .split("|")[1]
                .split(":")[1]
            }
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text>Vehicle: </Text>
          <Text>
            {
              Details.Details.ServiceRemark.split("MORE DETAILS")[1]
                .split("|")[4]
                .split(":")[1]
            }
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text>Description: </Text>
          <Text>
            {
              Details.Details.ServiceRemark.split("MORE DETAILS")[1]
                .split("|")[5]
                .split(":")[1]
            }
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
