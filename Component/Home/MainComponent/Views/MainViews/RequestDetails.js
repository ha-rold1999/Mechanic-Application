import { View, Text, Pressable, Button } from "react-native";
import { useDispatch } from "react-redux";
import { fetchDeleteReq } from "../../../../../Redux/RequestListReducer/RequestListReducer";

export default function RequestDetails({ route }) {
  const Data = route.params;
  const client = Data.Details.Recepient;
  const requestID = Data.Details.RequestID;
  const serviceName = Data.Details.ServiceName
  const fName = Data.Details.FullName;
  const contact = Data.Details.Contact;
  const location = Data.Details.Location;
  const vehicle = Data.Details.Vehicle;
  const description = Data.Details.Description;

  const dispatch= useDispatch()

  return (
    <View>
      <Text>{fName}</Text>
      <Text>{serviceName}</Text>  
      <Text>{contact}</Text>
      <Text>{location}</Text>
      <Text>{vehicle}</Text>
      <Text>{description}</Text>
      <Button title="Decline" onPress={()=>dispatch(fetchDeleteReq(requestID))}/>
    </View>
  );
}
