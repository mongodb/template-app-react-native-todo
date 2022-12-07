import {createRealmContext} from '@realm/react';
import {Item} from './ItemSchema';

export default createRealmContext({
  schema: [Item.schema],
});
