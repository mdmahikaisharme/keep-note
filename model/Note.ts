import mongoose from "mongoose";
import { iNote } from "@type/modal";

const NoteSchema = new mongoose.Schema<iNote>({
	userId: String,
	title: String,
	content: {
		text: String,
	},
	createdAt: String,
});

const Note = mongoose.models.Note || mongoose.model("Note", NoteSchema);

export default Note;
