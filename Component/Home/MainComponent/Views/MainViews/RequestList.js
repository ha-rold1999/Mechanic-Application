import { View, Text, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchRequestList } from "../../../../../Redux/RequestListReducer/RequestListReducer";
import { useEffect } from "react";
import RequestCard from "./RequestCard";

export default function RequestList({ navigation }) {
  const { UUID } = useSelector((state) => state.profileSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    const time = setInterval(() => {
      dispatch(fetchRequestList(UUID));
    }, 10000);
    return () => clearInterval(time);
  }, [dispatch]);

  const { requestList } = useSelector((state) => state.requestListSlice);
  const requestsDetails = requestList.ServiceRequests;
  return (
    <View>
      <Text>Request List Here</Text>
      <FlatList
        data={requestsDetails}
        renderItem={(request) => (
          <RequestCard details={request} navigation={navigation} />
        )}
      />
    </View>
  );
}
