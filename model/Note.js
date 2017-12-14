import DataLoader from 'dataloader';
import findByIds from 'mongo-find-by-ids';

export default class Note {
  constructor(context) {
    this.context = context;
    this.collection = context.db.collection('note');
    this.pubsub = context.pubsub;
    this.loader = new DataLoader(ids => findByIds(this.collection, ids));
  }

  findOneById(id) {
    return this.loader.load(id);
  }

  all({ lastCreatedAt = 0, limit = 10 }) {
    return this.collection.find({
      createdAt: { $gt: lastCreatedAt },
    }).sort({ createdAt: 1 }).limit(limit).toArray();
  }

  word(note) {
    return this.context.Word.findOneById(note.wordId);
  }

  numeral(note) {
    return this.context.Numeral.findOneById(note.numeralId);
  }

  correspondence(note) {
    return this.context.Correspondence.findOneById(note.correspondenceId);
  }

  set(note) {
    return this.context.Set.findOneById(note.setId);
  }

  async insert(doc) {
    const docToInsert = Object.assign({}, doc, {
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    const id = (await this.collection.insertOne(docToInsert)).insertedId;
    this.pubsub.publish('noteInserted', await this.findOneById(id));
    return id;
  }

  async updateById(id, doc) {
    const ret = await this.collection.update({ _id: id }, {
      $set: Object.assign({}, doc, {
        updatedAt: Date.now(),
      }),
    });
    this.loader.clear(id);
    this.pubsub.publish('noteUpdated', await this.findOneById(id));
    return ret;
  }

  async removeById(id) {
    const ret = this.collection.remove({ _id: id });
    this.loader.clear(id);
    this.pubsub.publish('noteRemoved', id);
    return ret;
  }
}
