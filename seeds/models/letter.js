import mongoose from 'mongoose'
const Schema = mongoose.Schema

const LetterSchema = new mongoose.Schema({
  language: { type: Schema.Types.String },
  pronunciation: { type: Schema.Types.String},
  character: { type: Schema.Types.String },
  transliteration: { type: Schema.Types.String },
  spelling: { type: Schema.Types.String },
  wordId: { type: Schema.Types.ObjectId, refs: "Word"},
  numeralId: { type: Schema.Types.ObjectId, refs: "Numeral"},
  value: { type: Schema.Types.Number },
  userId: { type: Schema.Types.ObjectId, refs: "Letter", required: true},
  correspondenceIds: [{ type: Schema.Types.ObjectId, refs: "Correspondence"}],
  updatedAt: { type: Schema.Types.Number, default: Date.now() },
  createdAt: { type: Schema.Types.Number, default: Date.now() }
})

export default mongoose.model('Letter', LetterSchema, 'letter')
