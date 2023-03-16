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
          borderWidth: 1,
          margin: 4,
          elevation: 5,
          backgroundColor: "pink",
        }}
      >
        <Text>{info.item.BillingDate}</Text>
        <Text>{info.item.ServiceFee}</Text>
        <Text>{info.item.ServiceRemark}</Text>
      </View>
    </Pressable>
  );
}
