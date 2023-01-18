import React, {useCallback, useState, useEffect} from 'react';
import {BSON} from 'realm';
import {useUser} from '@realm/react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  Alert,
  FlatList,
  RecyclerViewBackedScrollViewComponent,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import {Button, Overlay, ListItem, Icon} from 'react-native-elements';

import {CreateToDoPrompt} from './CreateToDoPrompt';
import {realmContext} from './RealmContext';

import {Item} from './ItemSchema';
import {COLORS} from './Colors';

const {useRealm, useQuery} = realmContext;

const itemSubscriptionName = 'items';
const ownItemsSubscriptionName = 'ownItems';

export function ItemListView() {
  const realm = useRealm();
  const items = useQuery(Item).sorted('_id');
  const user = useUser();

  const [showNewItemOverlay, setShowNewItemOverlay] = useState(false);

  // This state will be used to toggle between showing all items and only showing the current user's items
  // This is initialized based on which subscription is already active
  const [showAllItems, setShowAllItems] = useState(
    !!realm.subscriptions.findByName(itemSubscriptionName),
  );

  // This effect will initialize the subscription to the items collection
  // By default it will filter out all items that do not belong to the current user
  // If the user toggles the switch to show all items, the subscription will be updated to show all items
  // The old subscription will be removed and the new subscription will be added
  // This allows for tracking the state of the toggle switch by the name of the subscription
  useEffect(() => {
    if (showAllItems) {
      realm.subscriptions.update(mutableSubs => {
        mutableSubs.removeByName(ownItemsSubscriptionName);
        mutableSubs.add(realm.objects(Item), {name: itemSubscriptionName});
      });
    } else {
      realm.subscriptions.update(mutableSubs => {
        mutableSubs.removeByName(itemSubscriptionName);
        mutableSubs.add(
          realm.objects(Item).filtered(`owner_id == "${user?.id}"`),
          {name: ownItemsSubscriptionName},
        );
      });
    }
  }, [realm, user, showAllItems]);

  // createItem() takes in a summary and then creates an Item object with that summary
  const createItem = useCallback(
    ({summary}: {summary: string}) => {
      // if the realm exists, create an Item
      realm.write(() => {
        return new Item(realm, {
          summary,
          owner_id: user?.id,
        });
      });
    },
    [realm, user],
  );

  // deleteItem() deletes an Item with a particular _id
  const deleteItem = useCallback(
    (id: BSON.ObjectId) => {
      // if the realm exists, get the Item with a particular _id and delete it
      const item = realm.objectForPrimaryKey(Item, id); // search for a realm object with a primary key that is an objectId
      if (item) {
        if (item.owner_id !== user?.id) {
          Alert.alert("You can't delete someone else's task!");
        } else {
          realm.write(() => {
            realm.delete(item);
          });
        }
      }
    },
    [realm, user],
  );
  // toggleItemIsComplete() updates an Item with a particular _id to be 'completed'
  const toggleItemIsComplete = useCallback(
    (id: BSON.ObjectId) => {
      // if the realm exists, get the Item with a particular _id and update it's 'isCompleted' field
      const item = realm.objectForPrimaryKey(Item, id); // search for a realm object with a primary key that is an objectId
      if (item) {
        if (item.owner_id !== user?.id) {
          Alert.alert("You can't modify someone else's task!");
        } else {
          realm.write(() => {
            item.isComplete = !item.isComplete;
          });
        }
      }
    },
    [realm, user],
  );

  return (
    <SafeAreaProvider>
      <View style={styles.viewWrapper}>
        <View style={styles.toggleRow}>
          <Text style={styles.toggleText}>Show All Tasks</Text>
          <Switch
            trackColor={{true: '#00ED64'}}
            onValueChange={() => {
              if (realm.syncSession?.state !== 'active') {
                Alert.alert(
                  'Switching subscriptions does not affect Realm data when the sync is offline.',
                );
              }
              setShowAllItems(!showAllItems);
            }}
            value={showAllItems}
          />
        </View>
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
        <FlatList
          keyExtractor={item => item._id.toString()}
          data={items}
          renderItem={({item}) => (
            <ListItem
              key={`${item._id}`}
              bottomDivider
              topDivider
              hasTVPreferredFocus={undefined}
              tvParallaxProperties={undefined}>
              <ListItem.Title style={styles.itemTitle}>
                {item.summary}
              </ListItem.Title>
              <ListItem.Subtitle style={styles.itemSubtitle}>
                {item.owner_id === user?.id ? '(mine)' : ''}
              </ListItem.Subtitle>
              <ListItem.CheckBox
                checked={item.isComplete}
                checkedColor={COLORS.primary}
                iconType="material"
                checkedIcon="check-box"
                uncheckedIcon="check-box-outline-blank"
                onPress={() => toggleItemIsComplete(item._id)}
              />
              <Button
                type="clear"
                onPress={() => deleteItem(item._id)}
                icon={
                  <Icon
                    type="material"
                    name="clear"
                    size={12}
                    color="#979797"
                    tvParallaxProperties={undefined}
                  />
                }
              />
            </ListItem>
          )}
        />
        <Button
          title="Add To-Do"
          buttonStyle={styles.addToDoButton}
          onPress={() => setShowNewItemOverlay(true)}
          icon={
            <Icon
              type="material"
              name={'playlist-add'}
              style={styles.showCompletedIcon}
              color="#fff"
              tvParallaxProperties={undefined}
            />
          }
        />
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
  addToDoButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 4,
    margin: 5,
  },
  showCompletedButton: {
    borderRadius: 4,
    margin: 5,
  },
  showCompletedIcon: {
    marginRight: 5,
  },
  itemTitle: {
    flex: 1,
  },
  itemSubtitle: {
    color: '#979797',
    flex: 1,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  toggleText: {
    flex: 1,
    fontSize: 16,
  },
});
