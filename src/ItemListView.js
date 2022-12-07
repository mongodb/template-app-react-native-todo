import React, {useEffect, useState, useMemo} from 'react';
import {BSON} from 'realm';
import {useUser} from '@realm/react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Overlay, ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import {CreateToDoPrompt} from './CreateToDoPrompt';
import RealmContext from './RealmContext';
const {useRealm, useQuery} = RealmContext;

Icon.loadFont(); // load FontAwesome font

export function ItemListView() {
  const realm = useRealm();
  const items = useQuery('Item');
  const user = useUser();
  const [showNewItemOverlay, setShowNewItemOverlay] = useState(false);

  useEffect(() => {
    // initialize the subscriptions
    const updateSubscriptions = async () => {
      await realm.subscriptions.update(mutableSubs => {
        // subscribe to all of the logged in user's to-do items
        let ownItems = realm
          .objects("Item")
          .filtered(`owner_id == "${user.id}"`);
        // use the same name as the initial subscription to update it
        mutableSubs.add(ownItems, {name: "ownItems"});
      });
    };
    updateSubscriptions();
  }, [realm, user]);

  // createItem() takes in a summary and then creates an Item object with that summary
  const createItem = ({summary}) => {
    // if the realm exists, create an Item
    if (realm) {
      realm.write(() => {
        realm.create('Item', {
          _id: new BSON.ObjectID(),
          owner_id: user.id,
          summary,
        });
      });
    }
  };

  // deleteItem() deletes an Item with a particular _id
  const deleteItem = _id => {
    // if the realm exists, get the Item with a particular _id and delete it
    if (realm) {
      const item = realm.objectForPrimaryKey('Item', _id); // search for a realm object with a primary key that is an objectId
      realm.write(() => {
        realm.delete(item);
      });
    }
  };
  // toggleItemIsComplete() updates an Item with a particular _id to be 'completed'
  const toggleItemIsComplete = _id => {
    // if the realm exists, get the Item with a particular _id and update it's 'isCompleted' field
    if (realm) {
      const item = realm.objectForPrimaryKey('Item', _id); // search for a realm object with a primary key that is an objectId
      realm.write(() => {
        item.isComplete = !item.isComplete;
      });
    }
  };

  return (
    <SafeAreaProvider>
      <View style={styles.viewWrapper}>
        <Button
          title="+ ADD TO-DO"
          buttonStyle={styles.addToDoButton}
          onPress={() => setShowNewItemOverlay(true)}
        />
        <Overlay
          isVisible={showNewItemOverlay}
          onBackdropPress={() => setShowNewItemOverlay(false)}>
          <CreateToDoPrompt
            onSubmit={({summary}) => {
              setShowNewItemOverlay(false);
              createItem({summary});
            }}
          />
        </Overlay>
        {items.map(item => (
          <ListItem key={`${item._id}`} bottomDivider topDivider>
            <ListItem.Title style={styles.itemTitle}>
              {item.summary}
            </ListItem.Title>
            <ListItem.CheckBox
              checked={item.isComplete}
              onPress={() => toggleItemIsComplete(item._id)}
            />
            <Button
              type="clear"
              onPress={() => deleteItem(item._id)}
              icon={<Icon name="times" size={12} color="#979797" />}
            />
          </ListItem>
        ))}
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Log in with the same account on another device or simulator to see
          your list sync in real-time
        </Text>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  viewWrapper: {
    flex: 1,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  footerText: {
    fontSize: 16,
    textAlign: 'center',
  },
  footer: {
    margin: 40,
  },
  addToDoButton: {
    backgroundColor: '#00BAD4',
    borderRadius: 4,
    margin: 5,
  },
  itemTitle: {
    flex: 1,
  },
});
