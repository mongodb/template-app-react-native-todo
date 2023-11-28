import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StyleSheet, Linking, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {dataExplorerLink} from '../atlasConfig.json';
import {LogoutButton} from './LogoutButton';
import {ItemListView} from './ItemListView';
import {OfflineModeButton} from './OfflineModeButton';

// If you're getting this app code by cloning the repository at
// https://github.com/mongodb/ template-app-react-native-todo,
// it does not contain the data explorer link. Download the
// app template from the Atlas UI to view a link to your data
const dataExplorerMessage = `View your data in MongoDB Atlas: ${dataExplorerLink}.`;

console.log(dataExplorerMessage);

const Stack = createStackNavigator();

const headerRight = () => {
  return <OfflineModeButton />;
};

const headerLeft = () => {
  return <LogoutButton />;
};

export const App = () => {
  return (
    <>
      {/* All screens nested in RealmProvider have access
            to the configured realm's hooks. */}
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
            your list sync in real time.
          </Text>

          {dataExplorerLink && (
            <View>
              <Text style={styles.footerText}>
                You can view your data in MongoDB Atlas:
              </Text>
              <Text
                style={[styles.footerText, styles.hyperlink]}
                onPress={() => Linking.openURL(dataExplorerLink)}>
                {dataExplorerLink}.
              </Text>
            </View>
          )}
        </View>
      </SafeAreaProvider>
    </>
  );
};

const styles = StyleSheet.create({
  footerText: {
    fontSize: 12,
    textAlign: 'center',
    marginVertical: 4,
  },
  hyperlink: {
    color: 'blue',
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
});
