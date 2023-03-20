import { useEffect, useState } from "react";
import { View, Text, Button, ActivityIndicator, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getReview } from "../../../../../Redux/RequestListReducer/RequestListReducer";
import { AirbnbRating } from "react-native-ratings";
import { profilePIc } from "../../../../../Redux/ProfileReducers/ProfileReducer";
import PhoneCamera from "./Camera";

export default function Profile({ navigation }) {
  const [openCamera, setOpenCamera] = useState(false);
  const { UUID, Firstname, Lastname, Contact, Birthdate, Address, Profile } =
    useSelector((state) => state.profileSlice);
  const { myRating } = useSelector((state) => state.requestListSlice);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getReview(UUID, "Profile"));
    dispatch(profilePIc(UUID, dispatch));
  }, []);
  if (myRating !== null) {
    return (
      <View>
        <View style={{ backgroundColor: "red", width: "50%", height: "30%" }}>
          {Profile === null ? (
            <Image
              source={require("../../../../../assets/Icons/pp.jpg")}
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <Image
              source={{ uri: `data:image/jpg;base64,${Profile}` }}
              style={{ width: "100%", height: "100%" }}
            />
          )}
        </View>
        <Button
          title="Change Piture"
          onPress={() => {
            setOpenCamera(true);
          }}
        />
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
        <PhoneCamera openCamera={openCamera} setOpenCamera={setOpenCamera} />
      </View>
    );
  }
  return (
    <View>
      <ActivityIndicator />
    </View>
  );
}
