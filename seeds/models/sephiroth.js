import mongoose from 'mongoose'
const Schema = mongoose.Schema

const SephirothSchema = new mongoose.Schema({
  numeral: { type: Schema.Types.ObjectId, refs: "Numeral"},
  hebrew: { type: Schema.Types.ObjectId, ref: "Word" },
  notes: [ { type: Schema.Types.ObjectId, refs: "Note"}],
  correspondences: [{ type: Schema.Types.ObjectId, refs: "Correspondence"}],
  sets: [ { type: Schema.Types.ObjectId, refs: "Set"}],
  user: { type: Schema.Types.ObjectId, refs: "User"},
  updatedAt: { type: Schema.Types.Number, default: Date.now() },
  createdAt: { type: Schema.Types.Number, default: Date.now() }
})

export default mongoose.model('Sephiroth', SephirothSchema, 'sephiroth')
