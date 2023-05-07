import { View, Text, Pressable, Image } from "react-native";
import { currancyFormat } from "../../../../../Static";

export default function RequestCard({ details, navigation }) {
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("RequestDetails", { Details: details.item })
      }
    >
      <View
        style={{
          margin: 4,
          elevation: 5,
          backgroundColor: "white",
          borderRadius: 10,
          paddingHorizontal: 5,
          paddingVertical: 10,
          paddingLeft: 20,
        }}
      >
        <Text style={{ fontWeight: "600", fontSize: 15 }}>
          {details.item.Service.split(":")[0]}
        </Text>
        <Text style={{ fontSize: 15 }}>
          {currancyFormat.format(details.item.Service.split(":")[1])}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Image
            source={require("../../../../../assets/Icons/person.png")}
            style={{ width: 20, height: 20 }}
          />
          <Text style={{ fontSize: 15, paddingLeft: 5 }}>
            {details.item.FullName}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Image
            source={require("../../../../../assets/Icons/vehicle.png")}
            style={{ width: 20, height: 20 }}
          />
          <Text style={{ fontSize: 15, paddingLeft: 5 }}>
            {details.item.Vehicle}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
