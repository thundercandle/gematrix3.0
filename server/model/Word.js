import DataLoader from 'dataloader';
import findByIds from 'mongo-find-by-ids';

export default class Word {
  constructor(context) {
    this.context = context;
    this.collection = context.db.collection('word');
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

  numeral(word) {
    return this.context.Numeral.findOneById(word.numeralId);
  }

  notebooks(word, { lastCreatedAt = 0, limit = 10 }) {
    return this.context.Notebook.collection.find({
      wordIds: word._id,
      createdAt: { $gt: lastCreatedAt },
    }).sort({ createdAt: 1 }).limit(limit).toArray();
  }

  user(word) {
    return this.context.User.findOneById(word.userId);
  }

  letters(word, { lastCreatedAt = 0, limit = 10 }) {
    return this.context.Letter.collection.find({
      wordId: word._id,
      createdAt: { $gt: lastCreatedAt },
    }).sort({ createdAt: 1 }).limit(limit).toArray();
  }

  notes(word, { lastCreatedAt = 0, limit = 10 }) {
    return this.context.Note.collection.find({
      wordId: word._id,
      createdAt: { $gt: lastCreatedAt },
    }).sort({ createdAt: 1 }).limit(limit).toArray();
  }

  async insert(doc) {
    const docToInsert = Object.assign({}, doc, {
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    const id = (await this.collection.insertOne(docToInsert)).insertedId;
    this.pubsub.publish('wordInserted', await this.findOneById(id));
    return id;
  }

  async updateById(id, doc) {
    const ret = await this.collection.update({ _id: id }, {
      $set: Object.assign({}, doc, {
        updatedAt: Date.now(),
      }),
    });
    this.loader.clear(id);
    this.pubsub.publish('wordUpdated', await this.findOneById(id));
    return ret;
  }

  async removeById(id) {
    const ret = this.collection.remove({ _id: id });
    this.loader.clear(id);
    this.pubsub.publish('wordRemoved', id);
    return ret;
  }
}
