import { useEffect } from "react";
import { View, Text, Pressable, Button, StyleSheet, Image } from "react-native";
import { useDispatch } from "react-redux";
import {
  fetchDeleteReq,
  acceptReq,
} from "../../../../../Redux/RequestListReducer/RequestListReducer";
import { getClientLocation } from "../../../../../Redux/MapReducers/ClientLocationReducer";
import CustomerLocation from "../../../MapComponent/CustomerLocation";

export default function RequestDetails({ route, navigation }) {
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

  console.log("Request Details: " + JSON.stringify(Data.Details, null, 2));
  const dispatch = useDispatch();

  const details = `Service: ${serviceName} | Client: ${fName} | Contact: ${contact} | Location: ${location} | Vehicle: ${vehicle} | Description: ${description}`;

  console.log(serviceName);
  useEffect(() => {
    dispatch(getClientLocation(clientID));
  }, [dispatch]);

  return (
    <>
      <CustomerLocation />
      <View style={{ ...styles.container }}>
        <Text style={{ textAlign: "center", padding: 10, fontSize: 20 }}>
          Service Request
        </Text>
        <View style={{ ...styles.requestDetails, ...styles.shadow }}>
          <Text style={{ ...styles.fields }}>Requestor: {fName}</Text>
          <Text style={{ ...styles.fields }}>Service: {serviceName}</Text>
          <Text style={{ ...styles.fields }}>Contact: {contact}</Text>
          <Text style={{ ...styles.fields }}>Location: {location}</Text>
          <Text style={{ ...styles.fields }}>Vehicle: {vehicle}</Text>
          <Text style={{ ...styles.fields }}>Information: {description}</Text>
          <View style={{ ...styles.paddingButton }}>
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
                dispatch(acceptReq(clientID, mechanicID, details));
                dispatch(fetchDeleteReq(requestID));
              }}
            />
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    padding: 10,
    alignContent: "center",
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#e8f1f8",
  },
  requestDetails: {
    position: "relative",
    width: "100%",
    padding: 20,
    borderRadius: 1,
    backgroundColor: "white",
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
