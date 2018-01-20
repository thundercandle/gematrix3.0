import mongoose from 'mongoose'
const Schema = mongoose.Schema

const SetSchema = new mongoose.Schema({
  title: { type: Schema.Types.String },
  notebooks: [{ type: Schema.Types.ObjectId, refs: "Notebook"}],
  notes: [{ type: Schema.Types.ObjectId, refs: "Note"}],
  correspondence: [{ type: Schema.Types.ObjectId, refs: "Correspondence"}],
  user: { type: Schema.Types.ObjectId, refs: "User"},
  updatedAt: { type: Schema.Types.Number, default: Date.now() },
  createdAt: {type: Schema.Types.Number, default: Date.now()}
})

export default mongoose.model('Set', SetSchema, 'set')
