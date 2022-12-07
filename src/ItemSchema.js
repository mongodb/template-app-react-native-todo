import {BSON} from 'realm';

export class Item {
  constructor({
    _id = new BSON.ObjectId(),
    isComplete = false,
    owner_id,
  }) {
    this._id = _id;
    this.isComplete = isComplete;
    this.owner_id = owner_id;
  }

  static schema = {
    name: 'Item',
    properties: {
      _id: 'objectId',
      isComplete: {type: 'bool', default: false},
      summary: 'string',
      owner_id: 'string',
    },
    primaryKey: '_id',
  };
}
