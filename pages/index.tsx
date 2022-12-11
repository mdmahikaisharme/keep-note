import { useState } from "react";
import { Layout } from "@component";
import { CreateNote, Edit, Note } from "@component/note";
import { iNote } from "@type/modal";
import { withAuthSSR } from "@util/auth";
import { buildCookieSSR } from "@util/token";
import db from "@db";
import api from "@api";

interface HomeState {
	note: iNote[];
	edit: {
		isOpen: boolean;
		note: iNote;
	};
}
interface HomeProps {
	notes: iNote[];
}
export default function HomePage({ notes }: HomeProps) {
	const [state, setState] = useState<HomeState>({
		note: notes,
		edit: {
			isOpen: false,
			note: db.empty.note,
		},
	});

	const editNote = (note: iNote) => {
		setState((pre) => ({
			...pre,
			edit: {
				isOpen: true,
				note: note,
			},
		}));
	};
	const closeEditing = () => {
		setState((pre) => ({
			...pre,
			edit: {
				isOpen: false,
				note: db.empty.note,
			},
		}));
	};
	const addNote = (newNote: iNote) => {
		const note = [...state.note, newNote];
		setState((pre) => ({ ...pre, note }));
	};
	const removeNote = (noteId: string) => {
		const note = state.note.filter((note) => note._id !== noteId);
		setState((pre) => ({ ...pre, note }));
	};
	const updateNote = (updatedNote: iNote) => {
		const note = state.note.map((note) =>
			note._id === updatedNote._id ? updatedNote : note
		);
		setState((pre) => ({ ...pre, note }));
	};

	return (
		<Layout className="py-4">
			<div className="w-10/12 md:w-8/12 mx-auto flex flex-col items-center gap-8">
				<CreateNote onCreate={addNote} />

				{state.note.map((item) => (
					<Note
						note={item}
						onClick={editNote}
						onRemove={removeNote}
						key={item._id}
					/>
				))}
			</div>

			<Edit
				state={state.edit.isOpen}
				note={state.edit.note}
				onClose={closeEditing}
				onUpdate={updateNote}
			/>
		</Layout>
	);
}

export const getServerSideProps = withAuthSSR(async (context: any) => {
	const cookies = await buildCookieSSR(context);
	const request = await api.getUserNotes(cookies);
	const notes = request.status === 200 ? request.data.notes : [];

	return {
		props: {
			notes: notes,
		},
	};
});
