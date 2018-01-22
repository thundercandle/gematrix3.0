import mongoose from 'mongoose'
const Schema = mongoose.Schema

const NotebookSchema = new mongoose.Schema({
  title: { type: Schema.Types.String, required: true},
  description: { type: Schema.Types.String, required: true, unique: true },
  userId: { type: Schema.Types.ObjectId, refs: "User", required: true},
  wordIds: [{ type: Schema.Types.ObjectId, refs: "Word"}],
  noteIds: [{ type: Schema.Types.ObjectId, refs: "Note"}],
  updatedAt: { type: Schema.Types.Number, default: Date.now() },
  createdAt: { type: Schema.Types.Number, default: Date.now() }
})

export default mongoose.model('Notebook', NotebookSchema, 'notebook')
