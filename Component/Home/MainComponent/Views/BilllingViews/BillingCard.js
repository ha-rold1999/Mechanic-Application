import { View, Text, Pressable } from "react-native";

export default function BillingCard({ info, navigation }) {
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("BillingDetails", { Details: info.item })
      }
    >
      <View
        style={{
          padding: 5,
          borderWidth: 1,
          borderRadius: 10,
          margin: 4,
          elevation: 5,
          backgroundColor: "white",
        }}
      >
        <Text>{info.item.BillingDate}</Text>
        <Text>{info.item.ServiceFee}</Text>
        <Text>{info.item.ServiceRemark.split("MORE DETAILS")[0]}</Text>
      </View>
    </Pressable>
  );
}
