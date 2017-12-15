import mongoose from 'mongoose'
const Schema = mongoose.Schema

const NotebookSchema = new mongoose.Schema({
  title: { type: Schema.Types.String, required: true},
  description: { type: Schema.Types.String, required: true, unique: true },
  userId: { type: Schema.Types.ObjectId, refs: "Notebook", required: true},
  sets: [{ type: Schema.Types.ObjectId, refs: "Set"}],
  numerals: [{ type: Schema.Types.ObjectId, refs: "Numeral"}],
  updatedAt: { type: Schema.Types.Number, default: Date.now() },
  createdAt: { type: Schema.Types.Number, default: Date.now() }
})

export default mongoose.model('Notebook', NotebookSchema, 'notebook')
