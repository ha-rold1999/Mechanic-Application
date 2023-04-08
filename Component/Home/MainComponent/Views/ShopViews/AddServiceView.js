import { View, Text, TextInput, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { apiKey, server } from "../../../../../Static";

export default function AddService({ navigation, route }) {
  const ShopData = route.params;
  const [serviceList, setServiceList] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [price, setPrice] = useState(0);
  const [serviceExperties, setServiceExperties] = useState("");

  const fetchAllServices = async () => {
    try {
      await fetch(`${server}/api/System/Service`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "AYUS-API-KEY": apiKey,
        },
      })
        .then((res) => res.json())
        .then((services) => setServiceList(services.Services))
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAddThisService = async () => {
    try {
      await fetch(`${server}/api/Mechanic/ServiceOffer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "AYUS-API-KEY": apiKey,
          MechanicUUID: ShopData.mechanicID,
        },
        body: JSON.stringify({
          serviceID: selectedValue,
          price: price,
          serviceExpertise: serviceExperties,
        }),
      })
        .then((res) => res.json())
        .catch((error) => console.log("inside Error: " + error));
    } catch (error) {
      console.log("Outsinde Error: " + error);
    }
  };

  useEffect(() => {
    fetchAllServices();
  }, []);

  return (
    <View>
      <Text>Add Service</Text>
      <Text>Select Service To Offer</Text>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue) => {
          setSelectedValue(itemValue);
        }}
      >
        {serviceList.map(({ ServiceName, ServiceID }) => (
          <Picker.Item
            label={ServiceName}
            value={ServiceName}
            key={ServiceID}
          />
        ))}
      </Picker>
      <Text>Enter Price</Text>
      <TextInput
        style={{ borderWidth: 1 }}
        onChangeText={(text) => {
          setPrice(text);
        }}
        keyboardType={"numeric"}
      />
      <Text>Enter Your Qualificatio For This Service</Text>
      <TextInput
        style={{ borderWidth: 1 }}
        onChangeText={(text) => {
          setServiceExperties(text);
        }}
      />
      <Button
        title="Add Service"
        onPress={() => {
          fetchAddThisService();
          navigation.navigate("ShopDesc");
        }}
      />
    </View>
  );
}
