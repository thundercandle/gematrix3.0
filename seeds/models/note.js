import mongoose from 'mongoose'

const Schema = mongoose.Schema

const NoteSchema = new mongoose.Schema({
  type: { type: Schema.Types.String },
  wordId: { type: Schema.Types.ObjectId, refs: "Word"},
  numeralId: { type: Schema.Types.ObjectId, refs: "Numeral"},
  correspondence: { type: Schema.Types.ObjectId, refs: "Correspondence"},
  content: { type: Schema.Types.String },
  see: [{ type: Schema.Types.Number }],
  updatedAt: { type: Schema.Types.Number, default: Date.now() },
  createdAt: {type: Schema.Types.Number, default: Date.now() }
})

export default mongoose.model('Note', NoteSchema, 'note')
