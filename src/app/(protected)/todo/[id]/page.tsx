import { getWorkSpaceById } from "@/actions/workspace-action";
import { Plus, Star } from "lucide-react";
import FavoriteStar from "../../_components/favorite/favorite";
import { ResWorkSpace } from "@/types/workspace";
import { getAllTasksService } from "@/service/task-service";
import { Button } from "@/components/ui/button";
import AddTaskButton from "../../_components/task/add-task-button";
interface Props {
	params: Promise<{ id: string }>;
}
export default async function Page({ params }: Props) {
	const { id } = await params;

	const workspace = await getWorkSpaceById(id);
	const task = await getAllTasksService(id);

	return (
		<div className="px-10 py-5 h-full">
			<div className="flex justify-between">
				<p className="text-3xl font-semibold">
					{workspace?.payload.workspaceName}
					asdfasdfasdfasdf
				</p>
				<FavoriteStar workspace={workspace?.payload as ResWorkSpace} />
			</div>
			<main></main>
			asdfasdfsa
			<AddTaskButton />
		</div>
	);
}
