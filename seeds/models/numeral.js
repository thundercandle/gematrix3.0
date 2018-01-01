import mongoose from 'mongoose'
const Schema = mongoose.Schema

const NumeralSchema = new mongoose.Schema({
  value: { type: Schema.Types.Number, required: true, unique: true },
  userId: { type: Schema.Types.ObjectId, refs: "User"},
  equations: [{ type: Schema.Types.String }],
  wordIds: [{ type: Schema.Types.ObjectId, ref: 'Word' }],
  noteIds: [{ type: Schema.Types.ObjectId, ref: 'Note'}],
  letterIds: [{ type: Schema.Types.ObjectId, ref: 'Letter' }],
  sephirothId: { type: Schema.Types.ObjectId, ref: 'Sephiroth'},
  updatedAt: { type: Schema.Types.Number, default: Date.now() },
  createdAt: {type: Schema.Types.Number, default: Date.now()}
})

export default mongoose.model('Numeral', NumeralSchema, 'numeral')
