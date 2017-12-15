import mongoose from 'mongoose'
const Schema = mongoose.Schema

const SephirothSchema = new mongoose.Schema({
  numeralId: { type: Schema.Types.ObjectId, refs: "Numeral"},
  hebrew: { type: Schema.Types.ObjectId, ref: "Word" },
  translation: { type: Schema.Types.String },
  pronunciation: { type: Schema.Types.String},
  notes: [ { type: Schema.Types.ObjectId, refs: "Note"}],
  correspondences: [{ type: Schema.Types.ObjectId, refs: "Correspondence"}],
  sets: [ { type: Schema.Types.ObjectId, refs: "Set"}],
  updatedAt: { type: Schema.Types.Number, default: Date.now() },
  createdAt: { type: Schema.Types.Number, default: Date.now() }
})

export default mongoose.model('Sephiroth', SephirothSchema, 'sephiroth')
