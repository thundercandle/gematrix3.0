import mongoose from 'mongoose'
const Schema = mongoose.Schema

const SephirothSchema = new mongoose.Schema({
  numeralId: { type: Schema.Types.ObjectId, refs: "Numeral"},
  wordId: { type: Schema.Types.ObjectId, ref: "Word" },
  noteIds: [ { type: Schema.Types.ObjectId, refs: "Note"}],
  correspondenceIds: [{ type: Schema.Types.ObjectId, refs: "Correspondence"}],
  setIds: [ { type: Schema.Types.ObjectId, refs: "Set"}],
  userId: { type: Schema.Types.ObjectId, refs: "User"},
  updatedAt: { type: Schema.Types.Number, default: Date.now() },
  createdAt: { type: Schema.Types.Number, default: Date.now() }
})

export default mongoose.model('Sephiroth', SephirothSchema, 'sephiroth')
