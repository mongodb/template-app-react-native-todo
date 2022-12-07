import React, {useState} from 'react';
import Realm from 'realm';
import {useApp} from '@realm/react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StyleSheet, Text, View, Alert} from 'react-native';
import {Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

Icon.loadFont(); // load FontAwesome font

export function WelcomeView({navigation, route}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // state values for toggable visibility of features in the UI
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [isInSignUpMode, setIsInSignUpMode] = useState(true);

  const app = useApp();

  // signIn() uses the emailPassword authentication provider to log in
  const signIn = async () => {
    const creds = Realm.Credentials.emailPassword(email, password);
    await app.logIn(creds);
  };

  // onPressSignIn() uses the emailPassword authentication provider to log in
  const onPressSignIn = async () => {
    try {
      await signIn(email, password);
    } catch (error) {
      Alert.alert(`Failed to sign in: ${error.message}`);
    }
  };

  // onPressSignUp() registers the user and then calls signIn to log the user in
  const onPressSignUp = async () => {
    try {
      await app.emailPasswordAuth.registerUser({email, password});
      signIn(email, password);
    } catch (error) {
      Alert.alert(`Failed to sign up: ${error.message}`);
    }
  };

  return (
    <SafeAreaProvider>
      <View style={styles.viewWrapper}>
        <Text style={styles.title}>My Sync App</Text>
        <Input
          placeholder="email"
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <Input
          placeholder="password"
          onChangeText={setPassword}
          secureTextEntry={passwordHidden}
          rightIcon={
            <Icon
              name={passwordHidden ? 'eye-slash' : 'eye'}
              size={12}
              color="black"
              onPress={() => setPasswordHidden(!passwordHidden)}
            />
          }
        />
        {isInSignUpMode ? (
          <>
            <Button
              title="Create Account"
              buttonStyle={styles.mainButton}
              onPress={onPressSignUp}
            />
            <Button
              title="Already have an account? Log In"
              type="clear"
              onPress={() => setIsInSignUpMode(!isInSignUpMode)}
            />
          </>
        ) : (
          <>
            <Button
              title="Log In"
              buttonStyle={styles.mainButton}
              onPress={onPressSignIn}
            />
            <Button
              title="Don't have an account? Create Account"
              type="clear"
              onPress={() => setIsInSignUpMode(!isInSignUpMode)}
            />
          </>
        )}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  viewWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
  },
  mainButton: {
    width: 350,
  },
});
