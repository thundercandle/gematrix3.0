import mongoose from 'mongoose'
const Schema = mongoose.Schema

const CorrespondenceSchema = new mongoose.Schema({
  title: { type: Schema.Types.String },
  content: { type: Schema.Types.String},
  setId: { type: Schema.Types.ObjectId, refs: "Set"},
  letterId: { type: Schema.Types.ObjectId, refs: "Letter" },
  sephirothId: { type: Schema.Types.ObjectId, refs: "Sephiroth"},
  noteIds: [{ type: Schema.Types.ObjectId, refs: "Note"}],
  updatedAt: { type: Schema.Types.Number, default: Date.now() },
  createdAt: {type: Schema.Types.Number, default: Date.now()}
})

export default mongoose.model('Correspondence', CorrespondenceSchema, 'correspondence')
