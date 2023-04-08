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
import { LinearGradient } from "expo-linear-gradient";

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
        <LinearGradient
          colors={["#cff5fb", "#fcfdfd"]}
          style={{ flex: 1 }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <MapLocation />
          <FlatList
            data={requestsDetails}
            renderItem={(request) => (
              <RequestCard details={request} navigation={navigation} />
            )}
          />
        </LinearGradient>
      );
    } else {
      return (
        <LinearGradient
          colors={["#cff5fb", "#fcfdfd"]}
          style={{ flex: 1 }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <MapLocation />
          <Text>No Request as of the moment</Text>
        </LinearGradient>
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
