import DataLoader from 'dataloader';
import findByIds from 'mongo-find-by-ids';

export default class Sephiroth {
  constructor(context) {
    this.context = context;
    this.collection = context.db.collection('sephiroth');
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

  numeral(sephiroth) {
    return this.context.Numeral.findOneById(sephiroth.numeralId);
  }

  hebrew(sephiroth) {
    return this.context.Word.findOneById(sephiroth.hebrewId);
  }

  notes(sephiroth, { lastCreatedAt = 0, limit = 10 }) {
    return this.context.Note.collection.find({
      sephirothId: sephiroth._id,
      createdAt: { $gt: lastCreatedAt },
    }).sort({ createdAt: 1 }).limit(limit).toArray();
  }

  correspondences(sephiroth, { lastCreatedAt = 0, limit = 10 }) {
    return this.context.Correspondence.collection.find({
      sephirothId: sephiroth._id,
      createdAt: { $gt: lastCreatedAt },
    }).sort({ createdAt: 1 }).limit(limit).toArray();
  }

  sets(sephiroth, { lastCreatedAt = 0, limit = 10 }) {
    return this.context.Set.collection.find({
      sephirothIds: sephiroth._id,
      createdAt: { $gt: lastCreatedAt },
    }).sort({ createdAt: 1 }).limit(limit).toArray();
  }

  user(sephiroth) {
    return this.context.User.findOneById(sephiroth.userId);
  }

  async insert(doc) {
    const docToInsert = Object.assign({}, doc, {
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    const id = (await this.collection.insertOne(docToInsert)).insertedId;
    this.pubsub.publish('sephirothInserted', await this.findOneById(id));
    return id;
  }

  async updateById(id, doc) {
    const ret = await this.collection.update({ _id: id }, {
      $set: Object.assign({}, doc, {
        updatedAt: Date.now(),
      }),
    });
    this.loader.clear(id);
    this.pubsub.publish('sephirothUpdated', await this.findOneById(id));
    return ret;
  }

  async removeById(id) {
    const ret = this.collection.remove({ _id: id });
    this.loader.clear(id);
    this.pubsub.publish('sephirothRemoved', id);
    return ret;
  }
}
