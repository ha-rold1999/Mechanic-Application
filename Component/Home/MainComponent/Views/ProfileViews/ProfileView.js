import { useEffect } from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getReview } from "../../../../../Redux/RequestListReducer/RequestListReducer";
import { AirbnbRating } from "react-native-ratings";

export default function Profile({ navigation }) {
  const { UUID, Firstname, Lastname, Contact, Birthdate, Address } =
    useSelector((state) => state.profileSlice);
  const { myRating } = useSelector((state) => state.requestListSlice);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getReview(UUID, "Profile"));
  }, []);
  if (myRating !== null) {
    return (
      <View>
        <Text>ID: {UUID}</Text>
        <Text>
          Name: {Firstname} {Lastname}
        </Text>
        <Text>
          Rating: <AirbnbRating defaultRating={myRating.Rating} isDisabled />
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
  return (
    <View>
      <ActivityIndicator />
    </View>
  );
}
