import mongoose from 'mongoose'
const Schema = mongoose.Schema

const LetterSchema = new mongoose.Schema({
  pronunciation: { type: String},
  character: { type: String },
  transliteration: { type: String },
  numeral: { type: Schema.ObjectId, refs: "Numeral"},
  userId: { type: Schema.ObjectId, refs: "Letter", required: true},
  correspondences: [{ type: Schema.ObjectId, refs: "Correspondence"}],
  updatedAt: { type: Schema.Types.Number, default: Date.now() },
  createdAt: { type: Schema.Types.Number, default: Date.now() }
})

export default mongoose.model('Letter', LetterSchema, 'letter')