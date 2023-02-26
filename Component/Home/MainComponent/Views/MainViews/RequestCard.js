import { View, Text, Pressable } from "react-native";

export default function RequestCard({ details, navigation }) {
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("RequestDetails", { Details: details.item })
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
        <Text>{details.item.Recepient}</Text>
        <Text>{details.item.Service}</Text>
      </View>
    </Pressable>
  );
}
