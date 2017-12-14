import mongoose from 'mongoose'
const Schema = mongoose.Schema

const SetSchema = new mongoose.Schema({
  title: { type: Schema.Types.String },
  notebooks: [{ type: Schema.ObjectId, refs: "Notebook"}],
  notes: [{ type: Schema.ObjectId, refs: "Note"}],
  correspondence: [{ type: Schema.ObjectId, refs: "Correspondence"}],
  updatedAt: { type: Schema.Types.Number, default: Date.now() },
  createdAt: {type: Schema.Types.Number, default: Date.now()}
})

export default mongoose.model('Set', SetSchema, 'set')