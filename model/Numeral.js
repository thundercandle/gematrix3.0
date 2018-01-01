import DataLoader from 'dataloader';
import findByIds from 'mongo-find-by-ids';

export default class Numeral {
  constructor(context) {
    this.context = context;
    this.collection = context.db.collection('numeral');
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

  user(numeral) {
    return this.context.User.findOneById(numeral.userId);
  }

  words(numeral, { lastCreatedAt = 0, limit = 10 }) {
    return this.context.Word.collection.find({
      numeralId: numeral._id,
      createdAt: { $gt: lastCreatedAt },
    }).sort({ createdAt: 1 }).limit(limit).toArray();
  }

  notes(numeral, { lastCreatedAt = 0, limit = 10 }) {
    return this.context.Note.collection.find({
      numeralId: numeral._id,
      createdAt: { $gt: lastCreatedAt },
    }).sort({ createdAt: 1 }).limit(limit).toArray();
  }

  letter(numeral) {
    return this.context.Letter.findOneById(numeral.letterId);
  }

  sephiroth(numeral) {
    return this.context.Sephiroth.findOneById(numeral.sephirothId);
  }

  async insert(doc) {
    const docToInsert = Object.assign({}, doc, {
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    const id = (await this.collection.insertOne(docToInsert)).insertedId;
    this.pubsub.publish('numeralInserted', await this.findOneById(id));
    return id;
  }

  async updateById(id, doc) {
    const ret = await this.collection.update({ _id: id }, {
      $set: Object.assign({}, doc, {
        updatedAt: Date.now(),
      }),
    });
    this.loader.clear(id);
    this.pubsub.publish('numeralUpdated', await this.findOneById(id));
    return ret;
  }

  async removeById(id) {
    const ret = this.collection.remove({ _id: id });
    this.loader.clear(id);
    this.pubsub.publish('numeralRemoved', id);
    return ret;
  }
}
