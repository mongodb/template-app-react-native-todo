import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AppProvider, UserProvider} from '@realm/react';

import {appId, baseUrl} from '../atlasConfig.json';
import {LogoutButton} from './LogoutButton';
import {WelcomeView} from './WelcomeView';
import {ItemListView} from './ItemListView';
import {realmContext} from './RealmContext';
import {OfflineModeButton} from './OfflineModeButton';

const {RealmProvider} = realmContext;

const Stack = createStackNavigator();

const AppWrapper = () => {
  return (
    <AppProvider id={appId} baseUrl={baseUrl}>
      <UserProvider fallback={WelcomeView}>
        <App />
      </UserProvider>
    </AppProvider>
  );
};

const LoadingIndicator = () => {
  return (
    <View style={styles.activityContainer}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const headerRight = () => {
  return <OfflineModeButton />;
};

const headerLeft = () => {
  return <LogoutButton />;
};

const App = () => {
  return (
    <>
      <RealmProvider
        sync={{
          flexible: true,
          onError: (_, error) => {
            // Show sync errors in the console
            console.error(error);
          },
        }}
        fallback={LoadingIndicator}>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Your To-Do List"
                component={ItemListView}
                options={{
                  headerTitleAlign: 'center',
                  headerLeft,
                  headerRight,
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Log in with the same account on another device or simulator to see
              your list sync in real time
            </Text>
          </View>
        </SafeAreaProvider>
      </RealmProvider>
    </>
  );
};

const styles = StyleSheet.create({
  footerText: {
    fontSize: 12,
    textAlign: 'center',
  },
  footer: {
    padding: 24,
  },
  activityContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default AppWrapper;
