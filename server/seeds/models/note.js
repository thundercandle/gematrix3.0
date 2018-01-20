import mongoose from 'mongoose'

const Schema = mongoose.Schema

const NoteSchema = new mongoose.Schema({
  word: { type: Schema.Types.ObjectId, refs: "Word"},
  numeral: { type: Schema.Types.ObjectId, refs: "Numeral"},
  correspondence: { type: Schema.Types.ObjectId, refs: "Correspondence"},
  notebook: { type: Schema.Types.ObjectId, refs: "Notebook"},
  user: { type: Schema.Types.ObjectId, refs: "User"},
  content: { type: Schema.Types.String },
  see: [{ type: Schema.Types.Number }],
  set: { type: Schema.Types.ObjectId, refs: "Set"},
  updatedAt: { type: Schema.Types.Number, default: Date.now() },
  createdAt: {type: Schema.Types.Number, default: Date.now() }
})

export default mongoose.model('Note', NoteSchema, 'note')
