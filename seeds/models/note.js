import mongoose from 'mongoose'

const Schema = mongoose.Schema

const NoteSchema = new mongoose.Schema({
  type: { type: String },
  wordId: { type: mongoose.Schema.ObjectId, refs: "Word"},
  numeralId: { type: mongoose.Schema.ObjectId, refs: "Numeral"},
  correspondence: { type: mongoose.Schema.ObjectId, refs: "Correspondence"},
  content: { type: String },
  see: [{ type: Number }],
  updatedAt: { type: Schema.Types.Number, default: Date.now() },
  createdAt: {type: Schema.Types.Number, default: Date.now()}
})

export default mongoose.model('Note', NoteSchema, 'note')
