import { View, Text, FlatList, Image } from "react-native";
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
import Loading from "../../Loading";

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
            <Text>No request as of the moment</Text>
          </View>
        </LinearGradient>
      );
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Loading />
    </View>
  );
}
