import { View, Text, Button } from "react-native";
import { useSelector } from "react-redux";

export default function Profile({ navigation }) {
  const { UUID, Firstname, Lastname, Contact, Birthdate, Address } =
    useSelector((state) => state.profileSlice);
  return (
    <View>
      <Text>ID: {UUID}</Text>
      <Text>
        Name: {Firstname} {Lastname}
      </Text>
      <Text>Contact: {Contact}</Text>
      <Text>Birthdate: {Birthdate}</Text>
      <Text>Address: {Address}</Text>
      <Button
        title="Change Password"
        onPress={() => {
          navigation.navigate("ChangePass");
        }}
      />
      <Button
        title="Edit Profile"
        onPress={() => {
          navigation.navigate("ChangeProf");
        }}
      />
      <Button
        title="Delete Account"
        onPress={() => {
          navigation.navigate("Delete");
        }}
      />
    </View>
  );
}
