import { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchService } from "../../../../../Redux/ProfileReducers/ServiceReducer";

export default function Shop(props) {
  const dispatch = useDispatch();
  const { UUID, ShopName, ShopDescripction } = useSelector(
    (state) => state.profileSlice
  );

  useEffect(() => {
    dispatch(fetchService(UUID));
  }, [dispatch]);

  const { serviceLst } = useSelector((state) => state.serviceSlice);

  return (
    <View>
      <Text>My Shop</Text>
      <Text>{UUID}</Text>
      <Text>{ShopName}</Text>
      <Text>{ShopDescripction}</Text>
      {serviceLst.length === 0 && <Text>You have no services offered</Text>}
      <Button
        title="Add Service"
        onPress={() =>
          props.navigation.navigate("AddService", { ShopID: UUID })
        }
      />
    </View>
  );
}
