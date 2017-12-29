import mongoose from 'mongoose'
const Schema = mongoose.Schema

const LetterSchema = new mongoose.Schema({
  language: { type: Schema.Types.String },
  pronunciation: { type: Schema.Types.String},
  character: { type: Schema.Types.String },
  transliteration: { type: Schema.Types.String },
  spelling: { type: Schema.Types.String },
  word: { type: Schema.Types.ObjectId, refs: "Word"},
  numeral: { type: Schema.Types.ObjectId, refs: "Numeral"},
  value: { type: Schema.Types.Number },
  user: { type: Schema.Types.ObjectId, refs: "Letter", required: true},
  correspondences: [{ type: Schema.Types.ObjectId, refs: "Correspondence"}],
  updatedAt: { type: Schema.Types.Number, default: Date.now() },
  createdAt: { type: Schema.Types.Number, default: Date.now() }
})

export default mongoose.model('Letter', LetterSchema, 'letter')
