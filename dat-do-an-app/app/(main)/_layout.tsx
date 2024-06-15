import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack initialRouteName="register" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="home" />
        <Stack.Screen name="food" />
        <Stack.Screen name="category" />
        <Stack.Screen name="basket" />
        <Stack.Screen name="order" />
        <Stack.Screen name="profile" />
      </Stack>
    </SafeAreaView>
  );
};
