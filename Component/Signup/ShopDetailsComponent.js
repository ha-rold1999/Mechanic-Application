import { View, Text, TextInput, Image } from "react-native";
import FormStyle from "../../Style/Component/StyleSignupComponent";
import { useSelector, useDispatch } from "react-redux";
import * as ShopDetails from "../../Redux/SignupFormReducers/ShopInfoFormSlice";

export default function ShopInfo() {
  const shopName = useSelector(ShopDetails.shopName);
  const shopDescription = useSelector(ShopDetails.shopDescription);

  const shopNameError = useSelector(ShopDetails.shopNameError);

  const dispatch = useDispatch();
  return (
    <>
      <Text style={FormStyle.label}>Shop Name</Text>
      <View style={FormStyle.textInputView}>
        <Image
          source={require("../../assets/Icons/license.png")}
          style={{ width: 30, height: 30, marginHorizontal: 5 }}
        />
        <TextInput
          style={FormStyle.input}
          value={shopName}
          onChangeText={(text) => dispatch(ShopDetails.handleShopname(text))}
        />
      </View>
      {shopNameError && <Text style={{ color: "red" }}>{shopNameError}</Text>}

      <Text style={FormStyle.label}>Shop Details</Text>
      <View style={FormStyle.textInputView}>
        <Image
          source={require("../../assets/Icons/license.png")}
          style={{ width: 30, height: 30, marginHorizontal: 5 }}
        />
        <TextInput
          style={FormStyle.input}
          multiline={true}
          value={shopDescription}
          onChangeText={(text) => dispatch(ShopDetails.handleShopDesc(text))}
        />
      </View>
    </>
  );
}
