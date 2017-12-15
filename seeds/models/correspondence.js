import mongoose from 'mongoose'
const Schema = mongoose.Schema

const CorrespondenceSchema = new mongoose.Schema({
  title: { type: Schema.Types.String },
  content: { type: Schema.Types.String},
  set: { type: Schema.Types.ObjectId, refs: "Set"},
  numeral: { type: Schema.Types.ObjectId, refs: "Numeral"},
  letter: { type: Schema.Types.ObjectId, refs: "Letter"},
  correspondence: [{ type: Schema.Types.ObjectId, refs: "Correspondence"}],
  updatedAt: { type: Schema.Types.Number, default: Date.now() },
  createdAt: {type: Schema.Types.Number, default: Date.now()}
})

export default mongoose.model('Correspondence', CorrespondenceSchema, 'correspondence')
