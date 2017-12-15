import mongoose from 'mongoose'
const Schema = mongoose.Schema

const WordSchema = new mongoose.Schema({
  entry: { type: Schema.Types.String },
  numeralId: { type: Schema.Types.ObjectId, ref: 'Numeral'},
  letters: [{ type: Schema.Types.ObjectId, ref: 'Letter'}],
  language: { type: Schema.Types.string },
  pronunciation: { type: Schema.Types.string },
  definition: { type: Schema.Types.string },
  notes: [{ type: Schema.Types.ObjectId, ref: 'Note'}],
  see: [{ type: Schema.Types.Number }],
  updatedAt: { type: Schema.Types.Number, default: Date.now() },
  createdAt: {type: Schema.Types.Number, default: Date.now() }
})

export default mongoose.model('Word', WordSchema, 'word')
