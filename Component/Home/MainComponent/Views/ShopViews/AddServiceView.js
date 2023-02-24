import { View, Text, TextInput, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { apiKey } from "../../../../../Static";

export default function AddService({ route }) {
  const ShopData = route.params;
  const [serviceList, setServiceList] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [price, setPrice] = useState(0);
  const [serviceExperties, setServiceExperties] = useState("");

  const fetchAllServices = async () => {
    try {
      await fetch("http://203.177.71.218:5003/api/System/Service", {
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
      await fetch("http://203.177.71.218:5003/api/Mechanic/Shop", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "AYUS-API-KEY": apiKey,
          MechanicUUID: ShopData.ShopID,
        },
        body: JSON.stringify({
          serviceID: selectedValue,
          price: price,
          serviceExpertise: serviceExperties,
        }),
      })
        .then((res) => res.json())
        .then((services) => console.log(services.Stataus))
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
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
        onValueChange={(itemValue) => setSelectedValue(itemValue)}
      >
        {serviceList.map(({ ServiceName, ServiceID }) => (
          <Picker.Item label={ServiceName} value={ServiceID} key={ServiceID} />
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
      <Button title="Add Service" onPress={() => fetchAddThisService()} />
    </View>
  );
}
