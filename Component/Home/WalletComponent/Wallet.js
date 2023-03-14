import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserWallet } from "../../../Redux/WalletReducers/WalletReducer";

export default function Wallet({ navigation }) {
  const [isAdding, setIsAdding] = useState(false);

  const dispatch = useDispatch();

  const UUID = useSelector((state) => state.walletSlice);

  const { balance } = useSelector((state) => state.walletSlice);

  useEffect(() => {
    dispatch(getUserWallet(UUID));
  }, [isAdding, balance, dispatch]);

  return (
    <View>
      <Text>My Wallet</Text>
      <Text>My Balance: {balance}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
