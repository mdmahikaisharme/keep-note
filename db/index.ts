import { iNote } from "@type/modal";

interface Empty {
	note: iNote;
}

const empty: Empty = {
	note: {
		_id: "",
		userId: "",
		title: "",
		content: {
			text: "",
		},
		createdAt: "",
	},
};

export default {
	empty,
};
