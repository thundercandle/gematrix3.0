import mongoose from 'mongoose'
const Schema = mongoose.Schema

const LetterSchema = new mongoose.Schema({
  language: { type: SchemaTypes.String },
  pronunciation: { type: SchemaTypes.String},
  character: { type: SchemaTypes.String },
  transliteration: { type: SchemaTypes.String },
  numeral: { type: SchemaTypes.ObjectId, refs: "Numeral"},
  userId: { type: SchemaTypes.ObjectId, refs: "Letter", required: true},
  correspondences: [{ type: SchemaTypes.ObjectId, refs: "Correspondence"}],
  updatedAt: { type: Schema.Types.Number, default: Date.now() },
  createdAt: { type: Schema.Types.Number, default: Date.now() }
})

export default mongoose.model('Letter', LetterSchema, 'letter')
