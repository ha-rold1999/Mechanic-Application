import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import Loading from "../../Loading";
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
          <Text style={{ paddingLeft: 5, fontWeight: "700" }}>BillingList</Text>
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
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../../../../assets/Icons/empty.png")}
            style={{ width: 200, height: 200 }}
          />
          <Text>No billing list as of the moment</Text>
        </View>
      );
    }
  } else {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Loading />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
