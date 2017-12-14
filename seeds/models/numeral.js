import mongoose from 'mongoose'
const Schema = mongoose.Schema

const NumeralSchema = new mongoose.Schema({
  value: { type: Number, required: true, unique: true },
  math: [{ type: String }],
  notes: [{ type: Schema.Types.ObjectId, ref: 'Note'}],
  words: [{ type: Schema.Types.ObjectId, ref: 'Word' }],
  notebooks: [{ type: Schema.Types.ObjectId, ref: 'Notebook' }],
  letters: [{ type: Schema.Types.ObjectId, ref: 'Letter' }],
  updatedAt: { type: Schema.Types.Number, default: Date.now() },
  createdAt: {type: Schema.Types.Number, default: Date.now()}
})

export default mongoose.model('Numeral', NumeralSchema, 'numeral')