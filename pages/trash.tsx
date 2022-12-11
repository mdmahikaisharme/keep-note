import { useState } from "react";
import { FaRecycle } from "react-icons/fa";
import { Layout, PageEmpty } from "@component";
import { Trash } from "@component/trash";
import { iTrash } from "@type/modal";
import { withAuthSSR } from "@util/auth";
import { buildCookieSSR } from "@util/token";
import api from "@api";

export default function TrashPage({ trashes }: { trashes: iTrash[] }) {
	const [state, setState] = useState({
		trash: trashes,
	});

	const removeNote = (trashId: string) => {
		const trash = state.trash.filter((trash) => trash._id !== trashId);
		setState((pre) => ({ ...pre, trash }));
	};

	return (
		<Layout className="py-4">
			<div className="w-10/12 md:w-8/12 mx-auto flex flex-col items-center gap-8">
				{state.trash.map((item) => (
					<Trash trash={item} onRemove={removeNote} key={item._id} />
				))}
			</div>

			{state.trash.length === 0 && (
				<PageEmpty
					notice="Notes in Trash are deleted after 7 days."
					icon={FaRecycle}
					describtion="No notes in Trash"
				/>
			)}
		</Layout>
	);
}

export const getServerSideProps = withAuthSSR(async (context: any) => {
	const cookies = await buildCookieSSR(context);
	const request = await api.getUserTrashes(cookies);
	const trashes = request.status === 200 ? request.data.trashes : [];

	return {
		props: {
			trashes,
		},
	};
});
