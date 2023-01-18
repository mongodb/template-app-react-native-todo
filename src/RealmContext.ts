import {createRealmContext} from '@realm/react';
import {Item} from './ItemSchema';

export const realmContext = createRealmContext({
  schema: [Item],
});
