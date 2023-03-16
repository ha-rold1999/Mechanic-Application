import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function BillingDetails({ route }) {
  const Details = route.params;
  console.log("Details: " + JSON.stringify(Details.Details, null, 2));
  return (
    <View>
      <Text>BillingDetails</Text>
      <Text>{Details.Details.BillingID}</Text>
      <Text>{Details.Details.BillingDate}</Text>
      <Text>{Details.Details.ServiceFee}</Text>
      <Text>{Details.Details.ServiceRemark}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
