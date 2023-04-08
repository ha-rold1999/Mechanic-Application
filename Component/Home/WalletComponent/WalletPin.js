import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserWallet,
  setWalletPin,
} from "../../../Redux/WalletReducers/WalletReducer";
import { TextInput } from "react-native-gesture-handler";

export default function WalletPin({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [pin, setPin] = useState("");

  const { UUID } = useSelector((state) => state.profileSlice);

  const { pincode } = useSelector((state) => state.walletSlice);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserWallet(UUID, setIsLoading));
  }, [dispatch, pincode, UUID]);

  const refreshComponent = () => {
    setIsLoading(true);
    setPin("");
    dispatch(getUserWallet(UUID, setIsLoading));
  };

  if (isLoading) {
    return <ActivityIndicator />;
  } else if (pincode === "") {
    return (
      <View>
        <Text>Please Enter your new Picode</Text>
        <TextInput onChangeText={setPin} required />
        <Button
          title="Submit"
          onPress={() => {
            dispatch(setWalletPin(UUID, pin));
            refreshComponent();
            navigation.navigate("WalletPin");
          }}
        />
      </View>
    );
  } else {
    return (
      <View>
        <Text>Enter Pin</Text>
        <TextInput onChangeText={setPin} />
        <Button
          title="Submit"
          onPress={() => {
            if (pin === pincode) {
              navigation.navigate("Wallet");
            } else {
              <Text>Pin Code Incorrect</Text>;
            }
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
