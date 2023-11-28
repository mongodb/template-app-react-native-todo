import React, {useCallback} from 'react';
import {Pressable, Alert, View, Text, StyleSheet} from 'react-native';
import {useUser} from '@realm/react';
import {colors} from './Colors';

export function LogoutButton() {
  const user = useUser();

  // The signOut function calls the logOut function on the currently
  // logged in user and then navigates to the welcome screen
  const signOut = useCallback(() => {
    user?.logOut();
  }, [user]);

  return (
    <Pressable
      onPress={() => {
        Alert.alert('Log Out', '', [
          {
            text: 'Yes, Log Out',
            style: 'destructive',
            onPress: () => signOut(),
          },
          {text: 'Cancel', style: 'cancel'},
        ]);
      }}>
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Log Out</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    paddingHorizontal: 12,
  },
  buttonText: {
    fontSize: 16,
    color: colors.primary,
  },
});
