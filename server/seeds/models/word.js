import mongoose from 'mongoose'
const Schema = mongoose.Schema

const WordSchema = new mongoose.Schema({
  entry: { type: Schema.Types.String },
  numeral: { type: Schema.Types.ObjectId, ref: 'Numeral'},
  notebooks: [{ type: Schema.Types.ObjectId, ref: 'Notebook' }],
  user: { type: Schema.Types.ObjectId, ref: 'User'},
  letters: [{ type: Schema.Types.ObjectId, ref: 'Letter'}],
  language: { type: Schema.Types.String },
  pronunciation: { type: Schema.Types.String },
  definition: { type: Schema.Types.String },
  notes: [{ type: Schema.Types.ObjectId, ref: 'Note'}],
  see: [{ type: Schema.Types.Number }],
  updatedAt: { type: Schema.Types.Number, default: Date.now() },
  createdAt: {type: Schema.Types.Number, default: Date.now() }
})

export default mongoose.model('Word', WordSchema, 'word')
