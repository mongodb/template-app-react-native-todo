import React, {useState} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {useRealm} from '@realm/react';
import {colors} from './Colors';

export function OfflineModeButton() {
  const realm = useRealm();

  const [pauseSync, togglePauseSync] = useState(false);

  return (
    <Pressable
      onPress={() => {
        if (!pauseSync && realm.syncSession?.state === 'active') {
          realm.syncSession.pause();
          togglePauseSync(true);
        } else if (pauseSync && realm.syncSession?.state === 'inactive') {
          realm.syncSession.resume();
          togglePauseSync(false);
        }
      }}>
      <Text style={styles.buttonText}>
        {realm.syncSession?.state === 'active' ? 'Disable Sync' : 'Enable Sync'}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    padding: 12,
    color: colors.primary,
  },
});
