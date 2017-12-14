import mongoose from 'mongoose'
const Schema = mongoose.Schema

const NotebookSchema = new mongoose.Schema({
  title: { type: String, required: true},
  description: { type: String, required: true, unique: true },
  userId: { type: Schema.ObjectId, refs: "Notebook", required: true},
  sets: [{ type: Schema.ObjectId, refs: "Set"}],
  numerals: [{ type: Schema.ObjectId, refs: "Numeral"}],
  updatedAt: { type: Schema.Types.Number, default: Date.now() },
  createdAt: { type: Schema.Types.Number, default: Date.now() }
})

export default mongoose.model('Notebook', NotebookSchema, 'notebook')