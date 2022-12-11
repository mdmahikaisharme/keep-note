export default interface iTrash {
	_id: string;
	userId: string;
	title: string;
	content: {
		text: string;
	};
	createdAt: string;
}
