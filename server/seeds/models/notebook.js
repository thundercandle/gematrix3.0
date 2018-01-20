import mongoose from 'mongoose'
const Schema = mongoose.Schema

const NotebookSchema = new mongoose.Schema({
  title: { type: Schema.Types.String, required: true},
  description: { type: Schema.Types.String, required: true, unique: true },
  user: { type: Schema.Types.ObjectId, refs: "User", required: true},
  words: [{ type: Schema.Types.ObjectId, refs: "Word"}],
  notes: [{ type: Schema.Types.ObjectId, refs: "Note"}],
  updatedAt: { type: Schema.Types.Number, default: Date.now() },
  createdAt: { type: Schema.Types.Number, default: Date.now() }
})

export default mongoose.model('Notebook', NotebookSchema, 'notebook')
