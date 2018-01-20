import mongoose from 'mongoose'
const Schema = mongoose.Schema

const NumeralSchema = new mongoose.Schema({
  value: { type: Schema.Types.Number, required: true, unique: true },
  user: { type: Schema.Types.String, refs: "User"},
  equations: [{ type: Schema.Types.String }],
  words: [{ type: Schema.Types.ObjectId, ref: 'Word' }],
  notes: [{ type: Schema.Types.ObjectId, ref: 'Note'}],
  letters: [{ type: Schema.Types.ObjectId, ref: 'Letter' }],
  sephiorth: [{ type: Schema.Types.ObjectId, ref: 'Sephiroth'}],
  updatedAt: { type: Schema.Types.Number, default: Date.now() },
  createdAt: {type: Schema.Types.Number, default: Date.now()}
})

export default mongoose.model('Numeral', NumeralSchema, 'numeral')
