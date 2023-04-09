import { useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  Button,
  StyleSheet,
  Image,
  ActivityIndicator,
  Linking,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDeleteReq,
  acceptReq,
} from "../../../../../Redux/RequestListReducer/RequestListReducer";
import { getClientLocation } from "../../../../../Redux/MapReducers/ClientLocationReducer";
import CustomerLocation from "../../../MapComponent/CustomerLocation";
import { getReview } from "../../../../../Redux/RequestListReducer/RequestListReducer";
import { AirbnbRating, Rating } from "react-native-ratings";
import { server } from "../../../../../Static";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function RequestDetails({ route, navigation }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageUrl, setImageURL] = useState("");
  const Data = route.params;
  const mechanicID = Data.Details.Recepient;
  const clientID = Data.Details.Requestor;
  const requestID = Data.Details.RequestID;
  const serviceName = Data.Details.Service;
  const fName = Data.Details.FullName;
  const contact = Data.Details.Contact;
  const location = Data.Details.Location;
  const vehicle = Data.Details.Vehicle;
  const description = Data.Details.Description;

  const dispatch = useDispatch();

  const details = `Service: ${serviceName} | Client: ${fName} | Contact: ${contact} | Location: ${location} | Vehicle: ${vehicle} | Description: ${description}`;
  const { rating } = useSelector((state) => state.requestListSlice);

  useEffect(() => {
    dispatch(getClientLocation(clientID));
    dispatch(getReview(clientID, "Client"));
  }, [dispatch]);

  const image = `${server}/api/Upload/files/${clientID}/PROBLEM`;
  if (!isLoaded) {
    setImageURL(image + "?" + new Date());
    setIsLoaded(true);
  }

  if (rating !== null) {
    return (
      <LinearGradient
        colors={["#cff5fb", "#fcfdfd"]}
        style={{ flex: 1, paddingHorizontal: 5 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={{ width: "100%", flex: 0.4, marginBottom: 5 }}>
          <CustomerLocation />
        </View>
        <View style={{ width: "100%" }}>
          <View
            style={{
              width: "100%",
              borderRadius: 10,
              padding: 10,
              backgroundColor: "white",
              elevation: 5,
              flexDirection: "row",
            }}
          >
            <View>
              <Text style={{ fontSize: 10 }}>Client ID: {clientID}</Text>
              <Text style={{ fontSize: 20, fontWeight: "500" }}>{fName}</Text>
              <Text>
                <Rating
                  type="custom"
                  startingValue={rating.Rating}
                  readonly={true}
                  imageSize={20}
                />
              </Text>
              <Text>{contact}</Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Pressable
                onPress={() => {
                  const phoneUrl = `tel:${contact}`;
                  Linking.openURL(phoneUrl);
                }}
              >
                <Image
                  source={require("../../../../../assets/Icons/call.png")}
                  style={{ width: 30, height: 30 }}
                />
              </Pressable>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 5, flex: 1 }}>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <View style={{ width: "50%", paddingLeft: 5 }}>
              <ScrollView>
                <Text style={{ fontWeight: "700" }}> Request: </Text>
                <Text style={{ paddingLeft: 3 }}>
                  {serviceName.split(":")[0]}
                </Text>
                <Text style={{ fontWeight: "700" }}> Vehicle: </Text>
                <Text style={{ paddingLeft: 3 }}>{vehicle}</Text>
                <Text style={{ fontWeight: "700" }}> Details: </Text>
                <View style={{ paddingLeft: 3 }}>
                  <Text adjustsFontSizeToFit={true}>{description}</Text>
                </View>
              </ScrollView>
            </View>
            <View style={{ alignItems: "center", flex: 1 }}>
              <Image
                source={{ uri: imageUrl }}
                style={{ width: 150, height: 150, borderRadius: 10 }}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-evenly",
              paddingBottom: 10,
            }}
          >
            <View
              style={{
                backgroundColor: "red",
                paddingHorizontal: 50,
                paddingVertical: 10,
                borderRadius: 10,
              }}
            >
              <Pressable>
                <Text style={{ color: "white" }}>Decline</Text>
              </Pressable>
            </View>
            <View
              style={{
                backgroundColor: "#209589",
                paddingHorizontal: 50,
                paddingVertical: 10,
                borderRadius: 10,
              }}
            >
              <Pressable>
                <Text style={{ color: "white", fontWeight: "500" }}>
                  Accept
                </Text>
              </Pressable>
            </View>
            {/* <View style={{ ...styles.paddingButton }}>
              <Button
                color={"red"}
                title="Decline"
                onPress={() => {
                  dispatch(fetchDeleteReq(requestID));
                  navigation.reset({
                    index: 0,
                    routes: [{ name: "RequestList" }],
                  });
                }}
              />
            </View>
            <View style={{ ...styles.paddingButton }}>
              <Button
                title="Accept"
                onPress={() => {
                  dispatch(acceptReq(clientID, mechanicID, details, dispatch));
                  dispatch(fetchDeleteReq(requestID));
                }}
              />
            </View> */}
          </View>
        </View>
        {/* <View style={{ flex: 1, paddingHorizontal: 5 }}>
          <View
            style={{
              flex: 1,
              backgroundColor: "blue",
              marginBottom: 5,
              elevation: 10,
            }}
          >
            
          </View>

          <View>
            
            
          </View>
        </View> */}
      </LinearGradient>
    );
  }

  return (
    <View>
      <ActivityIndicator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 0,
    alignContent: "center",
    flex: 1,
    justifyContent: "center",
  },
  requestDetails: {
    position: "relative",
    width: "100%",
    padding: 20,
    borderRadius: 1,
    backgroundColor: "white",
    borderRadius: 10,
  },
  shadow: {
    shadowColor: "#228BD4",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 3,
  },
  fields: {
    padding: 5,
  },
  paddingButton: {
    padding: 3,
  },
});
