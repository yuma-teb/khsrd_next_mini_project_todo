import { getWorkSpaceById } from "@/actions/workspace-action";
import { Star } from "lucide-react";
import FavoriteStar from "../../_components/favorite/favorite";
import { ResWorkSpace } from "@/types/workspace";
interface Props {
	params: Promise<{ id: string }>;
}
export default async function Page({ params }: Props) {
	const { id } = await params;

	const workspace = await getWorkSpaceById(id);

	return (
		<div className="px-10 py-5">
			<div className="flex justify-between">
				<p className="text-3xl font-semibold">
					{workspace?.payload.workspaceName}
				</p>
				<FavoriteStar workspace={workspace?.payload as ResWorkSpace} />
			</div>
		</div>
	);
}
