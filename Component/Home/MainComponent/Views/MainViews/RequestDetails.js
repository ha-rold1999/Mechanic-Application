import { View, Text } from "react-native";

export default function RequestDetails({ route }) {
  const Data = route.params;
  const client = Data.Details.Recepient;
  const service = Data.Details.Service;
  const contact = Data.Details.Contact;
  const location = Data.Details.Location;
  const vehicle = Data.Details.Vehicle;
  const description = Data.Details.Description;

  return (
    <View>
      <Text>{client}</Text>
      <Text>{service}</Text>
      <Text>{contact}</Text>
      <Text>{location}</Text>
      <Text>{vehicle}</Text>
      <Text>{description}</Text>
    </View>
  );
}
