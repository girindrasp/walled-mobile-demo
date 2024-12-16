import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: 'black',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="(home)" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }}/>
      <Stack.Screen name="register" options={{ headerShown: false }}/>
      <Stack.Screen
        name="Tnc"
        options={{
          presentation: 'modal',
        }}
      />
      {/* <Stack.Screen name="home/index" options={{ headerShown: false }}/> */}
    </Stack>
  );
}
