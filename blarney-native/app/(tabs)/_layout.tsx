import { Tabs } from 'expo-router';

//TabLayout()
// -- This layout file controls all screens inside the (tabs) folder.
// -- headerShown: false hides the default top navigation bar.
// -- tabBarStyle: { display: 'none' } hides the bottom bar visually.
// -- one screen ('index') representing the Home screen

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarStyle: { display: 'none' } }}>
      
      <Tabs.Screen name="index" options={{ tabBarButton: () => null }} />
    </Tabs>
  );
}
