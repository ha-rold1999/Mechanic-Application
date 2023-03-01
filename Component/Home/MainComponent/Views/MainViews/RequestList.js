import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchRequestList } from "../../../../../Redux/RequestListReducer/RequestListReducer";
import { useEffect, useState } from "react";
import RequestCard from "./RequestCard";

export default function RequestList({ navigation }) {
  const { UUID } = useSelector((state) => state.profileSlice);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true)
  const { requestList } = useSelector((state) => state.requestListSlice);

  useEffect(() => {
    const time = setInterval(() => {
      dispatch(fetchRequestList(UUID));
      setIsLoading(false)
    }, 1000);
    return () => clearInterval(time);
  }, [dispatch]);

  if(!isLoading){
   
  const requestsDetails = requestList.ServiceRequests;
  //const newFilterData = requestsDetails.filter(_s => _s.status === "declined")
  return(
    <FlatList
      data={requestsDetails}
      renderItem={(request) => (
        <RequestCard details={request} navigation={navigation} />
      )}
    /> 
  )
  }
  

  return (
    <View>
      <Text>Request List Here</Text>
      <ActivityIndicator/>
    </View>
  );
}
