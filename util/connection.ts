import mongoose from "mongoose";

// env
const DATABASE_URI = process.env.NEXT_PUBLIC_DATABASE_URI as string;

let global: any = {};
const mongooseOptions = {
	bufferCommands: false,
	useUnifiedTopology: true,
	useNewUrlParser: true,
};

// database uri not found
if (!DATABASE_URI) {
	throw new Error(
		"Please define the DATABASE_URI environment variable inside .env.local"
	);
}

//  cached
let cached = global.mongoose;
if (!cached) {
	cached = global.mongoose = { conn: null, promise: null };
}

// connection
export default async function connection() {
	if (cached.conn) return cached.conn;

	if (!cached.promise) {
		cached.promise = mongoose
			.connect(DATABASE_URI, mongooseOptions)
			.then((mongoose) => mongoose);
	}

	cached.conn = await cached.promise;
	return cached.conn;
}
