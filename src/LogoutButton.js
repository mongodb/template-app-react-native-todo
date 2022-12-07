import * as React from 'react';
import {Button, Alert} from 'react-native';
import {useUser} from '@realm/react';

export function LogoutButton() {
  const user = useUser();
  // The signOut function calls the logOut function on the currently
  // logged in user and then navigates to the welcome screen
  const signOut = () => {
    if (user) {
      user.logOut();
    }
  };

  return (
    <Button
      title="Log Out"
      onPress={() => {
        Alert.alert('Log Out', null, [
          {
            text: 'Yes, Log Out',
            style: 'destructive',
            onPress: () => signOut(),
          },
          {text: 'Cancel', style: 'cancel'},
        ]);
      }}
    />
  );
}
