import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRequestList,
  checkSession,
} from "../../../../../Redux/RequestListReducer/RequestListReducer";
import { useEffect, useState } from "react";
import RequestCard from "./RequestCard";
import MapLocation from "../../../MapComponent/MapView";
import InSessionDetails from "./InSessionDetails";

export default function RequestList({ navigation }) {
  const { UUID } = useSelector((state) => state.profileSlice);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const { requestList, inSession, sessionDetails } = useSelector(
    (state) => state.requestListSlice
  );
  const requestsDetails = requestList.ServiceRequests;

  const { longitude } = useSelector((state) => state.locationSlice);

  useEffect(() => {
    const time = setInterval(() => {
      dispatch(fetchRequestList(UUID));
      dispatch(checkSession(UUID));
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
    if (inSession) {
      return (
        <>
          <InSessionDetails />
        </>
      );
    } else if (sessionDetails !== null) {
      return (
        <>
          <InSessionDetails />
        </>
      );
    } else if (requestsDetails.length) {
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
