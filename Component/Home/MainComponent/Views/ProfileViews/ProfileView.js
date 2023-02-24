import { View, Text } from "react-native";
import { useSelector } from "react-redux";

export default function Profile() {
  const { Firstname, Lastname } = useSelector((state) => state.profileSlice);
  console.log("Hello: " + Lastname);
  return (
    <View>
      <Text>{Lastname}</Text>
    </View>
  );
}
