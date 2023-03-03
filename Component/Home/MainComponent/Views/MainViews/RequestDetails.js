import { useEffect } from "react";
import { View, Text, Pressable, Button } from "react-native";
import { useDispatch } from "react-redux";
import {
  fetchDeleteReq,
  acceptReq,
} from "../../../../../Redux/RequestListReducer/RequestListReducer";
import { getClientLocation } from "../../../../../Redux/MapReducers/ClientLocationReducer";
import CustomerLocation from "../../../MapComponent/CustomerLocation";

export default function RequestDetails({ route }) {
  const Data = route.params;
  const mechanicID = Data.Details.Recepient;
  const clientID = Data.Details.Requestor;
  const requestID = Data.Details.RequestID;
  const serviceName = Data.Details.ServiceName;
  const fName = Data.Details.FullName;
  const contact = Data.Details.Contact;
  const location = Data.Details.Location;
  const vehicle = Data.Details.Vehicle;
  const description = Data.Details.Description;

  const dispatch = useDispatch();

  const details = `Service: ${serviceName} | Client: ${fName} | Contact: ${contact} | Location: ${location} | Vehicle: ${vehicle} | Description: ${description}`;

  useEffect(() => {
    dispatch(getClientLocation(clientID));
  }, [dispatch]);

  return (
    <>
      <CustomerLocation />
      <View>
        <Text>{mechanicID}</Text>
        <Text>{clientID}</Text>
        <Text>{fName}</Text>
        <Text>{serviceName}</Text>
        <Text>{contact}</Text>
        <Text>{location}</Text>
        <Text>{vehicle}</Text>
        <Text>{description}</Text>
        <Button
          title="Decline"
          onPress={() => dispatch(fetchDeleteReq(mechanicID))}
        />
        <Button
          title="Accept"
          onPress={() => dispatch(acceptReq(clientID, mechanicID, details))}
        />
      </View>
    </>
  );
}
