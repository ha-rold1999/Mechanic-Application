import { View, Text, TextInput, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { apiKey, server } from "../../../../../Static";
import FormStyle from "../../../../../Style/Component/StyleSignupComponent";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

export default function AddService({ navigation, route }) {
  const ShopData = route.params;
  const [serviceList, setServiceList] = useState([]);

  const [selectedValue, setSelectedValue] = useState("");
  const [selectedValueError, setSelectedValueError] = useState();
  const [price, setPrice] = useState(0);
  const [priceError, setPriceError] = useState();
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
  }, [selectedValue, selectedValueError, price, priceError]);

  return (
    <View style={{ flex: 1, marginHorizontal: 10 }}>
      <Text style={{ fontSize: 20, fontWeight: "700" }}>Add Service</Text>
      <View style={{ marginTop: 10 }}>
        <Text>Select Service To Offer</Text>
        <View
          style={{ backgroundColor: "white", borderWidth: 1, borderRadius: 10 }}
        >
          <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue) => {
              setSelectedValue(itemValue);
            }}
          >
            <Picker.Item
              label={"Select a service to offer"}
              value={"default"}
            />
            {serviceList.map(({ ServiceName, ServiceID }) => (
              <Picker.Item
                label={ServiceName}
                value={ServiceName}
                key={ServiceID}
              />
            ))}
          </Picker>
        </View>
        {selectedValueError && (
          <Text style={{ color: "red" }}>{selectedValueError}</Text>
        )}

        <Text>Enter Price</Text>

        <View style={FormStyle.textInputView}>
          <TextInput
            style={{ paddingLeft: 5, fontSize: 20, width: "100%" }}
            onChangeText={(text) => {
              setPrice(text);
            }}
            keyboardType={"numeric"}
          />
        </View>
        {priceError && <Text style={{ color: "red" }}>{priceError}</Text>}
        <Text>Enter Your Qualificatio For This Service</Text>
        <View style={FormStyle.textInputView}>
          <TextInput
            style={{
              paddingLeft: 5,
              fontSize: 20,
              width: "100%",
            }}
            onChangeText={(text) => {
              setServiceExperties(text);
            }}
          />
        </View>
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <Pressable
            style={{
              paddingHorizontal: 100,
              paddingVertical: 10,
              backgroundColor: "#209589",
              borderRadius: 10,
            }}
            onPress={() => {
              if (!selectedValue || selectedValue === "default") {
                setSelectedValueError(
                  "Please select a service you want to offer"
                );
              } else {
                setSelectedValueError("");
              }

              if (!price) {
                setPriceError("Enter the price of the service");
              } else {
                setPriceError("");
              }

              if (selectedValueError === "" && priceError === "") {
                console.log("Accepted");
                fetchAddThisService();
                navigation.navigate("ShopDesc");
              }
            }}
          >
            <Text style={{ fontWeight: "500", color: "white" }}>
              Add Service
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
