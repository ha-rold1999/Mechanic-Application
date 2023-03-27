import { StyleSheet, Text, View, Modal, Button } from "react-native";
import { AirbnbRating } from "react-native-ratings";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { postReview } from "../../../../../Redux/RequestListReducer/RequestListReducer";

export default function ReviewModal(props) {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const { clienID } = useSelector((state) => state.requestListSlice);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
    >
      <Text>{clienID}</Text>
      <AirbnbRating
        onFinishRating={(rating) => {
          setRating(rating);
        }}
      />
      <Button
        title="Cancel"
        onPress={() => {
          props.setModalVisible(!props.modalVisible);
        }}
      />
      <Button
        title="Submit Rating"
        onPress={() => {
          dispatch(postReview(clienID, rating));
          props.setModalVisible(!props.modalVisible);
        }}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({});
