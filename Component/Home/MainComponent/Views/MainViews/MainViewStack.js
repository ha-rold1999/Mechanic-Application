import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RequestList from "./RequestList";
import RequestCard from "./RequestCard";
import RequestDetails from "./RequestDetails";

export default function MainViewStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="RequestList"
    >
      <Stack.Screen name="RequestList" component={RequestList} />
      <Stack.Screen name="RequestCard" component={RequestCard} />
      <Stack.Screen name="RequestDetails" component={RequestDetails} />
    </Stack.Navigator>
  );
}
