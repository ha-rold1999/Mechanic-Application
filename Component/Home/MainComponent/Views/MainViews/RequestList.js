import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchRequestList } from "../../../../../Redux/RequestListReducer/RequestListReducer";
import { useEffect, useState } from "react";
import RequestCard from "./RequestCard";
import MapLocation from "../../../MapComponent/MapView";

export default function RequestList({ navigation }) {
  const { UUID } = useSelector((state) => state.profileSlice);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const { requestList } = useSelector((state) => state.requestListSlice);
  const requestsDetails = requestList.ServiceRequests;

  const { longitude } = useSelector((state) => state.locationSlice);

  useEffect(() => {
    const time = setInterval(() => {
      dispatch(fetchRequestList(UUID));
      setIsLoading(false);
    }, 5000);
    return () => clearInterval(time);
  }, [dispatch]);

  if (
    !isLoading &&
    requestList !== undefined &&
    requestsDetails !== undefined &&
    longitude !== ""
  ) {
    if (requestsDetails.length) {
      return (
        <>
          <MapLocation />
          <FlatList
            data={requestsDetails}
            renderItem={(request) => (
              <RequestCard details={request} navigation={navigation} />
            )}
          />
        </>
      );
    } else {
      return (
        <>
          <MapLocation />
          <Text>No Request as of the moment</Text>
        </>
      );
    }
  }

  return (
    <View>
      <Text>Request List Here</Text>
      <ActivityIndicator />
    </View>
  );
}
