import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { List } from './List';
import { Details } from './Details';

export const SharedComponent = () => {
  const Stack = createSharedElementStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="List" component={List} />
        <Stack.Screen
          name="Details"
          component={Details}
          sharedElements={(route) => [route.params.post.id.toString()]}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
