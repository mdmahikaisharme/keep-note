import mongoose from "mongoose";
import { iTrash } from "@type/modal";

const NoteSchema = new mongoose.Schema<iTrash>({
	userId: String,
	title: String,
	content: {
		text: String,
	},
	createdAt: String,
});

const Trash = mongoose.models.Trash || mongoose.model("Trash", NoteSchema);

export default Trash;
