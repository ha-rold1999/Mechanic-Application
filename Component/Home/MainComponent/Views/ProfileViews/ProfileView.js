import { View, Text } from "react-native";
import { useSelector } from "react-redux";

export default function Profile() {
  const { Firstname, Lastname } = useSelector((state) => state.profileSlice);
  const {longitude, latitude} = useSelector((state)=>state.locationSlice)
  return (
    <View>
      <Text>{Lastname}</Text>
      <Text>Longitude: {longitude}</Text>
      <Text>Latitude: {latitude}</Text>
    </View>
  );
}
