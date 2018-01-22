import mongoose from 'mongoose'

const Schema = mongoose.Schema

const NoteSchema = new mongoose.Schema({
  wordId: { type: Schema.Types.ObjectId, refs: "Word"},
  numeralId: { type: Schema.Types.ObjectId, refs: "Numeral"},
  correspondenceId: { type: Schema.Types.ObjectId, refs: "Correspondence"},
  notebookId: { type: Schema.Types.ObjectId, refs: "Notebook"},
  userId: { type: Schema.Types.ObjectId, refs: "User"},
  content: { type: Schema.Types.String },
  see: [{ type: Schema.Types.Number }],
  setId: { type: Schema.Types.ObjectId, refs: "Set"},
  updatedAt: { type: Schema.Types.Number, default: Date.now() },
  createdAt: {type: Schema.Types.Number, default: Date.now() }
})

export default mongoose.model('Note', NoteSchema, 'note')
