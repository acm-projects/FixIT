import { Stack } from 'expo-router';

export default function SearchLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="[query]" 
        options={{
          headerTitle: "Search",
          headerStyle: {
            backgroundColor: '#B1A180',
          },
          headerTintColor: '#23603F',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack>
  );
}