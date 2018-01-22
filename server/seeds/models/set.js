import mongoose from 'mongoose'
const Schema = mongoose.Schema

const SetSchema = new mongoose.Schema({
  title: { type: Schema.Types.String },
  notebookIds: [{ type: Schema.Types.ObjectId, refs: "Notebook"}],
  noteIds: [{ type: Schema.Types.ObjectId, refs: "Note"}],
  correspondenceIds: [{ type: Schema.Types.ObjectId, refs: "Correspondence"}],
  userId: { type: Schema.Types.ObjectId, refs: "User"},
  updatedAt: { type: Schema.Types.Number, default: Date.now() },
  createdAt: {type: Schema.Types.Number, default: Date.now()}
})

export default mongoose.model('Set', SetSchema, 'set')
