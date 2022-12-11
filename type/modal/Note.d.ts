export default interface iNote {
	_id: string;
	userId: string;
	title: string;
	content: {
		text: string;
	};
	createdAt: string;
}
