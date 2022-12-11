import mongoose from "mongoose";
import { iUser } from "@type/modal";

const UserSchema = new mongoose.Schema<iUser>({
	name: String,
	email: String,
	password: String,
	image: String,
	createdAt: String,
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
