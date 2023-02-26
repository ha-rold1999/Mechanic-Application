import { View, Text, Pressable } from "react-native";

export default function RequestCard({ details }) {
  return (
    <Pressable>
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
