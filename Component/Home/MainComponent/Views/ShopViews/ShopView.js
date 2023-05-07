import { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  ImageBackground,
  ScrollView
} from "react-native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchService } from "../../../../../Redux/ProfileReducers/ServiceReducer";
import { apiKey } from "../../../../../Static";
import { Pressable } from "react-native";
import { deleteService } from "../../../../../Redux/ProfileReducers/ServiceReducer";
import { currancyFormat } from "../../../../../Static";

export default function Shop(props) {
  const dispatch = useDispatch();
  const { UUID, ShopName, ShopDescripction } = useSelector(
    (state) => state.profileSlice
  );

  useEffect(() => {
    dispatch(fetchService(UUID));
  }, [dispatch]);

  const { serviceLst } = useSelector((state) => state.serviceSlice);
  const ServiceList = ({ ServiceName, Price, ServiceExpertise, ServiceID }) => {
    return (
      <>
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: "70%" }}>
            <Text>Service: {ServiceName}</Text>
            <Text>Price: {currancyFormat.format(Price)}</Text>
            <Text>Expertise: {ServiceExpertise}</Text>
          </View>
          <View
            style={{
              flex: 1,
              width: "20%",
              marginLeft: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Pressable
              style={{
                padding: 5,
                borderRadius: 10,
                borderWidth: 1,
              }}
              onPress={() => {
                dispatch(deleteService(UUID, ServiceID));
                props.navigation.reset({
                  index: 0,
                  routes: [{ name: "ShopDesc" }],
                });
              }}
            >
              <Text style={{ color: "red" }}>DELETE</Text>
            </Pressable>
          </View>
        </View>
      </>
    );
  };

  return (
    <View style={{ ...styles.bigContainer }}>
      <ImageBackground
        resizeMode={"contain"}
        style={{
          flex: 1,
          position: "absolute",
          width: "100%",
          height: "100%",
          opacity: 0.15,
          backgroundColor: "#209589",
        }}
        source={require("../../../../../assets/Logo/ayus.png")}
      ></ImageBackground>
      <View style={{ height: "100%" }}>
        <View style={{ ...styles.logoContainer }}>
          <Text style={{ fontSize: 30 }}>Shop</Text>
          <Image
            style={{ ...styles.shopLogo }}
            source={require("../../../../../assets/Icons/shop.png")}
          />

          <Text style={{ fontSize: 20 }}>{ShopName}</Text>
          <Text style={{ fontSize: 15 }}>{ShopDescripction}</Text>
        </View>

        {serviceLst.length === 0 && <Text>You have no services offered</Text>}
        <View style={{paddingLeft:"12%", flex:1}}>
        <ScrollView style={{ width: "100%"}} contentContainerStyle={{ flexGrow: 1 }}>
        {serviceLst.map(({ ServiceName, UUID, Price, ServiceExpertise }) => (
            <View style={{ ...styles.serviceOffer }} key={UUID}>
              <ServiceList
                ServiceName={ServiceName}
                Price={Price}
                ServiceExpertise={ServiceExpertise}
                ServiceID={UUID}
              />
            </View>
          ))}
        </ScrollView>
        </View>
        
          
        <View style={{ ...styles.buttonContainer }}>
          <View
            style={{
              width: "50%",
              backgroundColor: "#209589",
              borderRadius: 10,
            }}
          >
            <Pressable
              style={{ alignItems: "center", paddingVertical: 10 }}
              onPress={() =>
                props.navigation.navigate("AddService", { mechanicID: UUID })
              }
            >
              <Text style={{ color: "white" }}>Add Service</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shopLogo: {
    width: 128,
    height: 128,
  },
  logoContainer: {
    position: "relative",
    alignItems: "center",
    textAlign: "center",
  },
  serviceOffer: {
    width: "80%",
    backgroundColor: "whitesmoke",
    borderColor: "black",
    borderWidth: 1,
    margin: 10,
    padding: 15,
    borderRadius: 10,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 10,
    alignContent: "center",
    alignItems: "center",
    width: "100%",
  },
  bigContainer: {
    height: "100%",
    backgroundColor: "white",
  },
});
