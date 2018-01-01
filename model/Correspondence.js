import DataLoader from 'dataloader';
import findByIds from 'mongo-find-by-ids';

export default class Correspondence {
  constructor(context) {
    this.context = context;
    this.collection = context.db.collection('correspondence');
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

  set(correspondence) {
    return this.context.Set.findOneById(correspondence.setId);
  }

  sephiroth(correspondence) {
    return this.context.Sephiroth.findOneById(correspondence.sephirothId);
  }

  letter(correspondence) {
    return this.context.Letter.findOneById(correspondence.letterId);
  }

  notes(correspondence, { lastCreatedAt = 0, limit = 10 }) {
    return this.context.Note.collection.find({
      correspondenceId: correspondence._id,
      createdAt: { $gt: lastCreatedAt },
    }).sort({ createdAt: 1 }).limit(limit).toArray();
  }

  async insert(doc) {
    const docToInsert = Object.assign({}, doc, {
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    const id = (await this.collection.insertOne(docToInsert)).insertedId;
    this.pubsub.publish('correspondenceInserted', await this.findOneById(id));
    return id;
  }

  async updateById(id, doc) {
    const ret = await this.collection.update({ _id: id }, {
      $set: Object.assign({}, doc, {
        updatedAt: Date.now(),
      }),
    });
    this.loader.clear(id);
    this.pubsub.publish('correspondenceUpdated', await this.findOneById(id));
    return ret;
  }

  async removeById(id) {
    const ret = this.collection.remove({ _id: id });
    this.loader.clear(id);
    this.pubsub.publish('correspondenceRemoved', id);
    return ret;
  }
}
