import { useState } from "react";
import { CreateFace, CreateForm } from "@component/note";
import { iNote } from "@type/modal";

interface iCreateNoteProps {
	onCreate: (newNote: iNote) => void;
}

export default function CreateNote({ onCreate }: iCreateNoteProps) {
	const [isCreate, setIsCreate] = useState(false);

	return (
		<>
			{!isCreate && <CreateFace onOpen={() => setIsCreate(true)} />}
			<CreateForm
				show={isCreate}
				onCreate={onCreate}
				onClose={() => setIsCreate(false)}
			/>
		</>
	);
}
