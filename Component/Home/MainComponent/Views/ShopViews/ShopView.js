import { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchService } from "../../../../../Redux/ProfileReducers/ServiceReducer";
import { apiKey } from "../../../../../Static";

export default function Shop(props) {
  const dispatch = useDispatch();
  const { UUID, ShopName, ShopDescripction } = useSelector(
    (state) => state.profileSlice
  );

  useEffect(() => {
    dispatch(fetchService(UUID));
  }, [dispatch]);

  const { serviceLst } = useSelector((state) => state.serviceSlice);

  const ServiceList = ({ ServiceName, Price, ServiceExpertise }) => {
    return (
      <>
        <Text>{ServiceName}</Text>
        <Text>{Price}</Text>
        <Text>{ServiceExpertise}</Text>
      </>
    );
  };

  return (
    <View>
      <Text>My Shop</Text>
      <Text>{UUID}</Text>
      <Text>{ShopName}</Text>
      <Text>{ShopDescripction}</Text>
      {serviceLst.length === 0 && <Text>You have no services offered</Text>}
      {serviceLst.map(({ ServiceName, UUID, Price, ServiceExpertise }) => (
        <View key={UUID}>
          <ServiceList
            ServiceName={ServiceName}
            Price={Price}
            ServiceExpertise={ServiceExpertise}
          />
        </View>
      ))}
      <Button
        title="Add Service"
        onPress={() =>
          props.navigation.navigate("AddService", { mechanicID: UUID })
        }
      />
    </View>
  );
}
