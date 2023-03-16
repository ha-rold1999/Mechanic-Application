import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBillingLIst } from "../../../../../Redux/BillingReducers/BillingReducers";
import { useState } from "react";
import BillingCard from "./BillingCard";

export default function BillingList({ navigation }) {
  const dispatch = useDispatch();
  const { billingList } = useSelector((state) => state.billingSlice);
  const { ShopID } = useSelector((state) => state.profileSlice);
  const [billingListLength, setBillingListLength] = useState(0);

  useEffect(() => {
    dispatch(getBillingLIst(ShopID, dispatch));
    setBillingListLength(billingList.length);
  }, [billingListLength]);

  if (billingList !== undefined) {
    if (billingList.length) {
      return (
        <View>
          <Text>BillingList</Text>
          <FlatList
            data={billingList}
            renderItem={(details) => (
              <BillingCard info={details} navigation={navigation} />
            )}
          />
        </View>
      );
    } else {
      return (
        <View>
          <Text>No Billing as of the moment</Text>
        </View>
      );
    }
  } else {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
